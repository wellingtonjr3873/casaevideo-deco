import { itemToAnalyticsItem, useCart } from "apps/vtex/hooks/useCart.ts";
import BaseCart from "../common/Cart.tsx";
import { Props as MinicartProps } from "$store/components/minicart/ProductShelfMinicart.tsx";

export interface Props{
  minicartProps: MinicartProps;
}

function Cart({minicartProps}: Props) {
  const { cart, loading, updateItems, addCouponsToCart } = useCart();
  const { items, totalizers } = cart.value ?? { items: [] };

  let total = 0;

  if (totalizers?.length === 0 && items?.length === 0) {
    total = 0;
  } else if (totalizers?.length > 0) {
    total = totalizers?.find((item) => item.id === "Items")?.value ?? 0;
  } else if (items?.length > 0 && totalizers?.length === 0) {
    total = items.reduce((acc, item) => acc + item.price, 0);
  }

  // const total = totalizers?.find((item) => item.id === "Items")?.value || 0;


  const discounts =
    totalizers?.find((item) => item.id === "Discounts")?.value || 0;
  const locale = cart.value?.clientPreferencesData.locale ?? "pt-BR";
  const currency = cart.value?.storePreferencesData.currencyCode ?? "BRL";
  const coupon = cart.value?.marketingData?.coupon ?? undefined;
  return (
    <BaseCart
      items={items.map((item) => ({
        image: { src: item.imageUrl, alt: item.skuName },
        quantity: item.quantity,
        name: item.name,
        brand: item.additionalInfo.brandName || "",
        productID: item.id,
        price: {
          sale: item.sellingPrice / 100,
          list: item.listPrice / 100,
        },
      }))}
      total={(total - discounts) / 100}
      subtotal={total / 100}
      discounts={discounts / 100}
      locale={locale}
      currency={currency}
      loading={loading.value}
      freeShippingTarget={1000}
      coupon={coupon}
      minicartProps={minicartProps}
      onAddCoupon={(text) => addCouponsToCart({ text })}
      onUpdateQuantity={(quantity, index) =>
        updateItems({ orderItems: [{ index, quantity }] })}
      itemToAnalyticsItem={(index) => {
        const item = items[index];

        return item && itemToAnalyticsItem({ ...item, coupon }, index);
      }}
      checkoutHref="/checkout"
    />
  );
}

export default Cart;
