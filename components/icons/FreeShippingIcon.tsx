import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";

interface Props {
  color?: 'white' | 'black';
  small?: boolean;
}

export function FreeShippingIcon({
  color = 'white',
  small = false
}: Props) {
  const className = {
    'black': 'bg-neutral-700 text-neutral-50',
    'white': 'bg-brand-terciary-1 text-neutral-900'
  };

  const iconSize = small ? 16 : 24;

  return (
    <div
      class={
        `gap-1 rounded-md flex justify-between items-center ${className[color]} ${small ? 'h-5 md:h-6 x-small-regular md:small-regular p-1': 'h-6 small-regular px-2'}`
      }
    >
      <Icon id="Frete" width={iconSize} height={iconSize} />
      Frete grátis
    </div>
  );
}
