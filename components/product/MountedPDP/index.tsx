import { useId } from "$store/sdk/useId.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import Breadcrumb from "deco-sites/casaevideo/components/ui/Breadcrumb.tsx";
import ProductBasicInfo from "deco-sites/casaevideo/components/product/MountedPDP/ProductBasicInfo/index.tsx";
import GallerySlider from "deco-sites/casaevideo/components/product/Gallery/ImageSlider.tsx";
import ProductSelector from "deco-sites/casaevideo/components/product/ProductVariantSelector.tsx";
import { CVCreditCardBanner } from "deco-sites/casaevideo/components/icons/CVCreditCardBanner.tsx";
import ProductPrice from "deco-sites/casaevideo/components/product/MountedPDP/ProductPrice/index.tsx";
import AddToCartComponents from "deco-sites/casaevideo/islands/AddToCartComponents.tsx";
import ShippingSimulation from "deco-sites/casaevideo/islands/ShippingSimulation.tsx";
import { useOffer } from "deco-sites/casaevideo/sdk/useOffer.ts";


interface Props {
  page: ProductDetailsPage | null;
}

function MountedPDP({ page }: Props) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    breadcrumbList,
    product,
  } = page;

  const {
    seller
  } = useOffer(product.offers);

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  return (
    <div class="container flex flex-col">
      <div class="py-4">
        <Breadcrumb itemListElement={breadcrumb.itemListElement} />
      </div>

      <div class="flex gap-3" id={id}>
        <div class="bg-neutral-50 w-2/3 flex gap-4 rounded-lg h-[520px] py-4">
          {/* Product Image */}
          <div class="w-1/2">
            <GallerySlider page={page} layout={{ width: 400, height: 400 }} />
          </div>
          <div class="w-1/2 flex flex-col gap-4 pr-4">
            <ProductBasicInfo product={product} />
            <ProductSelector product={product} />
            <CVCreditCardBanner />
          </div>
        </div>

        <div class="bg-neutral-50 w-1/3 h-[520px] p-4 flex flex-col gap-6">
          <ProductPrice product={product} />
          <AddToCartComponents page={page} />
          {platform === "vtex" && (
            <ShippingSimulation
              items={[{
                id: Number(product.sku),
                quantity: 1,
                seller: seller || '1',
              }]}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MountedPDP;
