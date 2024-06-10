import { useBuyTogether } from "deco-sites/casaevideo/sdk/useBuyTogether.ts";
import { BuyTogetherProduct } from "deco-sites/casaevideo/types/buyTogether.ts";
import { formatPrice } from "deco-sites/casaevideo/sdk/format.ts";

export interface Props {
  buyTogether: BuyTogetherProduct[];
}

function BuyTogetherTotal(props: Props) {
  const { buyTogether } = props;
  const { addToCartState } = useBuyTogether();
  const total = buyTogether.reduce((acc, cur, idx) => {
    if (addToCartState.value[idx]) return acc + cur.price;
    return acc;
  }, 0);

  return (
    <div class="flex md:flex-col items-center justify-center order-1">
      <span class="h5-bold  pr-1 md:pr-0">
        {formatPrice(total, "BRL")}
      </span>
      <span class="body-regular">Valor Total</span>
    </div>
  );
}

export default BuyTogetherTotal;
