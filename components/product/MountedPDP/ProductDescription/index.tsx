import { Product, ProductDetailsPage } from "apps/commerce/types.ts";


interface Props {
  page: ProductDetailsPage | null;
}

const invisibleProps = [
  "produto3d",
  "video",
  "sellerid",
  "dimensoes",
  "dimensões",
  "dimensões (cm)",
  "dimensões (m)",
  "category",
  "cluster",
];

interface ProductAdditionalProps {
  name: string;
  value: string;
}

interface ProductAdditionalInfo {
  name: string;
  infos: {
    name: string;
    value: string;
  }[];
}

function ProductAdditionalInfo({
  name,
  infos,
}: ProductAdditionalInfo) {

  if (infos.length === 0) return <></>;

  return (
    <div
      class="collapse collapse-arrow min-h-14 bg-neutral-50 rounded-none last:rounded-b-lg md:rounded-lg border border-t-0 md:border-t border-brand-secondary-100 transition-none h-max"
    >
      <input type="checkbox" name="my-accordion-3" checked /> 
      <div class="collapse-title body-bold p-4">
        {name}
      </div>
      
      <div class="collapse-content border-t-2 border-brand-secondary-100 rounded-none">
        <ul class="p-4 list-none">
          {infos?.map((info) => (
            <li key={info.name} class="flex x-small-regular px-2 py-4 border-b border-brand-secondary-50 last:border-none">
              <strong class="flex x-small-bold w-1/4">{info.name}</strong>
              <span class="flex x-small-regular w-3/4">{info.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ProductDescription(props: Props) {
  const { page } = props;

  if (page === null) {
    return;
  }

  const {
    product,
  } = page;

  const dimensions = product.isVariantOf?.additionalProperty?.find(
    (prop) => prop.name?.toLocaleLowerCase().includes("dimensões") ||
    prop.name?.toLocaleLowerCase().includes("dimensõos")
  );

  const parsedDimensions = dimensions?.value?.split(";").map((dimension) => {
    const [name, rawValue] = dimension.split(":");
    const unit = dimensions?.name?.includes('cm') ? 'cm' : 'm';
    const value = rawValue ? `${rawValue?.trim()} ${unit}`: '';

    return ({
      name,
      value,
    })
  });

  const datasheetProps = new Set();

  const datasheetValues = product.isVariantOf?.additionalProperty?.reduce((acc, cur) => {
    if (
      cur.name &&
      !invisibleProps.includes(cur.name?.toLocaleLowerCase()) &&
      !datasheetProps.has(cur.name?.toLocaleLowerCase())
    ) {
      datasheetProps.add(cur.name?.toLocaleLowerCase());

      acc.push({
        name: cur.name,
        value: cur.value || '',
      });
    }
    return acc;
  }, [] as ProductAdditionalProps[]);

  const MAX_LENGTH_MOBILE = 780;
  const MAX_LENGTH_DESKTOP = 1200;

  return (
    <div id="description" class="container px-4 md:px-0 mt-4">
      {product.description && product.description.length > 0 &&
      <div class="pdp-description grid-cols-1 collapse collapse-arrow bg-neutral-50 px-2 rounded-none rounded-t-lg md:rounded-lg border border-brand-secondary-100 transition-none">
        <input type="checkbox" name="my-accordion-3" checked /> 
        <div class="collapse-title body-bold p-4">
          Descrição do produto
        </div>
        
        <div class="pdp-see-more collapse-content collapse collapse-arrow items-center border-t-2 border-brand-secondary-100 p-0 rounded-none">
          {product.description.length > MAX_LENGTH_MOBILE &&
            <>
              <input type="checkbox" name="my-accordion-2" class={"block lg:hidden input-description-see-more"}/> 
              <div class="description-see-more block lg:hidden min-h-20 collapse-title body-regular relative">
                Ver Mais
              </div>
            </>
          }
          {product.description.length > MAX_LENGTH_DESKTOP &&
            <>
              <input type="checkbox" name="my-accordion-2" class={"hidden lg:block input-description-see-more"}/> 
              <div class="description-see-more hidden lg:block min-h-20 collapse-title body-regular relative">
                Ver Mais
              </div>
            </>
          }
          
        
          {product.description && (
            <div class="collapse-content px-0"> 
              <div
                class="x-small-regular lg:body-regular py-4 md:p-4 flex flex-col gap-4 items-stretch justify-stretch mb-8"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}
        </div>
      </div>
      }
    
    
      <div class="flex flex-col md:flex-row md:gap-4 md:mt-4">
        <ProductAdditionalInfo name="Ficha Técnica" infos={datasheetValues || []} />
        <ProductAdditionalInfo name="Dimensões da embalagem" infos={parsedDimensions || []} /> 
      </div>
    </div>
  );
}

export default ProductDescription;
