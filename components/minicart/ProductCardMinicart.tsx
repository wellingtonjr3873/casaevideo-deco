import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "deco-sites/casaevideo/islands/Analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 75;
const HEIGHT = 75;

function ProductCardMinicart(
  { product, preload, itemListName, index }: Props,
) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;
  const id = `product-card-${productID}`;
  const productGroupID = isVariantOf?.productGroupID;
  const [front] = images ?? [];
  const { price, seller = "1"} = useOffer(offers);



  return (
    <a href={url} class={`flex gap-5 items-center justify-center p-4 rounded-lg bg-neutral-50 lg:max-w-[308px] lg:mx-auto`}>
      <Image
        src={front.url!}
        alt={front.alternateName}
        width={WIDTH}
        height={HEIGHT}
        class={``}
        preload={false}
        loading={"lazy"}
        decoding="async"
      />
      <div id="containerInfoMinicart" class={`flex flex-col gap-2`}>
          <h2 class={`text-xs font-bold text-neutral-900 textTruncate h-9`}>{name}</h2>
          <h3 class={`text-sm font-bold text-neutral-900 flex items-end gap-2`}>{formatPrice(price, offers?.priceCurrency)} <span class={`text-xs font-normal`}>no Pix</span></h3>
          <AddToCartButtonVTEX
            eventParams={{ items: [] }}
            productID={productID}
            seller={seller}
            className="btnMinicartAddToCart"
            label="Adicionar ao carrinho"
          />
      </div>
    </a>
  );
}

export default ProductCardMinicart;
