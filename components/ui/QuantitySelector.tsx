import Button from "../ui/Button.tsx";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;
const QUANTITY_MIN_VALUE = 1;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const decrement = () => onChange?.(Math.max(QUANTITY_MIN_VALUE, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="flex items-center w-min gap-2">
      <Button
        class={
          `btn-circle btn-ghost btn-xs border border-brand-secondary-200 text-brand-primary-1 hover:border-brand-primary-1 ${quantity === QUANTITY_MIN_VALUE ? 'bg-brand-secondary-50 text-brand-secondary-200 hover:bg-brand-secondary-50 hover:text-brand-secondary-200 hover:border-brand-secondary-200 ' : ''}`
        }
        onClick={decrement}
        disabled={disabled}
        loading={loading}
      >
        {/* <Icon id="DecreaseButton" width={24} height={24} /> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
		      <line x1="16.5" y1="12.5" x2="8.25" y2="12.5" stroke="currentColor"/>
	      </svg>
      </Button>
      <input
        class="input text-center [appearance:textfield] w-9 h-8 border rounded-lg text-neutral-900 p-0"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        maxLength={3}
        size={3}
      />
      <Button
        class={
          `btn-circle btn-ghost btn-xs border border-brand-secondary-200 text-brand-primary-1 hover:border-brand-primary-1 ${quantity === QUANTITY_MAX_VALUE ? 'bg-brand-secondary-50 text-brand-secondary-200 hover:bg-brand-secondary-50 hover:text-brand-secondary-200 hover:border-brand-secondary-200 ' : ''}`
        }
        onClick={increment}
        disabled={disabled}
        loading={loading}
      >
        {/* <Icon id="IncreaseButton" width={24} height={24} /> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <line x1="11.9285" y1="5.71484" x2="11.9285" y2="18.2863" stroke="currentColor"/>
          <line x1="18.2856" y1="11.9297" x2="5.71422" y2="11.9297" stroke="currentColor"/>
        </svg>
      </Button>
    </div>
  );
}

export default QuantitySelector;
