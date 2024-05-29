import { Product } from "apps/commerce/types.ts";
import type { tagsProps } from "../../MountedPDP/index.tsx"


import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";


interface Props {
  product: Product;
  tags?: tagsProps[];
}
interface PropertyValue {
  "@type": string;
  name?: string | undefined;
  value?: string;
  propertyID?: string;
  valueReference?: string;
  description?: string;
}

function ProductBasicInfo({ product, tags }: Props) {
  
  const window = new JSDOM("").window;
  const DOMPurifyServer = DOMPurify(window);
  const {
    // gtin,
    isVariantOf,
  } = product;
  
  
  const refIdObject = product?.additionalProperty?.find(obj => obj.name === "RefId");
  const refIdValue = refIdObject ? refIdObject.value : null;

  const description = product.description?.replaceAll("<br />", "") ||
    isVariantOf?.description?.replaceAll("<br />", "");

  function clusterFilter(objects: PropertyValue[]): string[] {
    return objects
      .filter(obj => obj.name === "cluster")
      .map(obj => obj.propertyID ?? "");
  }

  const productClusters = product.additionalProperty && product.additionalProperty;
  const filteredCluesters = productClusters && clusterFilter(productClusters);

  return (
    <div class="flex flex-col gap-4 w-full">
      {/* tags */}
      <div class="flex gap-2">
        {tags && tags?.map((tag) => {
          return filteredCluesters && filteredCluesters?.map((clusterId) => (
            clusterId == tag?.id &&
            <div class="h-[24px] gap-1 small-regular rounded-md flex text-neutral-50 justify-between px-2 items-center" style={{ backgroundColor: tag?.bgColor }}>
              <img src={tag?.icon?.[0]} />
              {tag?.text}
            </div>
          ))
        })}
      </div>

      <h1 class="body-bold md:h5-bold">
        {`${isVariantOf?.name}`}
      </h1>

      <div>
        {refIdValue && (
          <span class="x-small-regular text-base-300 flex gap-2">
            <span>(Código: {refIdValue})</span>
            <span>
              Marca:{" "}
              <span class="text-brand-primary-600 underline">
                {product.brand?.name}
              </span>
            </span>
          </span>
        )}
      </div>

      <span class="small-regular hidden md:block">
        {description && (
          <div
            class="h-14 overflow-hidden"
            dangerouslySetInnerHTML={{ __html: DOMPurifyServer.sanitize(description) }}
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
  );
}

export default ProductBasicInfo;
