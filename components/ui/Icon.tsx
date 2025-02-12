import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  |  "Home"
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
  | "Lightning"
  | "Facebook"
  | "FilterList"
  | "FilterButtonMob"
  | "ViewGrid"
  | "ViewList"
  | "ViewListSelected"
  | "ViewGridSelected"
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
  | "CepOpen"
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
  | "ArrowDirectionRight"
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
  | "Televenda"
  | "Whatsapp"
  | "LocationPoint"
  | "Frete"
  | "ArrowDown"
  | "Wishlist"
  | "MyOrders"
  | "CVCreditCard"
  | "DecreaseButton"
  | "IncreaseButton"
  | "Image"
  | "Video"
  | "3D"
  | "EmptyStar"
  | "FullStar"
  | "PickupPoint"
  | "Checked"
  | "Close"
  | "Close"
  | "sucessToast"
  | "infoToast"
  | "warningToast"
  | "closeToast"
  | "Plus";

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
      <use 
        width={width ?? size}
        height={height ?? size}
        href={asset(`/sprites.svg#${id}`)}
      />
    </svg>
  );
}

export default Icon;
