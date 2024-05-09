import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AddToCartParams } from "apps/commerce/types.ts";
import { useState } from "preact/hooks";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";

export interface Props {
  /** @description: sku name */
  eventParams: AddToCartParams;
  onAddItem: () => Promise<void>;
  callback?: () => void;
  className?: string;
  label?: string;
}

const useAddToCart = ({ eventParams, onAddItem, callback }: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await onAddItem();

      sendEvent({
        name: "add_to_cart",
        params: eventParams,
      });

      callback && callback();

      displayCart.value = true;
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading, "data-deco": "add-to-cart" };
};

export default function AddToCartButton({ ...props }: Props) {
  const btnProps = useAddToCart(props);
  const className = props.className;
  const label = props.label;

  return (
    <>
      <Button class={`btn-primary text-neutral-50 border-0 bg-brand-primary-1 hover:bg-brand-primary-1 body-regular ${className || ''}`} {...btnProps}>
        <Icon id="Cart" class="text-neutral-50" width={24} height={24} /> {label ? label : "Comprar"}
      </Button>
    </>
  );
}
