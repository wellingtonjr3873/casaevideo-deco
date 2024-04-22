import { useBuyTogether } from "deco-sites/casaevideo/sdk/useBuyTogether.ts";

export interface Props {
  index: number
}

function BuyTogetherSelectButton(props: Props) {
  const { index } = props;
  const { addToCartState } = useBuyTogether();

  function updateState () {
    const updatedState = [...addToCartState.value];
    updatedState[index] = !updatedState[index];

    addToCartState.value = updatedState;
  }

  return (
    <div class="buytogether-checkbox md:absolute top-4 right-5 border-1">
      <input 
        type="checkbox"
        class="flex cursor-pointer"
        checked={addToCartState.value?.[index]}
        onChange={updateState}
      />
    </div>
  );
}

export default BuyTogetherSelectButton;
