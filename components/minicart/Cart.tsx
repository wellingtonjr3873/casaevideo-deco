// import { platform } from "$store/apps/storefront.ts";
import { lazy } from "preact/compat";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Props as MinicartProps } from "$store/components/minicart/ProductShelfMinicart.tsx";

const CartVTEX = lazy(() => import("./vtex/Cart.tsx"));
const CartVNDA = lazy(() => import("./vnda/Cart.tsx"));
const CartWake = lazy(() => import("./wake/Cart.tsx"));
const CartLinx = lazy(() => import("./linx/Cart.tsx"));
const CartShopify = lazy(() => import("./shopify/Cart.tsx"));
const CartNuvemshop = lazy(() => import("./nuvemshop/Cart.tsx"));

export interface Props {
  platform: ReturnType<typeof usePlatform>;
  minicartProps: MinicartProps;
}

function Cart({ platform, minicartProps }: Props) {
  if (platform === "vtex") {
    return <CartVTEX minicartProps={minicartProps} />;
  }

  if (platform === "vnda") {
    return <CartVNDA />;
  }

  if (platform === "wake") {
    return <CartWake />;
  }

  if (platform === "linx") {
    return <CartLinx />;
  }

  if (platform === "shopify") {
    return <CartShopify />;
  }

  if (platform === "nuvemshop") {
    return <CartNuvemshop />;
  }

  return null;
}

export default Cart;
