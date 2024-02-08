import { Product } from "apps/commerce/types.ts";
import Icon, { AvailableIcons } from "deco-sites/casaevideo/components/ui/Icon.tsx";
import Button from "deco-sites/casaevideo/components/ui/Button.tsx";
import { OpenModalType, ProductImageZoomModal } from "deco-sites/casaevideo/components/product/ProductImageZoom.tsx";
import { useSignal } from "@preact/signals";

export interface Props {
  product: Product;
}

type Option = {
  icon: AvailableIcons;
  name: string;
  modal: OpenModalType;
}

function ProductVisualization({ product }: Props) {
  const open = useSignal<OpenModalType>('None');

  const {
    image
  } = product;

  const options: Option[] = [
    { icon: "Image", name: "Fotos", modal: 'ProductImage' },
    { icon: "Video", name: "Vídeo", modal: 'ProductVideo' },
    { icon: "3D", name: "3D", modal: 'Product3D' },
  ];

  console.log('open', open);

  return (
    <div class="flex border border-neutral-100 rounded-lg p-0.5 w-full">
      {options.map((option) => (
        <Button 
          class={`flex border-0 shadow-none justify-center items-center py-2 w-full rounded-lg gap-1 small-bold text-neutral-900 shrink ${open.value === option.modal ? 'bg-brand-secondary-50 border border-neutral-900' : ''}`}
          onClick={() => open.value = option.modal}
        >
          <Icon id={option.icon} width={24} height={24} /> {option.name}
        </Button>
      ))}

      <ProductImageZoomModal
        images={image || []}
        height={700}
        width={700}
        open={open}
      />
    </div>
  )
}

export default ProductVisualization;
