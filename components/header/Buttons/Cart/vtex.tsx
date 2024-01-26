import { itemToAnalyticsItem, useCart } from "apps/vtex/hooks/useCart.ts";
import Button from "./common.tsx";
import { h } from "preact";

export interface Props {
  children?: h.JSX.Element;
}
function CartButton({ children }: Props) {
  const { loading, cart } = useCart();
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
