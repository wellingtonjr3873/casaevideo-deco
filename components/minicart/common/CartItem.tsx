import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState, useEffect  } from "preact/hooks";

export interface Item {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  brand?: string;
  quantity: number;
  productID?: string;
  price: {
    sale: number;
    list: number;
  };
}

export interface Props {
  item: Item;
  index: number;
  voltagem?: Promise<string | undefined>;
  locale: string;
  currency: string;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem(
  {
    item,
    index,
    voltagem,
    locale,
    currency,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {
  const { image, name, brand, price: { sale, list }, quantity } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);
  const [voltagemResult, setVoltagemResult] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchVoltagem() {
      try {
        const result = await voltagem;
        setVoltagemResult(result);
      } catch (error) {
        console.error("Erro ao buscar voltagem:", error);
      }
    }

    fetchVoltagem();
  }, [voltagem]);

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <div
      class="flex flex-col gap-2 bg-neutral-50 border border-brand-secondary-100 rounded-lg p-4"
    >
      <div class={`flex gap-2`}>
        <Image
          {...image}
          style={{ aspectRatio: "48 / 48" }}
          width={48}
          height={48}
          class="h-full object-contain"
        />
        <div class="flex justify-between">
          <div class={`flex flex-col gap-2`}>
            <span class={`font-bold text-neutral-dark text-xs h-8 textTruncate`}>{name}</span>
            {voltagemResult !== undefined && (
                <span className="font-normal text-neutral-dark text-xs">Voltagem: {voltagemResult}</span>
            )}
            <span class={`font-bold text-brand-primary-1 text-xs`}>{brand}</span>
          </div>
          <Button
            disabled={loading || isGift}
            loading={loading}
            class="btn-ghost btn-square min-h-8 h-8 w-8"
            onClick={withLoading(async () => {
              const analyticsItem = itemToAnalyticsItem(index);

              await onUpdateQuantity(0, index);

              analyticsItem && sendEvent({
                name: "remove_from_cart",
                params: { items: [analyticsItem] },
              });
            })}
          >
            <Icon id="Trash" size={16} />
          </Button>
        </div>
      </div>
      <div class="flex gap-2 justify-between">
        <QuantitySelector
          disabled={loading || isGift}
          quantity={quantity}
          onChange={withLoading(async (quantity) => {
            const analyticsItem = itemToAnalyticsItem(index);
            const diff = quantity - item.quantity;

            await onUpdateQuantity(quantity, index);

            if (analyticsItem) {
              sendEvent({
                name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                params: {
                  items: [{ ...analyticsItem, quantity: Math.abs(diff) }],
                },
              });
            }
          })}
        />
        <div class="flex flex-col items-end gap-2 justify-end">
          {list > sale &&
            <span class="line-through text-neutral-dark font-normal text-xs">
              {formatPrice(list, currency, locale)}
            </span>
          }
          <span class="text-base text-neutral-dark font-bold leading-none">
            {isGift ? "Grátis" : formatPrice(sale, currency, locale)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
