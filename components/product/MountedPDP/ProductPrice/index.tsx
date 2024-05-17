import { Product } from "apps/commerce/types.ts";
import { useOffer } from "deco-sites/casaevideo/sdk/useOffer.ts";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import { formatPrice } from "deco-sites/casaevideo/sdk/format.ts";
import Installments from "deco-sites/casaevideo/islands/Installments.tsx";
interface Props {
  product: Product;

}

function ProductPrice({ product }: Props) {
  const {
    offers
  } = product;

  const allProduct = product

  const lowPrice = allProduct?.offers?.lowPrice

  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
    pixPrice,
  } = useOffer(offers);


  const priceHtml = (
    <div
      class={`flex flex-col gap-2`}
    >
      <span class="text-brand-secondary-600 x-small-regular md:body-regular line-through">
        de {formatPrice(listPrice, offers?.priceCurrency)}
      </span>

      <div class="small-regular md:body-regular text-neutral-900 flex items-end">
        <span class="h5-bold md:h4-bold">{formatPrice(lowPrice, offers?.priceCurrency)}</span>
        <span class="pl-1">no PIX</span>
        {(price && pixPrice && price !== pixPrice) && (
          <>
            <div class="bg-success gap-1 sm:h-5 h-6 flex ml-2 px-1 justify-center items-center text-neutral-50 rounded">
              <Icon id="ArrowDown" width={16} height={16} />
              {listPrice && lowPrice &&
                `${(((listPrice - lowPrice)/listPrice) * 100).toFixed(0)}% no Pix`
              }
            </div>
          </>
        )}
      </div>
      {(price && listPrice && price == pixPrice) ? (
        <>
          <div class="text-brand-secondary-900 x-small-regular md:body-regular">
            ou em até {installments}
          </div>
        </>
      ):
        <>
          <div class="text-brand-secondary-900 x-small-regular md:body-regular">
            ou {formatPrice(price, offers?.priceCurrency)} em até {installments}
          </div>
        </>
      }
    </div>
  );

  return (
    <div class="flex flex-col gap-6 w-full">
      <div class="flex flex-col gap-4">
        {availability === "https://schema.org/InStock" && priceHtml}

        {availability === "https://schema.org/InStock" && (
          <>
            <Installments installments={product.offers?.offers[0]!}/>

            <div class="small-regular md:body-regular text-neutral-900 flex gap-1 items-center">
              <Icon id="CVCreditCard" width="21" height="16" />
              <span>Parcele em até</span>
              <strong class="text-brand-primary-1 small-bold md:body-bold">10x no cartão Casa&Video</strong>
            </div>
          </>
        )}
      </div>
  
      
    </div>
  );
}

export default ProductPrice;
