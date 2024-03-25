import { ProductDetailsPage } from "apps/commerce/types.ts";
import { useOffer } from "deco-sites/casaevideo/sdk/useOffer.ts";
import QuantitySelector from "deco-sites/casaevideo/components/ui/QuantitySelector.tsx";
import { useSignal } from "@preact/signals";
import AddToCartButtonVTEX from "deco-sites/casaevideo/components/product/AddToCartButton/vtex.tsx";
import OutOfStock from "deco-sites/casaevideo/components/product/OutOfStock.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

export interface Props {
  page: ProductDetailsPage | null;
}

function AddToCartComponents({ page }: Props) {
  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    breadcrumbList,
    product,
  } = page;

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const {
    productID,
    offers
  } = product;
  const {
    seller = "1",
    price,
    listPrice,
    availability,
  } = useOffer(offers);

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  function verifySeller(seller: string) {
    return /^CV\d+$/.test(seller);
  }

  const quantity = useSignal(1);

  return (
    <>
      {availability === "https://schema.org/InStock" ? (
        <>
          <div class="flex gap-6 order-1">
            <span class="small-regular text-neutral-600 w-[136px] flex">
              Selecione ou digite a quantidade desejada
            </span>

            <QuantitySelector
              quantity={quantity.value}
              onChange={(value) => quantity.value = value}
            />
          </div>

          <div class="flex flex-col gap-2 order-3">
            <AddToCartButtonVTEX
              eventParams={{ items: [eventItem] }}
              productID={productID}
              seller={seller}
              quantity={quantity.value}
            />
          </div>

          <span class="small-regular text-neutral-900 flex gap-2 order-4">
            Vendido e entregue por:
            <strong class="text-brand-primary-700">{seller === "1" || verifySeller(seller) ? "Casa & Video" : seller}</strong>
          </span>
        </>
      ) : <OutOfStock productID={productID} />}
    </>
  );
}

export default AddToCartComponents;
