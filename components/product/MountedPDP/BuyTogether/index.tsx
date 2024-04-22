import { ProductDetailsPage } from "apps/commerce/types.ts";
import { BuyTogetherLoader } from "deco-sites/casaevideo/loaders/product/buyTogether.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import AddToCart from "deco-sites/casaevideo/islands/AddToCartButton/vtex-multiple.tsx";
import BuyTogetherSelectButton from "deco-sites/casaevideo/islands/BuyTogetherSelectButton.tsx";

type PageProps = ProductDetailsPage & BuyTogetherLoader;

interface Props {
  page: ProductDetailsPage | null;
}

function BuyTogether(props: Props) {
  const { page } = props;
  const correctPage = page as PageProps;
  const {
    buyTogether,
    product,
    breadcrumbList
  } = correctPage;

  if (correctPage === null) {
    throw new Error("Missing Product Details Page Info");
  }

  if (product.productID === null || buyTogether.length === 0) {
    throw new Error("Missing Product Details Info");
  }

  if (buyTogether.length === 1) return <></>;

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList,
    price: buyTogether[0].price,
    listPrice: buyTogether[0].listPrice,
  });

  const total = buyTogether.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <div class="container p-4 md:p-0">
      <div class="flex flex-col w-full md:w-2/3">
        <strong class="body-regular my-4 hidden md:block">Aproveite e compre também</strong>
        <strong class="body-regular my-4 block md:hidden">Compre junto</strong>

        <div class="flex gap-6 w-full flex-col md:flex-row">
          {buyTogether.map((item, idx) => (
            <div 
              class={
                `flex md:flex-col items-center md:items-start relative w-full md:max-w-[242px] border border-brand-secondary-100 rounded-lg p-4 bg-neutral-50 order-${(idx * 2) + 1}`
              }
              key={item.productID}
            >
              <BuyTogetherSelectButton index={idx} />

              <div class="w-[150px] md:w-[210px]">
                <Image src={item.image.url} alt={item.image.alt} width={210} height={210} />
              </div>

              <div class="flex flex-col">
                <span class="x-small-bold md:small-bold mb-2 md:mb-0">
                  {item.name}
                </span>
                <span class="x-small-regular md:xx-small-regular line-through">
                  {item.listPrice > 0 ? `R$ ${item.listPrice.toFixed(2).replace(".", ",")}` : ""}
                </span>
                <span class="body-bold md:h6-bold">
                  {item.price > 0 ? `R$ ${item.price.toFixed(2).replace(".", ",")}` : "Indisponível"}
                </span>
                <span class="xx-small-regular line-through hidden md:block">
                  {item.installments}
                </span>
              </div>
            </div>
          ))}

          <div class="order-1 md:flex items-center justify-center hidden">
            <Icon width={16} height={16} id="Plus" />
          </div>

          <div class="flex flex-col items-center justify-center order-last w-full md:w-1/3 gap-1">
            <AddToCart
              items={buyTogether}
              eventParams={{ items: [eventItem] }}
            />

            <div class="flex md:flex-col items-center justify-center order-1">
              <span class="h5-bold  pr-1 md:pr-0">R$ {total.toFixed(2).replace(".", ",")}</span>
              <span class="body-regular">Valor Total</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyTogether;
