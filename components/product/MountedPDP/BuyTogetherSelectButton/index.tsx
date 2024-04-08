import { useBuyTogether } from "deco-sites/casaevideo/sdk/useBuyTogether.ts";

export interface Props {
  index: number
}

function BuyTogetherSelectButton(props: Props) {
  const { index } = props;
  const { addToCartState } = useBuyTogether();

  return (
    <input 
      type="checkbox"
      class="md:absolute top-4 right-5 border-1"
      checked={addToCartState.value?.[index]}
      onChange={() => addToCartState.value[index] = !addToCartState.value[index]}
    />
  );
}

export default BuyTogetherSelectButton;
