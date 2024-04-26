import AddToCartButtonVTEX, { Props as AddToCartButtonVTEXProps } from "deco-sites/casaevideo/components/product/AddToCartButton/vtex.tsx";
import Modal from "deco-sites/casaevideo/components/ui/Modal.tsx";
import { useId } from "deco-sites/casaevideo/sdk/useId.ts";
import { OpenModalType } from "deco-sites/casaevideo/components/product/ProductImageZoom.tsx";
import { AnalyticsItem } from "apps/commerce/types.ts";
import { useSignal } from "@preact/signals";
import Button from "deco-sites/casaevideo/components/ui/Button.tsx";

interface Props extends Pick<AddToCartButtonVTEXProps, "seller" | "productID" | "quantity"> {
  eventItem: AnalyticsItem;
  volts: string;
}

function VoltsModal({ seller, volts, productID, quantity = 1, eventItem }: Props) {
  const id = useId();
  const open = useSignal<boolean>(false);

  return (
    <div id={id}>
       <Modal
        loading="lazy"
        open={open.value}
        onClose={() => open.value = false}
      >
        
        <strong class="h4-bold">Confirmação Voltagem_Desk</strong>

        <span class="h6-regular">
          A opção escolhida foi: <strong class="h6-bold text-brand-primary-1">{volts}</strong>
        </span>

        <div class="flex gap-6">
          <Button class="body-regular h-12 rounded-md" onClick={() => open.value = false}/>

          <AddToCartButtonVTEX
            eventParams={{ items: [eventItem] }}
            productID={productID}
            seller={seller}
            quantity={quantity}
            label="Continuar"
          />
        </div>
      </Modal>

     
    </div>
    
  );
}

export default VoltsModal;
