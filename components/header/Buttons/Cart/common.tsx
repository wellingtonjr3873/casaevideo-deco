import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
}

function CartButton({ loading, currency, total, items }: Props) {
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
        class="btn-circle btn-sm btn-ghost pl-[4px] py-[3px] pr-[0] h-auto w-auto min-h-fit"
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        loading={loading}
        onClick={onClick}
      >
        <Icon
          id="Cart"
          size={16}
          strokeWidth={2}
          className="fill-brand-secondary-900"
        />
      </Button>
    </div>
  );
}

export default CartButton;
