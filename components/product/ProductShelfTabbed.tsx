import { SendEventOnView } from "deco-sites/casaevideo/islands/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

/** @titleBy title */
interface Tab {
  title: string;
  products: Product[] | null;
}

export interface Props {
  tabs: Tab[];
  title?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
  tabIndex?: number;
}

function TabbedProductShelf({
  tabs,
  title,
  description,
  layout,
  cardLayout,
  tabIndex,
}: Props) {
  const id = useId();
  const platform = usePlatform();
  const ti = typeof tabIndex === "number"
    ? Math.min(Math.max(tabIndex, 0), tabs.length)
    : 0;
  const { products } = tabs[ti];

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full container  py-8 pl-4 sm:pl-0 flex flex-col gap-2 lg:py-10">
      <Header
        title={title || ""}
        description={description || ""}
        fontSize={layout?.headerfontSize || "Large"}
        alignment={layout?.headerAlignment || "center"}
      />

      <div class="flex justify-center">
        <div class="tabs tabs-boxed">
          {tabs.map((tab, index) => (
            <button
              class={`tab tab-lg ${index === ti ? "tab-active" : ""}`}
              {...usePartialSection({ props: { tabIndex: index } })}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      <div
        id={id}
        class="container grid grid-cols-[48px_1fr_48px] px-0"
      >
        <Slider class="carousel carousel-center sm:carousel-end gap-4 col-span-full row-start-2 row-end-5">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item md:w-60 w-56 last:pr-6 sm:last:pr-0"
            >
              <ProductCard
                product={product}
                itemListName={title}
                layout={cardLayout}
                platform={platform}
                index={index}
              />
            </Slider.Item>
          ))}
        </Slider>

        <>
          <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="btn-circle absolute right-1/2 bg-neutral-50 text-brand-primary-500 border-none flex justify-center items-center shadow-far cursor-pointer">
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>
          <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="btn-circle absolute left-1/2 bg-neutral-50 text-brand-primary-500 border-none flex justify-center items-center shadow-far cursor-pointer">
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

export default TabbedProductShelf;
