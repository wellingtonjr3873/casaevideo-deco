import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "ArrowsPointingOut"
  | "Bars3"
  | "ChevronLeft"
  | "ChevronRight"
  | "SliderArrowLeft"
  | "SliderArrowRight"
  | "ChevronUp"
  | "ChevronTop"
  | "ChevronDown"
  | "CreditCard"
  | "Deco"
  | "Diners"
  | "Discord"
  | "Discount"
  | "Elo"
  | "Facebook"
  | "FilterList"
  | "Heart"
  | "Instagram"
  | "Linkedin"
  | "Minus"
  | "MapPin"
  | "MagnifyingGlass"
  | "Mastercard"
  | "Message"
  | "Phone"
  | "Pix"
  | "Plus"
  | "QuestionMarkCircle"
  | "Return"
  | "Ruler"
  | "ShoppingCart"
  | "Star"
  | "Tiktok"
  | "Trash"
  | "Truck"
  | "Twitter"
  | "User"
  | "Visa"
  | "WhatsApp"
  | "XMark"
  | "User2"
  | "CvlbCross"
  | "ArrowAccordion"
  | "ArrowBack"
  | "MyOrders"
  | "MyCoupons"
  | "BuyWhatsapp"
  | "Televendas"
  | "HelpCentral"
  | "CreditCard"
  | "OurStores"
  | "GooglePlayImg"
  | "AppleStoreImg"
  | "Zoom"
  | "Discord"
  | "Facebook"
  | "Instagram"
  | "Linkedin"
  | "Tiktok"
  | "Twitter"
  | "Youtube"
  | "Diners"
  | "Elo"
  | "Mastercard"
  | "Pix"
  | "Visa"
  | "Hypercard"
  | "Picpay"
  | "Casaevideo"
  | "AmericanExpress"
  | "Padlock"
  | "Cart"
  | "Hamburguer"
  | "ExpressPicking"
  | "Frete"
  | "ArrowDown"
  | "Wishlist"
  | "MyOrders";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
  strokeWidth?: number;
  width?: string | number;
  height?: string | number;
}

function Icon(
  { id, strokeWidth = 16, size, width, height, ...otherProps }: Props,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
