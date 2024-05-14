import type { Platform } from "$store/apps/site.ts";
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
  /** *@hide */
  dataVanPlacement?: string;
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
  { product, preload, itemListName, layout, platform, index, device, dataVanPlacement }: Props,
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
    
  const allProduct = product

  const lowPrice = allProduct?.offers?.lowPrice


  const id = `product-card-${productID}`;
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];
  const titleImage = front.url?.split("/")[6].replaceAll("-"," ").split(".")[0];

  const { listPrice, price, pixPrice, installments, availability } = useOffer(offers);

  const productClusters = product.additionalProperty && product.additionalProperty;


  const filteredCluesters = productClusters && clusterFilter(productClusters);

  const tag  = layout?.tag;
  const clusterIdtag = tag?.id;
  const clusterActiveTag = tag?.active;
  const clusterTagBgColor = tag?.bgColor;
  const iconPathTag = tag?.icon?.[0];
  const textTag = tag?.text;

  const align =
    !layout?.basics?.contentAlignment || layout?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";

  const productCardPrice = (
    <>
      {/* Prouct Advertisement TAG */}
      <div class="h-3 flex justify-start items-center">
        {advertisement?.adId && <span class="text-[12px] text-[#989898]">Patrocinado</span>}
      </div>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col">
        {layout?.hide?.productName && layout?.hide?.productDescription
          ? ""
          : (
            <div class="flex flex-col gap-0 xs-small-regular md:body-regular">
              {layout?.hide?.productName ? "" : (
                <h3
                  class="truncate text-[#393939] x-small-bold md:body-bold line-clamp-2 whitespace-break-spaces"
                >{name ?? ""}</h3>
              )}
            </div>
          )}
        {/* IMPLEMENTAR ESTRELAS YOURVIEWS AQUI */}
        <div class="min-h-[24px] w-full pb-2 pt-1">

        </div>
        {layout?.hide?.allPrices ? "" : availability === "https://schema.org/InStock" ? (
          <div class="flex flex-col">
            <div
              class={`flex flex-col gap-0 ${layout?.basics?.oldPriceSize === "Normal"
                ? "lg:flex-row lg:gap-2"
                : ""
                } ${align === "center" ? "justify-center" : "justify-start"}`}
            >
              <div
                class={`text-base-300 xx-small-regular md:small-regular flex align-center gap-2 ${layout?.basics?.oldPriceSize === "Normal" ? "lg:text-xl" : ""
                  }`}
              >
                <span class="line-through">
                  {formatPrice(listPrice, offers?.priceCurrency)}
                </span>

                {(price && listPrice && price !== listPrice) &&
                  (
                    <div class="bg-success gap-1 h-4 sm:h-5 md:h-5 flex px-1 justify-center items-center text-neutral-50 rounded">
                      <Icon id="ArrowDown" width={16} height={16} />
                      {listPrice && lowPrice &&
                       `${(((listPrice- lowPrice)/listPrice) * 100).toFixed(0)}%`
                      }
                    </div>
                  )}
              </div>
              <div class="body-bold md:h6-bold-20 text-neutral-dark">
                {formatPrice(lowPrice, offers?.priceCurrency)} no PIX
              </div>
            </div>
            {layout?.hide?.installments
              ? ""
              : (
                <div class="text-brand-secondary-900 x-small-regular truncate">
                  ou {formatPrice(price, offers?.priceCurrency)} em até {installments}
                </div>
              )}
          </div>
        ) : <button class="w-full py-2 border border-brand-secondary-400 small-regular rounded-md mt-auto text-neutral-900">Indisponivel</button>}
      </div>
    </>
  );

  return (
    <a
      id={id}
      href={url && relative(url)}
      class={`card gap-2 card-compact md:max-w-[242px] md:max-h-[435px] group w-full bg-neutral-50 p-2 md:py-4 card-bordered border-brand-secondary-100 rounded-lg ${align === "center" ? "text-center" : "text-start"
        } 
        ${layout?.onMouseOver?.card === "Move up" &&
        "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
        }
      `}
      data-deco="view-product"
      {...(advertisement?.adId && { "data-van-aid": advertisement.adId })}
      {...(advertisement?.adResponseId && { "data-van-res-id": advertisement.adResponseId })}
      {...(advertisement?.adId && { "data-van-prod-name": name })}
      {...(dataVanPlacement && { "data-van-placement": dataVanPlacement })}
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
            title={titleImage}
            alt={name}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 col-span-full row-span-full rounded w-full ${layout?.onMouseOver?.image == "Zoom image"
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
                title={titleImage}
                alt={name}
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

export default ProductCard;
