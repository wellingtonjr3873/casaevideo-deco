import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
  quantity?: number;
  className?: string;
  label?: string;
}

function AddToCartButton({ seller, productID, eventParams, quantity = 1, className, label }: Props) {
  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      orderItems: [{
        id: productID,
        seller: seller,
        quantity,
      }],
    });

  return <Button onAddItem={onAddItem} eventParams={eventParams} className={className} label={label}/>;
}

export default AddToCartButton;
