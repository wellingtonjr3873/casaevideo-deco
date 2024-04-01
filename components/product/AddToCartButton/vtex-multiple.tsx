import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";
import { BuyTogetherProduct } from "deco-sites/casaevideo/types/buyTogether.ts";
import { useBuyTogether } from "deco-sites/casaevideo/sdk/useBuyTogether.ts";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  items: BuyTogetherProduct[];
}

function AddToCartMultipleItemsButton({ items, eventParams }: Props) {
  const { addItems } = useCart();
  const { addToCartState } = useBuyTogether();

  const onAddItem = async () => {
    const orderItems = items
      .map((item, idx) => ({ ...item, add: addToCartState.value[idx]}))
      .filter((item) => item?.add)
      .map(((item) => ({
        id: item.productID,
        seller: item.seller,
        quantity: item.quantity || 1,
      })));

    if (orderItems.length === 0) return;

    await addItems({
      orderItems,
    });

    return;
  }

  return (
    <Button
      onAddItem={onAddItem}
      className="body-regular bg-neutral-dark x-small-bold text-neutral-50 w-full"
      eventParams={eventParams}
    />
  );
}

export default AddToCartMultipleItemsButton;
