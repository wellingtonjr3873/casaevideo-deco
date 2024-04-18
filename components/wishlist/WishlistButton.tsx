import { useComputed, useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useWishlist } from "deco-sites/casaevideo/hooks/useWishlist.ts";
import { useEffect } from "preact/hooks";
import { invoke } from "deco-sites/casaevideo/runtime.ts";

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
  const { loading, addItem, removeItem, getItem } = useWishlist();
  const listItem = useComputed(() =>
    false
  );

  useEffect(() => {
    getItem({ sku: productID, productId: productGroupID }).then(console.log).catch(console.error)
    // invoke['deco-sites/casaevideo'].loaders.Wishlist.get({items: [{productId: productGroupID!}], userId: user.value?.email}).then(console.log)
  },[])
  
  const fetching = useSignal(false);

  const isUserLoggedIn = Boolean(user.value?.email);
  const inWishlist = Boolean(listItem.value);

  const buttonClass = variant === "icon"
    ? "btn-circle btn-ghost gap-2 justify-end "
    : "btn-primary btn-outline gap-2 justify-end";

  return (
    <Button
      class={`${absolute ? 'absolute md:static right-4 top-16 z-10' : ''} ${buttonClass}`}
      loading={fetching.value}
      aria-label="Add to wishlist"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();

        // if (!isUserLoggedIn) {
        //   globalThis.window.alert(
        //     "Please log in before adding to your wishlist",
        //   );

        //   return;
        // }

        console.log('see')
        if (!loading.value) {
          return;
        }
        try {
          fetching.value = true;

          if (inWishlist) {
            await removeItem({ id: listItem.value!.id }!);
          } else if (productID && productGroupID) {
            console.log('see')
            await addItem({ sku: productID, productId: productGroupID });

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
        } finally {
          fetching.value = false;
        }
      }}
    >
      <Icon
        id="Wishlist" 
        size={24}
        strokeWidth={2}
        fill={inWishlist ? "#E20613" : "none"}
      />
      {variant === "icon" ? null : inWishlist ? "Remover" : "Favoritar"}
    </Button>
  );
}

export default WishlistButton;
