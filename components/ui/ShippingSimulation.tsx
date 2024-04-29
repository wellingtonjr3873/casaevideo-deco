import { Signal, useSignal } from "@preact/signals";
import { useCallback, useEffect, useState } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
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

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  let pickupInPointCount = 0;
  let deliveryCount = 0;

  const filteredDelivery = methods.filter((item) => {
    if (item.deliveryChannel === "pickup-in-point" && pickupInPointCount < 1) {
      pickupInPointCount++;
      return true;
    } else if (item.deliveryChannel === "delivery" && deliveryCount < 2) {
      deliveryCount++;
      return true;
    }
    return false;
  });

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col bg-base-200 rounded-[4px] border border-brand-secondary-50 lg:rounded-lg w-full ">
      {filteredDelivery.map((method) => (
        <li class={`${method.price === 0 && "-order-1"} flex justify-between items-center border-base-200 not-first-child:border-t text-left gap-1 border-b border-brand-secondary-50 p-2`}>
          <div class="flex flex-col">
            <span class="text-button text-left small-regular">
              {method.deliveryChannel === "pickup-in-point" ?
                `Retirada ${method?.pickupStoreInfo?.friendlyName?.split("-")?.[1]?.trim()}`
                :
                `Entrega ${method.name}`
              }
            </span>
            <span class="text-button small-regular">
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newCep = (e.target as HTMLInputElement).value;
    newCep = newCep.replace(/\D/g, '');
    newCep = newCep.replace(/^(\d{5})(\d)/, '$1-$2');
    postalCode.value = newCep;
  };



  const handleSimulation = useCallback(async () => {
    const cepNumbers = postalCode.value.replace(/-/g, '')
    if (cepNumbers.length !== 8) {
      return;
    }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: cepNumbers,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
    } finally {
      loading.value = false;
    }
  }, []);

  if (currentCepIsExist) {
    postalCode.value = currentCepIsExist;
  }

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
          onChange={handleChange}
        />
        <Button type="submit" loading={loading.value}>
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
