import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import { FunctionComponent, h as types } from "preact";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
  children?: types.JSX.Element | types.JSX.Element[] | string | string[];
}

function CartButton({ loading, currency, total, items, children }: Props) {
  const { displayCart } = useUI();
  const totalItems = items.length;
  const onClick = () => {
    sendEvent({
      name: "view_cart",
      params: { currency, value: total, items },
    });
    displayCart.value = true;
  };
  return (
    <div class="indicator">
      <span
        class={`indicator-item badge badge-secondary badge-sm ${
          totalItems === 0 ? "hidden" : ""
        }`}
      >
        {totalItems > 9 ? "9+" : totalItems}
      </span>

      <Button
        class="btn-circle btn-sm btn-ghost h-auto w-auto min-h-fit"
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        loading={loading}
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
}

export default CartButton;
