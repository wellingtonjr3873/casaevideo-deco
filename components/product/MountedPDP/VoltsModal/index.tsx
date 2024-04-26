import AddToCartButtonVTEX, { Props as AddToCartButtonVTEXProps } from "deco-sites/casaevideo/components/product/AddToCartButton/vtex.tsx";
import Modal from "deco-sites/casaevideo/components/ui/Modal.tsx";
import { useId } from "deco-sites/casaevideo/sdk/useId.ts";

import { AnalyticsItem } from "apps/commerce/types.ts";
import { useSignal } from "@preact/signals";
import Button from "deco-sites/casaevideo/components/ui/Button.tsx";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";

export interface Props extends Pick<AddToCartButtonVTEXProps, "seller" | "productID" | "quantity"> {

  eventItem: AnalyticsItem;
  volts: string;
}

function VoltsModal({ seller, volts, productID, quantity = 1, eventItem }: Props) {

  const openVolts = useSignal<boolean>(false);
  const id = useId();

  return (
    <div>
      <div id={id}>
        <Modal
          loading="lazy"
          open={openVolts.value }
          onClose={() => openVolts.value = false}
        >
          <div
            class="modal-box flex flex-col items-center justify-center bg-neutral-50 px-10 py-4 rounded h-[274px] md:h-40 md:w-[756px] relative"
          >
            <strong class="h5-bold md:h4-bold text-neutral-1 text-center">Confirme o produto selecionado</strong>

            <span class="small-regular md:h6-regular text-neutral-1 mt-2 text-center">
              A opção escolhida foi: <strong class="small-bold md:h6-bold text-brand-primary-1">{volts}</strong>
            </span>

            <div class="flex gap-6 mt-6">
              <Button class="body-regular hidden md:block h-12 rounded-md w-44" onClick={() => openVolts.value = false}>
                Voltar
              </Button>

              <AddToCartButtonVTEX
                eventParams={{ items: [eventItem] }}
                productID={productID}
                seller={seller}
                quantity={quantity}
                label="Continuar"
                className="h-12 rounded-md w-44"
                callback={() => openVolts.value = false}
                showToasts={false}
              />
            </div>
          
            <Button class="w-6 h-6 rounded-full absolute top-4 right-4 p-0 min-h-6" onClick={() => openVolts.value = false}>
              <Icon id="Close" class="text-neutral-1"  width={24} height={24} />
            </Button>
          </div>
        </Modal>
      </div>
      
      <Button
        class="btn-primary text-neutral-50 border-0 bg-brand-primary-1 hover:bg-brand-primary-1 body-regular w-full"
        onClick={() => {
          console.log("value", openVolts?.value)
          openVolts.value = true;
          console.log("value", openVolts?.value)
        }}
      >
        <Icon id="Cart" class="text-neutral-50" width={24} height={24} /> Comprar
      </Button>
    </div>

  );
}

export default VoltsModal;
