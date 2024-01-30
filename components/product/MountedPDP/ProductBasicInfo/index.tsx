import { Product } from "apps/commerce/types.ts";
import { FreeShippingIcon } from "deco-sites/casaevideo/components/icons/FreeShippingIcon.tsx";
import { PickingExpressIcon } from "deco-sites/casaevideo/components/icons/PickingExpressIcon.tsx";

interface Props {
  product: Product;
}

function ProductBasicInfo({ product }: Props) {
  const {
    name = "",
    gtin,
    isVariantOf,
  } = product;

  const description = product.description?.replaceAll("<br />", "") ||
    isVariantOf?.description?.replaceAll("<br />", "");

  return (
    <div class="flex flex-col gap-4 w-full">
      {/* tags */}
      <div class="flex gap-2">
        <FreeShippingIcon />
        <PickingExpressIcon />
      </div>

      <h1 class="h5-bold">
        {`${name}`}
      </h1>

      <div>
        {gtin && (
          <span class="x-small-regular text-base-300 flex gap-2">
            <span>(Código: {gtin})</span>
            <span>
              Marca:{" "}
              <span class="text-brand-primary-600 underline">
                {product.brand?.name}
              </span>
            </span>
          </span>
        )}
      </div>

      <div>
        <span class="text-sm">
          {description && (
            <div
              class="h-14 overflow-hidden"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          <a
            href="#description"
            class="text-brand-primary-600 x-small-regular underline"
          >
            Ler descrição completa
          </a>
        </span>
      </div>
    </div>
  );
}

export default ProductBasicInfo;
