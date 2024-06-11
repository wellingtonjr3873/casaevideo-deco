import { ProductDetailsPage } from "apps/commerce/types.ts";
import { BuyTogetherLoader } from "deco-sites/casaevideo/loaders/product/buyTogether.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import AddToCart from "deco-sites/casaevideo/islands/AddToCartButton/vtex-multiple.tsx";
import BuyTogetherSelectButton from "deco-sites/casaevideo/islands/BuyTogetherSelectButton.tsx";
import BuyTogetherTotal from "deco-sites/casaevideo/islands/BuyTogetherTotal.tsx";
import { formatPrice } from "deco-sites/casaevideo/sdk/format.ts";

type PageProps = ProductDetailsPage & BuyTogetherLoader;

interface Props {
  page: ProductDetailsPage | null;
}

function BuyTogether(props: Props) {
  const { page } = props;
  const correctPage = page as PageProps;
  const {
    showTogether,
    product,
    breadcrumbList
  } = correctPage;

  if (correctPage === null) {
    throw new Error("Missing Product Details Page Info");
  }

  if (product?.productID === null || showTogether?.length === 0) {
    throw new Error("Missing Product Details Info");
  }

  if (showTogether.length === 1) return <></>;

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList,
    price: showTogether?.[0]?.price,
    listPrice: showTogether?.[0]?.listPrice,
  });

  const availableProducts = showTogether?.filter(product => product?.price > 0);

  return (
    <div class="container p-4 md:p-0 md:mt-[-170px]">
      <div class="flex flex-col w-full md:w-2/3">
        <strong class="body-regular my-4 hidden md:block">Aproveite e compre também</strong>
        <strong class="body-regular my-4 block md:hidden">Compre junto</strong>

        <div class="flex gap-6 w-full flex-col md:flex-row">
          {availableProducts?.map((item, idx) => (
            <div 
              class={
                `flex md:flex-col items-center md:items-start relative w-full md:max-w-[242px] border border-brand-secondary-100 rounded-lg p-4 bg-neutral-50 order-${(idx * 2) + 1}`
              }
              key={item?.productID}
            >
              <BuyTogetherSelectButton index={idx} />

              <div class="w-[150px] md:w-[210px]">
                <Image src={item?.image?.url} alt={item?.image?.alt} width={210} height={210} />
              </div>

              <div class="flex flex-col">
                <span class="text-[#393939] x-small-bold md:small-bold mb-2 md:mb-0">
                  {item?.name}
                </span>
                <span class="micro-regular md:micro-regular line-through text-[#393939]">
                  {item?.listPrice > 0 ? `${formatPrice(item?.listPrice, "BRL")}` : ""}
                </span>
                <span class="body-bold md:h6-bold text-[#393939]">
                  {item?.price > 0 ? `${formatPrice(item?.price, "BRL")}` : "Indisponível"}
                </span>
                <span class="xx-small-regular line-through hidden md:block text-[#393939]">
                  {item?.installments}
                </span>
              </div>
            </div>
          ))}

          {availableProducts.length > 1 && (
            <div class="order-2 md:flex items-center justify-center hidden">
              <Icon width={16} height={16} id="Plus" />
            </div>
          )}
        
          <div class="flex flex-col items-center justify-center w-full md:w-1/3 gap-1 order-last">
            <div class="order-1 md:order-3 w-full">
              <AddToCart
                items={showTogether}
                eventParams={{ items: [eventItem] }}
              />
            </div>
            <BuyTogetherTotal buyTogether={showTogether} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyTogether;
