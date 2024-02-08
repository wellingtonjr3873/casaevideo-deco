import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";

interface Props {
  color?: 'white' | 'black'
}

export function FreeShippingIcon({
  color = 'white',
}: Props) {
  const className = {
    'black': 'bg-neutral-700 text-neutral-50',
    'white': 'bg-brand-terciary-1 text-neutral-900'
  };

  return (
    <div
      class={`h-[24px]  gap-1 small-regular rounded-md flex  justify-between px-2 items-center ${className[color]}`}
    >
      <Icon id="Frete" width={24} height={24} />
      Frete grátis
    </div>
  );
}
