import { Signal, useSignal } from "@preact/signals";
import { useCallback, useEffect } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import type { SimulationOrderForm, SKU, SelectedSla, SelectedDeliveryChannel, DeliveryID, AvailableDeliveryWindow, PickupStoreInfo, Sla } from "apps/vtex/utils/types.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useUI } from "deco-sites/casaevideo/sdk/useUI.ts";

export interface SlaComponent {
  id: SelectedSla;
  deliveryChannel: SelectedDeliveryChannel;
  name: SelectedSla;
  deliveryIds: DeliveryID[];
  shippingEstimate: string;
  shippingEstimateDate: null;
  lockTTL: null;
  availableDeliveryWindows: AvailableDeliveryWindow[];
  deliveryWindow: null;
  price: number;
  listPrice: number;
  tax: number;
  pickupStoreInfo: PickupStoreInfo;
  pickupPointId: null | string;
  pickupDistance: number | null;
  polygonName: string;
  transitTime: string;
  isFaster: boolean;
}
export interface Props {
  items: Array<SKU>;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();
  const { simulationState } = useUI();

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial: SlaComponent[], { slas }) => {
      if (slas) {
        return [...initial, ...slas.map((sla: Sla) => ({ ...sla, isFaster: false }))];
      }
      return initial;
    },
    [] as SlaComponent[]
  ) ?? [];
  
  const sortMethods = () => {

    const convertShippingEstimateToMinutes = (estimate: string): number => {
      if (estimate.endsWith('bd')) {
        return parseInt(estimate) * 24 * 60;
      } else if (estimate.endsWith('h')) {
        return parseInt(estimate) * 60; 
      }
      return 0;
    };
  
    methods.sort((a, b) => {
      const timeA = convertShippingEstimateToMinutes(a.shippingEstimate);
      const timeB = convertShippingEstimateToMinutes(b.shippingEstimate);
  
      if (timeA !== timeB) {
        return timeA - timeB; 
      } else {
        return a.listPrice - b.listPrice; 
      }
    });
  
    const pickupMethods = methods.filter(method => method.deliveryChannel === 'pickup-in-point');
    const deliveryMethods = methods.filter(method => method.deliveryChannel === 'delivery');
  
    const fastestPickup = pickupMethods.length > 0 ? pickupMethods[0] : null;
  
    const fastestDelivery = deliveryMethods.slice(0, 2);
  
    const resultArray = [];
    if (fastestPickup) {
      resultArray.push(fastestPickup);
    }
    resultArray.push(...fastestDelivery);
  
    let fastestTime = Infinity;
    resultArray.forEach(method => {
      const methodTime = convertShippingEstimateToMinutes(method.shippingEstimate);
      if (methodTime < fastestTime) {
        fastestTime = methodTime;
      }
    });
  
    resultArray.forEach(method => {
      method.isFaster = convertShippingEstimateToMinutes(method.shippingEstimate) === fastestTime;
    });
  
    return resultArray;
  };
  
  const topMethods = sortMethods();

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (simulationState.value == "error" ) {
    return (
      <div class="p-2">
        <span>Não existe um frete disponível para o CEP informado</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col bg-base-200 rounded-[4px] border border-brand-secondary-50 lg:rounded-lg w-full ">
      {topMethods.map((method, idx) => (
        <li class={`${method.isFaster && "faster-pickup"} flex justify-between items-center border-base-200 not-first-child:border-t text-left gap-1 border-b border-brand-secondary-50 p-2`}>
          <div class="flex flex-col">
            <span class="text-button text-left small-regular">
              {method.deliveryChannel === "pickup-in-point" ?
                `Retirada ${method?.pickupStoreInfo?.friendlyName?.split("-")?.[1]?.trim()}`
                :
                `Transportadora ${idx}`
              }
            </span>
            <span class={`flex gap-1 text-button small-regular ${method.isFaster && "faster-pickup-info"} bold`}>
              até {formatShippingEstimate(method.shippingEstimate)}
            </span>
          </div>

          <span class="text-base font-semibold text-right">
            {method.price === 0 ? "Grátis" : (
              formatPrice(method.price / 100, currencyCode, locale)
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);  
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();
  const currentCepIsExist = IS_BROWSER ? localStorage?.getItem("USER_CEP") : undefined
  const { simulationState } = useUI();

  const formatarCEP = (cep: string) => {
    cep = cep.replace(/\D/g, '');
    cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
    return cep;
  };

  const handleSimulation = useCallback(async () => {
    const cepNumbers = postalCode.value.replace(/-/g, '');
    if (cepNumbers.length !== 8) {
      return;
    }
  
    try {
      loading.value = true;
      const result = await simulate({
        items: items,
        postalCode: cepNumbers,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
  
      simulateResult.value = result;
      if(result) {
        simulationState.value = result?.messages?.[0]?.status || ""
      }
      return result; 
    } finally {
      loading.value = false;
    }
  }, []);

  useEffect(() => {
    if (currentCepIsExist) {
      postalCode.value = currentCepIsExist;
      handleSimulation();
    }
  }, [])


  return (
    <div class="flex flex-col border border-brand-secondary-50 rounded-lg p-4 w-full gap-4 overflow-y-auto">
      <div class="flex gap-2 body-regular text-neutral-900">
        <Icon id="Frete" class="text-brand-secondary-900" width={24} height={24} />
        <span>Calcule o prazo de entrega</span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSimulation();
        }}
        class="flex gap-2"
      >
        <input
          as="input"
          type="text"
          class="input input-bordered w-full focus:outline-none"
          placeholder="CEP"
          maxLength={9}
          size={9}
          value={postalCode.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            postalCode.value = formatarCEP((e.target as HTMLInputElement).value)
          }}
        />
        <Button class="min-w-[86px]" type="submit" loading={loading.value}>
          Calcular
        </Button>
      </form>

      <div class="flex gap-2 items-center">
        <a href="https://buscacepinter.correios.com.br/app/endereco/index.php?t" target="_blank" class="small-underline text-brand-primary-1 flex gap-2 items-center">Não sei meu CEP <Icon id="CepOpen" size={24} /></a>
      </div>

      <div>
        <div>
          <ShippingContent simulation={simulateResult} />
        </div>
      </div>
    </div>
  );
}

export default ShippingSimulation;
