import { useId } from "$store/sdk/useId.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Breadcrumb from "deco-sites/casaevideo/components/ui/Breadcrumb.tsx";
import ProductBasicInfo from "deco-sites/casaevideo/components/product/MountedPDP/ProductBasicInfo/index.tsx";
import GallerySlider from "deco-sites/casaevideo/components/product/Gallery/ImageSlider.tsx";
import ProductSelector from "deco-sites/casaevideo/components/product/ProductVariantSelector.tsx";
import { CVCreditCardBanner } from "deco-sites/casaevideo/components/icons/CVCreditCardBanner.tsx";
import ProductPrice from "deco-sites/casaevideo/components/product/MountedPDP/ProductPrice/index.tsx";
import AddToCartComponents from "deco-sites/casaevideo/islands/AddToCartComponents.tsx";
import ShippingSimulation from "deco-sites/casaevideo/islands/ShippingSimulation.tsx";
import { useOffer } from "deco-sites/casaevideo/sdk/useOffer.ts";
import WishlistButton from "deco-sites/casaevideo/islands/WishlistButton.tsx";
import ProductVisualization from "deco-sites/casaevideo/islands/ProductVisualization.tsx";
import OursStores from "deco-sites/casaevideo/islands/OursStores.tsx";

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
  const { productID, isVariantOf } = product;
  const productGroupID = isVariantOf?.productGroupID ?? "";

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  return (
    <div class="container flex flex-col">
      <div class="p-4 md:px-0">
        <Breadcrumb itemListElement={breadcrumb.itemListElement} homeName="Casa&Video" />
      </div>



      <div class="flex flex-col md:flex-row gap-3" id={id}>
        <div class="md:bg-neutral-50 w-full md:w-2/3 flex flex-col md:flex-row gap-4 rounded-lg min-h-[520px] h-min md:py-4  md:border md:border-brand-secondary-100">
          {/* Product Image */}
          <div class="w-full md:w-1/2 flex flex-col relative gap-4">
            <div class="flex gap-2 px-4">
              <ProductVisualization product={product} />
              <WishlistButton
                variant="icon"
                productID={productID}
                productGroupID={productGroupID}
                absolute={true}
              />
            </div>
            <GallerySlider page={page} layout={{ width: 400, height: 400 }} />
          </div>
          <div class="w-full md:w-1/2 flex flex-col gap-4 pr-4 px-4">
            <ProductBasicInfo product={product} />
            <ProductSelector product={product} />
            <CVCreditCardBanner />
          </div>
        </div>

        <div class="px-4 md:px-0 w-full md:w-1/3">
          <div class="bg-neutral-50 w-full rounded-lg min-h-[520px] h-min flex flex-col gap-6 overflow-y-auto p-4 border border-brand-secondary-100">
            <ProductPrice product={product} />
            <AddToCartComponents page={page} />
            <div class="w-full order-2">

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
          <div class="mt-4">
            <OursStores product={{
              id: Number(product.sku),
              seller: seller || "1"
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MountedPDP;
