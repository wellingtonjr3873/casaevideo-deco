import { useSignal } from "@preact/signals";
import { createPortal } from 'preact/compat';
import type { ComponentChildren } from "preact";
import { formatPrice } from "deco-sites/casaevideo/sdk/format.ts";
import { Offer } from "apps/commerce/types.ts";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";


type Installment = {
    name: string;
    description: string;
    billingDuration: number;
    billingIncrement: number;
    price: number;
}

export interface Props  {
    installments: Offer
}


type ModalProps = {
    handleCloseModal: (value: boolean) => void
    children: ComponentChildren
}

const Modal = ({handleCloseModal, children}: ModalProps) => {
    return createPortal(<div class="fixed inset-0 flex items-center justify-center z-[19] bg-[rgba(255,255,255,0.75)]">
        <div class="fixed inset-0 flex flex-col bg-brand-secondary-50 z-20 w-full md:max-w-[496px] p-4 md:rounded-lg md:relative md:min-h-[575px] transition-all">
            <h2 class="h5-bold mb-4">Consulte mais formas de pagamento</h2>
                {children}
            <button class="border-2 border-black rounded-full w-6 h-6 absolute right-[18px] flex items-center justify-center" onClick={() => handleCloseModal(false)}>
                <Icon id="Close" size={16} stroke-width={2} />
            </button>
        </div>
    </div>,
        document.body)
}

const Installments = ({installments}: Props) => {

    const availableOffers = ["picpay", "casaevideo", "visa", "amedigital", "pix", "googlepay"]
    const availableOffersDictionary = {
      "picpay": "Pic pay",
      "visa": "Cartão de crédito",
      "casaevideo": "Cartão Casa & Video",
      "amedigital": "Ame Digital",
      "pix": "Pix",
      "googlepay": "Google Pay"
    }
    const availableOffersIconDictionary = {
        "picpay": "PicPayOption",
        "visa": "CVCardOption",
        "casaevideo": "CeVCardOption",
        "amedigital": "AmeDigitalOption",
        "pix": "PixOption",
        "googlepay": "GooglePay"
      }

    const formatedOffers = installments.priceSpecification.reduce((acumulator, item) => {
        acumulator[item.name] ??=  []
        acumulator[item.name].push(item)
        return acumulator
    }, {} as {[key: string]: Installment})  || {} 

    Object.keys(formatedOffers).forEach(item => {
        if(availableOffers.includes(item.toLowerCase())) return
        delete formatedOffers[item]
    })

    const tratedKeys = Object.keys(formatedOffers)
    const selectedOptionIndex = useSignal(tratedKeys[0]);
    const openedInstallmentsModal = useSignal(false);   

    const handleInstallmentsModal = (value: boolean) => {
        openedInstallmentsModal.value = value
     }

     const handleSetInstallmentBar = (name: string) => selectedOptionIndex.value = name
    return <>
    <a class="small-regular text-neutral-600 underline cursor-pointer" onClick={() => handleInstallmentsModal(true)}>
        Ver mais formas de pagamento
    </a>
    {openedInstallmentsModal.value && <Modal handleCloseModal={handleInstallmentsModal}>
            <nav class="flex border-b border-neutral-100 justify-between">
                {tratedKeys.map(item => 
                    <li onClick={() => handleSetInstallmentBar(item)} class={`list-none grayscale ${selectedOptionIndex.value.toLowerCase() === item.toLowerCase() ? "border-b-[3px] border-brand-secondary-1 grayscale-0" : ""}`}>
                    <Icon id={availableOffersIconDictionary[item.toLowerCase()]} size={64}/>
                    </li>)}
            </nav>
            <div class="mt-4 mb-4">
                <p class="small-regular">com <strong>{availableOffersDictionary[selectedOptionIndex.value.toLowerCase()]}</strong></p>
            </div>
            <table class="rounded-sm overflow-hidden">
                <tbody class="[&>*:nth-child(odd)]:bg-neutral-50 rounded-sm">
                    {formatedOffers[selectedOptionIndex.value].map(item => 
                        <tr class="text-neutral-900 body-regular">
                            <td class="w-[45%] md:w-[35%] body-regular text-neutral-900 pl-4 py-2">{item.billingDuration}x de {formatPrice(item.billingIncrement)}</td> 
                            <td class="small-regular text-neutral-500">sem juros</td>  
                            <td class="ml-auto text-neutral-900 body-regular text-right pr-4 py-2">{formatPrice(item.price)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Modal>}
  </>
}

export default Installments
