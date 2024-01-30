import { useId } from "$store/sdk/useId.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import Breadcrumb from "deco-sites/casaevideo/components/ui/Breadcrumb.tsx";
import ProductBasicInfo from "deco-sites/casaevideo/components/product/MountedPDP/ProductBasicInfo/index.tsx";

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

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  // console.log(product);

  return (
    <div class="container flex flex-col">
      <div class="py-4">
        <Breadcrumb itemListElement={breadcrumb.itemListElement} />
      </div>

      <div class="flex gap-3" id={id}>
        <div class="bg-neutral-50 w-2/3 flex gap-4 rounded-lg h-[520px] py-4">
          {/* Product Image */}
          <div class="w-1/2">Imagem</div>
          <div class="w-1/2">
            <ProductBasicInfo product={product} />
          </div>
        </div>

        <div class="bg-neutral-50 w-1/3 h-[520px]">
          Teste 2
        </div>
      </div>
    </div>
  );
}

export default MountedPDP;
