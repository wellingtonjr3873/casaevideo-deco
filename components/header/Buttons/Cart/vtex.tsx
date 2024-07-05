import { itemToAnalyticsItem, useCart } from "apps/vtex/hooks/useCart.ts";
import Button from "./common.tsx";
import { h as types } from "preact";
import { useUserLogged } from "deco-sites/casaevideo/sdk/useUserLogged.ts";
export interface Props {
  children?: types.JSX.Element;
}
function CartButton({ children }: Props) {
  const { loading, cart } = useCart();
  const { userLogged, userLoading, userEmail, userFirstName } = useUserLogged();

  userLoading.value = loading.value;

  if(cart.value?.loggedIn){
    userLogged.value = true;
    userEmail.value = cart.value.clientProfileData?.email || "";
    userFirstName.value = cart.value.clientProfileData?.firstName || "";
  }

  const {
    totalizers = [],
    items = [],
    marketingData,
    storePreferencesData,
  } = cart.value ?? {};
  const coupon = marketingData?.coupon ?? undefined;
  const currency = storePreferencesData?.currencyCode ?? "BRL";
  const total = totalizers.find((item) => item.id === "Items")?.value ?? 0;
  const discounts = totalizers.find((item) => item.id === "Discounts")?.value ??
    0;

  return (
    <Button
      currency={currency}
      loading={loading.value}
      total={(total - discounts) / 100}
      items={items.map((item, index) =>
        itemToAnalyticsItem({ ...item, coupon }, index)
      )}
    >
      {children}
    </Button>
  );
}

export default CartButton;
