import { SendEventOnView } from "deco-sites/casaevideo/islands/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { AppContext } from "$store/apps/site.ts";
import type { SectionProps } from "deco/types.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  cardLayout?: cardLayout;
  /** *@hide */
  device: "mobile" | "desktop" | "tablet";
}

function ProductShelf({
  products,
  title,
  cardLayout,
  device,
}: SectionProps<typeof loader>) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  if(device === "mobile"){
    return(
      <>
        <div class="w-full container pl-4 sm:pl-0 flex flex-col gap-2 max-w-[1280px] md:px-6 xl-b:px-0">
          <h5 class="h5-bold w-full">{title}</h5>

            <ul class="flex overflow-x-scroll gap-4 col-span-full row-start-2 row-end-5  max-w-none">
              {products?.map((product, index) => (
                <li
                  class="carousel-item w-full max-w-[160px] last:pr-6 sm:last:pr-0 md:w-[calc(25%-16px)] xl:md:w-[calc(20%-16px)] md:max-w-none md:first:w-[25%] xl:first:w-[20%]"
                >
                  <ProductCard
                    product={product}
                    itemListName={title}
                    layout={cardLayout}
                    platform={"vtex"}
                    index={index}
                    device={device}
                  />
                </li>
              ))}
            </ul>

            <SendEventOnView
              id={id}
              event={{
                name: "view_item_list",
                params: {
                  item_list_name: title,
                  items: products.map((product, index) =>
                    mapProductToAnalyticsItem({
                      index,
                      product,
                      ...(useOffer(product.offers)),
                    })
                  ),
                },
              }}
            />
        </div>
      </>
    )
  }
  return (
    <div class="w-full container pl-4 sm:pl-0  flex flex-col gap-2 max-w-[1280px] md:px-6 xl-b:px-0">
      <h5 class="h5-bold w-full">{title}</h5>

      <div
        id={id}
        class="container grid grid-cols-[42px_1fr_42px] px-0"
      >
        <Slider class="carousel carousel-center sm:carousel-end gap-4 col-span-full row-start-2 row-end-5  max-w-none">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full max-w-[160px] last:pr-6 sm:last:pr-0 md:w-[calc(25%-16px)] xl:md:w-[calc(20%-16px)] md:max-w-none md:first:w-[25%] xl:first:w-[20%]"
            >
              <ProductCard
                product={product}
                itemListName={title}
                layout={cardLayout}
                platform={"vtex"}
                index={index}
                device={device}
              />
            </Slider.Item>
          ))}
        </Slider>

        <>
          <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="btn-circle absolute right-1/2 bg-neutral-50 text-brand-primary-500 border-none flex justify-center items-center shadow-far cursor-pointer w-[42px] h-[42px]">
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>
          <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="btn-circle absolute left-1/2 bg-neutral-50 text-brand-primary-500 border-none flex justify-center items-center shadow-far cursor-pointer w-[42px] h-[42px]">
              <Icon size={24} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </>
        <SliderJS rootId={id} />
        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product, index) =>
                mapProductToAnalyticsItem({
                  index,
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default ProductShelf;
