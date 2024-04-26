import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "deco-sites/casaevideo/islands/Analytics.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import { FreeShippingIcon } from "deco-sites/casaevideo/components/icons/FreeShippingIcon.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface tagsProps {
  active?: boolean;
  id?: string;
  icon?: ImageWidget[];
  text?: string;
  bgColor: string;
}

export interface Layout {
  tag?: tagsProps;
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

interface PropertyValue {
  "@type": string;
  name?: string | undefined;
  value?: string;
  propertyID?: string;
  valueReference?: string;
  description?: string;
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
  platform?: Platform;
  device?: "mobile" | "desktop" | "tablet";
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 210;
const HEIGHT = 210;

function ProductCard(
  { product, preload, itemListName, layout, platform, index, device }: Props,
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
  const [front, back] = images ?? [];

  const { listPrice, price, installments, availability } = useOffer(offers);

  const productClusters = product.additionalProperty && product.additionalProperty;

  function clusterFilter(objects: PropertyValue[]): string[] {
    return objects
      .filter(obj => obj.name === "cluster")
      .map(obj => obj.propertyID ?? "");
  }

  const filteredCluesters = productClusters && clusterFilter(productClusters);

  const l = layout;

  const firstItemTag = l?.tag;
  const clusterIdtag = firstItemTag?.id;
  const clusterActiveTag = firstItemTag?.active;
  const clusterTagBgColor = firstItemTag?.bgColor;
  const iconPathTag = firstItemTag?.icon?.[0];
  const textTag = firstItemTag?.text;

  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";

  const cta = (
    <a
      href={url && relative(url)}
      aria-label="view product"
      class="btn btn-block"
    >
      {l?.basics?.ctaText || "Ver produto"}
    </a>
  );

  const productCardPrice = (
    <>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col">
        {l?.hide?.productName && l?.hide?.productDescription
          ? ""
          : (
            <div class="flex flex-col gap-0 xs-small-regular md:body-regular">
              {l?.hide?.productName ? "" : (
                <h2
                  class="truncate x-small-bold md:body-bold line-clamp-2 whitespace-break-spaces"
                >{name ?? ""}</h2>
              )}
            </div>
          )}
        {/* IMPLEMENTAR ESTRELAS YOURVIEWS AQUI */}
        <div class="min-h-[24px] w-full pb-2 pt-1">

        </div>
        {l?.hide?.allPrices ? "" : availability === "https://schema.org/InStock" ? (
          <div class="flex flex-col">
            <div
              class={`flex flex-col gap-0 ${l?.basics?.oldPriceSize === "Normal"
                ? "lg:flex-row lg:gap-2"
                : ""
                } ${align === "center" ? "justify-center" : "justify-start"}`}
            >
              <div
                class={`text-base-300 xx-small-regular md:small-regular flex align-center gap-2 ${l?.basics?.oldPriceSize === "Normal" ? "lg:text-xl" : ""
                  }`}
              >
                <span class="line-through">
                  {formatPrice(listPrice, offers?.priceCurrency)}
                </span>

                {(price && listPrice && price !== listPrice) &&
                  (
                    <div class="bg-success gap-1 h-4 sm:h-5 md:h-5 flex px-1 justify-center items-center text-neutral-50 rounded">
                      <Icon id="ArrowDown" width={16} height={16} />
                      {((1 - (price / listPrice)) * 100).toFixed(0)}%
                    </div>
                  )}
              </div>
              <div class="body-bold md:h6-bold-20 text-neutral-dark">
                {formatPrice(price, offers?.priceCurrency)} no PIX
              </div>
            </div>
            {l?.hide?.installments
              ? ""
              : (
                <div class="text-brand-secondary-900 x-small-regular truncate">
                  ou em até {installments}
                </div>
              )}
          </div>
        ) : <button class="w-full py-2 border border-brand-secondary-400 small-regular rounded-md mt-auto text-neutral-900">Indisponivel</button>}

        {/* SKU Selector */}
        {
          /* {l?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            {l?.hide?.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-2 w-full ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )} */
        }
      </div>
    </>
  );

  return (
    <a
      id={id}
      href={url && relative(url)}
      class={`card gap-2 card-compact md:max-w-[242px] md:max-h-[435px] group w-full bg-neutral-50 p-2 md:py-4 card-bordered border-brand-secondary-100 rounded-lg ${align === "center" ? "text-center" : "text-start"
        } 
        ${l?.onMouseOver?.card === "Move up" &&
        "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
        }
      `}
      data-deco="view-product"
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
      <figure class="flex flex-col rounded-none" // style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Wishlist button */}
        <div class="flex justify-between items-center w-full h-8">
          <>
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
          </>
          {platform === "vtex" && (
            <WishlistButton
              productGroupID={productGroupID}
              productID={productID}
            />
          )}
        </div>
        {/* Product Images */}
        <div
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 w-2/3 sm:w-full p-2 justify-center items-center"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 col-span-full row-span-full rounded w-full ${l?.onMouseOver?.image == "Zoom image"
              ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
              : ""
              }`}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && device == "desktop" && (
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
        {
          /* <figcaption
          class={`
          absolute bottom-1 left-0 w-full flex flex-col gap-3 p-2 ${
            l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
              ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
              : "lg:hidden"
          }`}
        >

          {l?.onMouseOver?.showSkuSelector && (
            <ul class="flex justify-center items-center gap-2 w-full">
              {skuSelector}
            </ul>
          )}
          {l?.onMouseOver?.showCta && cta}
        </figcaption> */
        }
      </figure>

      {productCardPrice}
    </a>
  );
}

export default ProductCard;
