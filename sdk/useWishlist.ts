//Well vai refatorar a tipagem.
// deno-lint-ignore ban-ts-comment
//@ts-nocheck
import { signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { invoke } from "deco-sites/casaevideo/runtime.ts";
import { DEFAULT_WISHLIST_LIST_NAME } from "deco-sites/casaevideo/constants.tsx";

const wishlistListId = signal<string | null>(null);
const wishlistListProducts = signal<string[]>([]);
const loading = signal(true);

type GetWishlistRes = {
  data: {
    id: string;
    title: string;
  }[];
};

type GetWishlistItemRes = {
  data: {
    products: {
      productId: string;
    }[];
  };
};

function load() {
  let userId = "";
  invoke.vtex.loaders.user().then((res) => {
    if (res) {
      userId = res.email!;
      return invoke["deco-sites/casaevideo"].loaders.Wishlist
        ["get-wishlist-list"]({ userId: res.email });
    }
    throw new Error("User not logged");
  })
    .then((res: GetWishlistRes) => {
      const list = res.data.find((item) =>
        item.title === DEFAULT_WISHLIST_LIST_NAME
      );
      if (list) {
        wishlistListId.value = list.id;
        return invoke["deco-sites/casaevideo"].loaders.Wishlist
          ["get-wishlist-items"]({ listId: list.id, userId });
      }
      throw new Error("List not exist");
    }).then((res: GetWishlistItemRes) => {
      const tratedId = res.data.products.map((item) =>
        item._meta.wishlist.itemIds[0]
      );
      wishlistListProducts.value = tratedId;
    })
    .catch(console.error)
    .finally(() => loading.value = false);
}

if (IS_BROWSER) load();

const state = {
  wishlistListId,
  wishlistListProducts,
  loading,
};

export const useWishlist = () => state;
