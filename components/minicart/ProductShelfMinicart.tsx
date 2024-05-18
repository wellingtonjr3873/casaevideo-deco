import { SendEventOnView } from "deco-sites/casaevideo/islands/Analytics.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductCardMinicart from "$store/components/minicart/ProductCardMinicart.tsx";
import { useUI } from "$store/sdk/useUI.ts"

export interface Props {
  collectionId?: string;
  count?: number;
  title?: string;
}

function ProductShelf({
  title,
}: Props) {
  const id = useId();
  const { productMinicartShelf } = useUI();
  if (!productMinicartShelf.value || productMinicartShelf.value.length === 0) {
    return null;
  }

  return (
    <div class="w-full mb-5">
      <p class="py-2 text-sm text-center text-neutral-dark font-normal">{title}</p>
      <div
        id={id}
        class="px-4 flex flex-col relative"
      >
        <Slider class="carousel carousel-center gap-2">
          {productMinicartShelf.value?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full"
            >
              <ProductCardMinicart
                product={product}
                itemListName={title}
                index={index}
              />
            </Slider.Item>
          ))}
        </Slider>

        <>
          <div class="hidden sm:block absolute left-8 top-8 z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="btn-circle bg-neutral-50 text-brand-primary-500 border-none flex justify-center items-center shadow-far cursor-pointer w-[42px] h-[42px]">
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>
          <div class="hidden sm:block absolute z-10 right-8 top-8 col-start-3 row-start-3">
            <Slider.NextButton class="btn-circle bg-neutral-50 text-brand-primary-500 border-none flex justify-center items-center shadow-far cursor-pointer w-[42px] h-[42px]">
              <Icon size={24} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </>
        <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4 h-[11px] absolute bottom-[-18px] left-1/2 max-[768px]:transform -translate-x-1/2">
        {productMinicartShelf.value?.map((image, index) => {
          return (
            <li class="carousel-item h-[11px] max-[768px]:h-[6px]">
              <Slider.Dot index={index}>
                <div class="">
                  <div
                    class="h-[11px] w-[11px] max-[768px]:w-[6px] max-[768px]:h-[6px] border-[2px] max-[768px]:border-[1px] border-[#ED1B2F] rounded-full group-disabled:bg-[#ED1B2F]"
                  />
                </div>
              </Slider.Dot>
            </li>
          );
        })}
      </ul>
        <SliderJS rootId={id} />
        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: productMinicartShelf.value.map((product, index) =>
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

export default ProductShelf;
