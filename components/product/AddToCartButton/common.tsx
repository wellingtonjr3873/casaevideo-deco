import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AddToCartParams } from "apps/commerce/types.ts";
import { useState } from "preact/hooks";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import { useToast } from "deco-sites/casaevideo/sdk/useToast.ts";
import { ToastSucess, ToastError, ToastInfo, ToastWarning } from "$store/islands/Toast/Toast.tsx";

export interface Props {
  /** @description: sku name */
  eventParams: AddToCartParams;
  onAddItem: () => Promise<void>;
  showToasts?: boolean;
  callback?: () => void;
  className?: string;
  label?: string;
}

const useAddToCart = ({ eventParams, onAddItem, callback }: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();
  const { toastSucess, toastError, toastMessage} = useToast();

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
      toastSucess.value = true;
      toastMessage.value = "Produto adicionado ao carrinho com sucesso!"
    } catch (error) {
      toastError.value = true;
      toastMessage.value = "Houve um problema ao tentar adicionar ao carrinho, tente novamente!"
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading, "data-deco": "add-to-cart" };
};

export default function AddToCartButton({ showToasts = true, ...props }: Props) {
  const btnProps = useAddToCart(props);
  const className = props.className;
  const label = props.label;

  return (
    <>
      <Button class={`btn-primary text-neutral-50 border-0 bg-brand-primary-1 hover:bg-brand-primary-1 body-regular ${className || ''}`} {...btnProps}>
        <Icon id="Cart" class="text-neutral-50" width={24} height={24} /> {label ? label : "Comprar"}
      </Button>

      {showToasts && (
        <>
          <ToastSucess className={`top-[100px] left-4`}/>
          <ToastError className={`top-[200px] left-4`}/>
          <ToastInfo className={`top-[300px] left-4`}/>
          <ToastWarning className={`top-[400px] left-4`}/>
        </>
      )}
    </>
  );
}
