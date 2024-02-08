import { Product } from "apps/commerce/types.ts";
import { useOffer } from "deco-sites/casaevideo/sdk/useOffer.ts";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import { formatPrice } from "deco-sites/casaevideo/sdk/format.ts";

interface Props {
  product: Product;
}

function ProductPrice({ product }: Props) {
  const {
    offers
  } = product;

  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);

  console.log('seller', seller);

  const priceHtml = (
    <div
      class={`flex flex-col gap-2`}
    >
      <span class="text-brand-secondary-600 x-small-regular md:body-regular line-through">
        de {formatPrice(listPrice, offers?.priceCurrency)}
      </span>

      <div class="small-regular md:body-regular text-neutral-900 flex items-end">
        <span class="h5-bold md:h4-bold">{formatPrice(price, offers?.priceCurrency)}</span>
        <span class="pl-1">no PIX</span>

        {(price && listPrice && price !== listPrice) && (
          <div class="bg-success gap-1 sm:h-5 h-6 flex ml-2 px-1 justify-center items-center text-neutral-50 rounded">
            <Icon id="ArrowDown" width={16} height={16} />
            {((1 - (price / listPrice)) * 100).toFixed(0)}% no Pix
          </div>
        )}
      </div>

      <div class="text-brand-secondary-900 x-small-regular md:body-regular">
        ou em até {installments}
      </div>
    </div>
  );

  return (
    <div class="flex flex-col gap-6 w-full">
      <div class="flex flex-col gap-4">
        {availability === "https://schema.org/InStock" && priceHtml}

        {availability === "https://schema.org/InStock" && (
          <>
            <a href="#PaymentOptions" class="small-regular text-neutral-600 underline">
              Ver mais formas de pagamento
            </a>

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
