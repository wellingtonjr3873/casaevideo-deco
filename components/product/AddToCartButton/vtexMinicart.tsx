import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./commonMinicart.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
  quantity?: number;
  className?: string;
  label?: string;
  callback?: () => void;
}

function AddToCartButton({ seller, productID, eventParams, quantity = 1, className, label, callback }: Props) {
  const { addItems } = useCart();
  const onAddItem = () => {
    const result = addItems({
      orderItems: [{
        id: productID,
        seller: seller,
        quantity,
      }],
    });

    return result;
  }
    

  return <Button onAddItem={onAddItem} eventParams={eventParams} callback={callback} className={className} label={label} />;
}

export default AddToCartButton;
