import { SendEventOnClick } from "deco-sites/casaevideo/islands/Analytics.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import { Tags } from "deco-sites/casaevideo/components/types/TagsProps.ts";
import { clusterFilter } from "deco-sites/casaevideo/components/utils/clusterFilter.ts";

export interface Layout {
  tag?: Tags;
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
  device?: "mobile" | "desktop" | "tablet";
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 210;
const HEIGHT = 210;

function ProductCardHorizontal(
  { product, preload, itemListName, layout, index, device }: Props,
) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
    // Until deco accepts the PR from typagen on their repository, this property advertisement will remain complaining.
    advertisement,
  } = product;

  const id = `product-card-${productID}`;
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);

  const productClusters = product.additionalProperty && product.additionalProperty;
  const filteredCluesters = productClusters && clusterFilter(productClusters);

  const tag = layout?.tag;
  const clusterIdtag = tag?.id;
  const clusterActiveTag = tag?.active;
  const clusterTagBgColor = tag?.bgColor;
  const iconPathTag = tag?.icon?.[0];
  const textTag = tag?.text;

  const align =
    !layout?.basics?.contentAlignment || layout?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";


  const listLayout = `gap-2 rounded-lg flex shadow-normal group relative w-full bg-neutral-50 p-2 md:p-4 card-bordered border-brand-secondary-100 ${align === "center" ? "text-center" : "text-start"
    } 
${layout?.onMouseOver?.card === "Move up" &&
    "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
    }`

  const cta = (
    <a
      href={url && relative(url.split("?")[0])}
      aria-label="view product"
      class="btn btn-block"
    >
      {layout?.basics?.ctaText || "Ver produto"}
    </a>
  );

  const productCardPrice = (
    <>
      {/* Prices & Name */}
      <div class={`flex-auto flex justify-between flex-col md:flex-row gap-3 lg:gap-4`}>
        {layout?.hide?.productName && layout?.hide?.productDescription
          ? ""
          : (
            <div class="flex flex-col gap-0 xs-small-regular md:body-regular">
              <div>
                {filteredCluesters && clusterActiveTag && filteredCluesters?.map((clusterId) => (
                  clusterId == clusterIdtag &&
                  <div class="h-[24px] gap-1 small-regular rounded-md flex text-neutral-50 justify-between px-1 md:px-2 items-center text-xs whitespace-nowrap" style={{ backgroundColor: clusterTagBgColor }}>
                    <img src={iconPathTag} />
                    {textTag}
                  </div>
                ))
                }
              </div>
              <div class="h-3 flex justify-start items-center">
                {advertisement?.adId && <span class="text-[12px] text-[#989898]">Patrocinado</span>}
              </div>
              {layout?.hide?.productName ? "" : (
                <h2
                  class={`truncate  md:body-bold max-h-40 md:max-h-full line-clamp-2 md:min-h-[33px] whitespace-break-spaces max-w-[160px] md:max-w-[378px] h6-bold`}
                >{name ?? ""}</h2>
              )}
            </div>
          )}
        {layout?.hide?.allPrices ? "" : (
          <div class={`flex flex-col gap-2 justify-end`}>
            <div
              class={`flex flex-col gap-0 ${layout?.basics?.oldPriceSize === "Normal"
                ? "lg:flex-row lg:gap-2"
                : ""
                } ${align === "center" ? "justify-center" : "justify-start"} text-end md:text-start`}
            >
              <div
                class={`flex text-base-300 xx-small-regular md:small-regular md:text-start gap-2 ${layout?.basics?.oldPriceSize === "Normal" ? "lg:text-xl" : ""} justify-end`}
              >
                <span class="line-through">
                  {formatPrice(listPrice, offers?.priceCurrency)}
                </span>

                {(price && listPrice && price !== listPrice) &&
                  (
                    <div class="bg-success gap-1 h-4 sm:h-5 md:h-6 flex px-1 justify-center items-center text-neutral-50 rounded">
                      <Icon id="ArrowDown" width={16} height={16} />
                      {((1 - (price / listPrice)) * 100).toFixed(0)}%
                    </div>
                  )}
              </div>
              <div class={`body-bold md:h6-bold text-start md:text-end`}>
                {formatPrice(price, offers?.priceCurrency)} no PIX
              </div>
            </div>
            {layout?.hide?.installments
              ? ""
              : (
                <div class={`text-brand-secondary-900 x-small-regular text-end md:text-start truncate pb-3`}>
                  ou em até {installments}
                </div>
              )}
          </div>

        )}
        <div class="absolute top-2 right-2 md:top-3 md:right-4">
          <WishlistButton
            productGroupID={productGroupID}
            productID={productID}
          />
        </div>
      </div>
    </>
  );

  return (
    <a
      id={id}
      href={url && relative(url.split("?")[0])}
      class={listLayout}
      data-deco="view-product"
      {...(advertisement?.adId && { "data-van-aid": advertisement.adId })}
      {...(advertisement?.adResponseId && { "data-van-res-id": advertisement.adResponseId })}
      {...(advertisement?.adId && { "data-van-prod-name": name })}
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure class={`flex flex-col gap-2 items-center`}
      >
        {/* Product Images */}
        <div
          aria-label="view product"
          class={`grid grid-cols-1 grid-rows-1 w-full md:w-full justify-center items-center p-0 md:max-h-full`}
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`max-h-52 bg-base-100 col-span-full row-span-full rounded w-full ${layout?.onMouseOver?.image == "Zoom image"
              ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
              : ""
              }`}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!layout?.onMouseOver?.image ||
            layout?.onMouseOver?.image == "Change image") && device == "desktop" && (
              <Image
                src={back?.url ?? front.url!}
                alt={back?.alternateName ?? front.alternateName}
                width={WIDTH}
                height={HEIGHT}
                class="bg-base-100 col-span-full row-span-full transition-opacity rounded w-full opacity-0 lg:group-hover:opacity-100"
                sizes="(max-width: 640px) 50vw, 20vw"
                loading="lazy"
                decoding="async"
              />
            )}
        </div>
      </figure>

      {productCardPrice}
    </a>
  );
}

export default ProductCardHorizontal;
