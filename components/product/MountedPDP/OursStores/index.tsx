import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";
import { createPortal, useEffect } from 'preact/compat';
import { Product } from "apps/commerce/types.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { PickupPoint } from "apps/vtex/utils/types.ts";


export type Props = {
    product:  {
        id: number,
        seller: string,
    }
}

type OursStoresModalProps = {
    handleCloseModal: ()  => void
    product: {
        id: number,
        seller: string,
    }
}

const OursStoresModal = ({handleCloseModal, product} : OursStoresModalProps) => {
    const loadingStores = useSignal(true);
    const stores = useSignal<PickupPoint[]>([]);

    const { simulate } = useCart();

    const handleGetStores = async () => {
        try{
            const res = await simulate({
                items: [
                    {id: Number(product.id), quantity: 1, seller: product.seller}
                ],
                country: "BRA",
                postalCode: "08570246"
            });
            
            stores.value = res.pickupPoints

        }catch(err){
            console.error(err)
        }finally{
            loadingStores.value = false
        }
    };

    const StoreItem = (item: PickupPoint) => {
        return <li class="border-l-8 border-success px-2 py-4 rounded-lg bg-neutral-50 flex items-center justify-start gap-2">
            <Icon id="PickupPoint" size={24} />
            <div class="mr-auto">
                <h2>{item.friendlyName}</h2>
                <span>{item.address.street}, {item.address.number}</span>
            </div>

            <div class="flex gap-1">
                <Icon id="Checked" size={24} class="text-success"/> 
                <span class="small-regular text-success">Em estoque</span>
            </div>
        </li>
    }

    useEffect(() => {
        handleGetStores()
    }, [])

    return createPortal(<div class="fixed inset-0 flex items-center justify-center z-30 bg-[rgba(255,255,255,0.75)]" onClick={handleCloseModal}>
        <div class="fixed inset-0 flex flex-col bg-brand-secondary-50 z-20 w-full md:max-w-[496px] p-4 md:rounded-lg md:relative min-h-[500px]">
            <h2 class="h5-bold mb-4">Disponibilidade em lojas fisicas</h2>
            <span class="x-small-regular text-neutral-700 p-1 bg-neutral-50 rounded-sm w-fit mb-3">Estoque sujeito a disponibilidade ao longo do dia</span>
            <span class="x-small-regular text-neutral-700 p-1 bg-neutral-50 rounded-sm w-fit mb-4">Preço do site pode ser diferente da loja fisica</span>

            <ul class="gap-4 flex flex-col lg:max-h-[560px] overflow-y-auto custom-scroll pr-2">
            {!loadingStores.value ? stores.value.length ? stores.value.map((item) => {
               return <StoreItem {...item} />
            }) : <p>Não existem stores</p>
            :   <div class="flex items-center justify-center mt-4">
                 <span class="loading loading-spinner w-16" />
                </div> }
            </ul>

            <button class="border-2 border-black rounded-full w-6 h-6 absolute right-[18px] flex items-center justify-center" onClick={handleCloseModal}>
                <Icon id="Close" size={16} stroke-width={2} />
            </button>
        </div>
    </div>, document.body)
}
const OursStores = ({product}: Props) => {

    const openedOursStoresModal = useSignal(false);

    const handleOpenOursStoresModal = (value: boolean) => {
      openedOursStoresModal.value = value
     }


    return <div class="flex flex-col gap-2 border border-brand-secondary-100 bg-neutral-50 p-4 rounded-lg">
        <h3 class="flex gap-2 text-brand-secondary-900 body-bold "><Icon id="OurStores" size={24}/> Disponibilidade em nossas lojas</h3>
        <p class="body-regular text-neutral-900">Saiba em quais lojas esse produto está disponível para você comprar ou retirar! </p>
        <button 
            class="border border-brand-secondary-400 shadow-sm bg-neutral-50 body-regular text-neutral-900 py-[10px] w-full rounded-md" 
            onClick={() => handleOpenOursStoresModal(true)}
        >
            Estoque na loja física  
        </button>  
        {openedOursStoresModal.value && <OursStoresModal handleCloseModal={() => handleOpenOursStoresModal(false)} product={product} />}
    </div>
}

export default OursStores