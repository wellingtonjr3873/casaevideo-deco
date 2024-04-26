import {  useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { invoke } from "deco-sites/casaevideo/runtime.ts";
import {useWishlist} from 'deco-sites/casaevideo/sdk/useWishlist.ts'

export interface Props {
  productID: string;
  productGroupID?: string;
  variant?: "icon" | "full";
  absolute?: boolean;
}

function WishlistButton({
  variant = "icon",
  productGroupID,
  productID,
  absolute = false,
}: Props) {
  const { user } = useUser();

  const localLoad = useSignal(false);

  const {loading, wishlistListProducts, wishlistListId } = useWishlist();

  const isUserLoggedIn = Boolean(user.value?.email);
  const inWishlist = wishlistListProducts.value.some(item => item === productID);

  const removeItemWishlist = (productId: string, userId: string) => {
      return invoke['deco-sites/casaevideo'].loaders.Wishlist["remove-wishlist-item"]({userId, productId, listId: wishlistListId.value! })
  }

  const addItemWishlist = (productId: string, userId: string, skuId: string) => {
      if(!wishlistListId.value) return invoke['deco-sites/casaevideo'].loaders.Wishlist["create-wishlist"]({userId, productId, skuId })
      return invoke['deco-sites/casaevideo'].loaders.Wishlist["add-wishlist-item"]({userId, productId, skuId, listId: wishlistListId.value! })
  }

  const buttonClass = variant === "icon"
    ? "btn-circle btn-ghost gap-2 justify-end w-[32px]"
    : "btn-primary btn-outline gap-2 justify-end w-[32px]";

    const _addWishlistItem = async () => {
      const res = await addItemWishlist(productID, user?.value?.email, productGroupID);
        if(res) {
          wishlistListProducts.value = [...wishlistListProducts.value, productID]
          sendEvent({
            name: "add_to_wishlist",
            params: {
              items: [{
                item_id: productID,
                item_group_id: productGroupID,
                quantity: 1,
              }],
            },
          });
        }
    }

    const _removeWishlistItem = async () => {
      const res = await removeItemWishlist(productGroupID, user.value?.email);
      if(res){
        wishlistListProducts.value = wishlistListProducts.value.filter(item => item !== productID)
      }
    }

  return (
    <Button
      class={`${absolute ? 'absolute md:static right-4 top-16 z-10' : ''} ${buttonClass} h-[32px] min-h-[32px]`}
      loading={localLoad.value || loading.value}
      aria-label="Add to wishlist"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!isUserLoggedIn) {
          globalThis.window.alert(
            "Por favor, entre na sua conta para adicionar produtos aos favoritos.",
          );

          return;
        }

        if (loading.value) {
          return;
        }
        try {
          localLoad.value = true;

          if (inWishlist) {
            await _removeWishlistItem()
          } else if (productID && productGroupID) {
           await _addWishlistItem()
          }
        } finally {
          localLoad.value = false;
        }
      }}
    >
      <Icon
        id="Wishlist" 
        size={24}
        strokeWidth={2}
        style={{
          color: inWishlist ? "#E20613" : "none"
        }}
      />
      {variant === "icon" ? null : inWishlist ? "Remover" : "Favoritar"}
    </Button>
  );
}

export default WishlistButton;
