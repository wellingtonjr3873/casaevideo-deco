import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";
import { createPortal, useEffect, useState, useRef } from 'preact/compat';
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

type AddressProps = {
    postalCode?: string
    geoCoordinates?: number[]
}


type UserCepProps = {
    logradouro: string
    city: string
    state: string
    cep: string
}

const OursStoresModal = ({handleCloseModal, product} : OursStoresModalProps) => {
    const loadingStores = useSignal(false);
    const [address, setAddress] = useState<AddressProps>({});
    const userCep = useSignal<UserCepProps | null>(null);
    const stores = useSignal<PickupPoint[]>([]);
    const userAlreadySearch = useSignal(false);

    const cepRef = useRef<HTMLInputElement>(null)

    const { simulate } = useCart();

    const handleGetStores = async (address: AddressProps) => {
        try{
            loadingStores.value = true
            const res = await simulate({
                items: [
                    {id: Number(product.id), quantity: 1, seller: product.seller}
                ],
                country: "BRA",
                ...address
            });
            
            stores.value = res.pickupPoints

        }catch(err){
            console.error(err)
        }finally{
            loadingStores.value = false
            userAlreadySearch.value = true
        }
    };

    const handleResetUserCep = () => userCep.value = null

    const StoreItem = (item: PickupPoint) => {
        return <li class="border-l-8 border-success px-2 py-4 rounded-lg bg-neutral-50 flex items-center justify-start gap-2">
            <Icon id="PickupPoint" size={24} class="text-brand-secondary-50"/>
            <div class="mr-auto">
                <h2 class="small-regular lg:body-regular text-neutral-900 line-clamp-1">{item.friendlyName}</h2>
                <span class="x-small-regular lg:small-regular text-neutral-500 line-clamp-1">{item.address.street}, {item.address.number}</span>
            </div>

            <div class="flex gap-1 w-[90px] lg:w-[110px] items-center justify-end">
                <Icon id="Checked" size={24} class="text-success w-4 h-4 lg:w-6 lg:h-6"/> 
                <span class="x-small-regular lg:small-regular text-success">Em estoque</span>
            </div>
        </li>
    }

    const getCoordenades = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((e) => {
                    const {longitude, latitude} = e.coords
                    setAddress({geoCoordinates: [longitude, latitude]})
                });
            } 
    }

    const getPostalCode = () => {
        const cepValue = cepRef?.current?.value.replace('-', '');
        fetch(`https://viacep.com.br/ws/${cepValue}/json/`, {headers: {'Content-Type': 'application/json'}})
            .then(res => res.json())
            .then(res => {
                userCep.value = {
                    cep: res.cep,
                    logradouro: res.logradouro,
                    city: res.localidade,
                    state: res.uf
                }
            }).finally(() => setAddress({postalCode: cepValue }));
    }

    useEffect(() => {
        if(address.postalCode || address.geoCoordinates)  handleGetStores(address)
    }, [address])

    return createPortal(<div class="fixed inset-0 flex items-center justify-center z-[19] bg-[rgba(255,255,255,0.75)]">
        <div class="fixed inset-0 flex flex-col bg-brand-secondary-50 z-20 w-full md:max-w-[496px] p-4 md:rounded-lg md:relative min-h-[264px] transition-all">
            <h2 class="h5-bold mb-4">Disponibilidade em lojas fisicas</h2>
            <span class="x-small-regular text-neutral-700 p-1 bg-neutral-50 rounded-sm w-fit mb-3">Estoque sujeito a disponibilidade ao longo do dia</span>
            <span class="x-small-regular text-neutral-700 p-1 bg-neutral-50 rounded-sm w-fit mb-4">Preço do site pode ser diferente da loja fisica</span>
            <button 
                onClick={getCoordenades}
            class="flex h-10 py-[10px] border border-brand-secondary-400 gap-2 items-center justify-center rounded-md bg-neutral-50 text-neutral-900">
            <Icon id="PickupPoint" size={24} class="text-neutral-50"/>
                Usar minha localização
            </button>
            
            <div class="flex gap-2 items-center justify-center mt-2">
                <span class="small-regular text-neutral-900">Ou pesquise pelo CEP</span>
               {userCep.value && <span class="small-underline text-brand-primary-1 cursor-pointer" onClick={handleResetUserCep}>Alterar</span>}
            </div>

            {userCep.value ? <p class="small-bold m-0 text-center mt-4"><strong>{userCep.value!.logradouro} - {userCep.value!.city} - {userCep.value!.state} - {userCep.value?.cep}</strong></p>: <form class="flex gap-2 mt-2" onSubmit={getPostalCode}>
                <input ref={cepRef} placeholder="CEP"  class="h-10 rounded-md border border-neutral-200 py-2 px-4 w-full"/> 
                <button class="h-10 rounded-md text-neutral-50 flex items-center justify-center bg-brand-primary-1 text-neultra-50 py-[10px] px-3">Calcular</button>
            </form>}

            <ul class="gap-4 flex flex-col lg:max-h-[560px] overflow-y-auto custom-scroll pr-2 mt-2 lg:mt-9">
            {!loadingStores.value ? 
                (stores.value.length ? (stores.value.map((item) => {
                  return <StoreItem {...item} />
                })) : 
                (userAlreadySearch.value ? <p>Não existem pontos de retirada para esse endereço</p> : <></>))
            :   (<div class="flex items-center justify-center mt-4">
                 <span class="loading loading-spinner w-16" />
                </div> )
            }
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