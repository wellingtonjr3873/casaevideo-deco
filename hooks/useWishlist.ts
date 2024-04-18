import { invoke } from "../runtime.ts";
import { useSignal } from "@preact/signals";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import { useEffect } from "preact/hooks";

type AddItemProps = {
  sku: string;
  productId?: string;
};

type RemoveItemProps = {
  id: string;
};

type GetItemProps = {
  sku: string;
  productId?: string;
};

export const useWishlist = () => {
  const loading = useSignal(true);
  const { user } = useUser();
  const favoritList = useSignal<string | null>(null);

  useEffect(() => {
    if (!user?.value) return;

    invoke["deco-sites/casaevideo"].loaders.Wishlist.get().then((res) => {
      favoritList.value = res;
    }).finally(() => {
      loading.value = false;
    });
  }, []);

  const addItem = async (props: AddItemProps) => {
    console.log("hello");
    try {
      const res = await invoke["deco-sites/casaevideo"].loaders.Wishlist.add({
        items: [{
          productId: props.productId!,
        }],
        userId: user.value.email,
      });

      console.log(res, "seee");
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = (props: RemoveItemProps) => {
    console.log(user.value, props);

    // invoke['deco-sites/casaevideo'].loaders.Wishlist.add
  };

  const getItem = async (props: GetItemProps) => {
    if (!favoritList.value) return false;
    try {
      // const res = await invoke['deco-sites/casaevideo'].loaders.Wishlist.get();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    loading,
    addItem,
    removeItem,
    getItem,
  };
};
