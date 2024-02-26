import { Product } from "apps/commerce/types.ts";
import Icon, { AvailableIcons } from "deco-sites/casaevideo/components/ui/Icon.tsx";
import Button from "deco-sites/casaevideo/components/ui/Button.tsx";
import { OpenModalType, ProductImageZoomModal } from "deco-sites/casaevideo/components/product/ProductImageZoom.tsx";
import { useSignal } from "@preact/signals";
import ModalVideo from "deco-sites/casaevideo/components/product/ModalVideo/ModalVideo.tsx";
import Modal3D from "deco-sites/casaevideo/components/product/Modal3D/Modal3D.tsx";

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

  return (
    <div class="flex border border-neutral-100 rounded-lg p-0.5 w-full bg-neutral-50">
      {options.map((option) => (
        <Button 
          class={`flex shadow-none justify-center items-center py-2 w-full rounded-lg gap-1 small-bold text-neutral-900 shrink ${option.modal === 'ProductImage' ? 'bg-brand-secondary-50 border border-neutral-900' : 'border-0'}`}
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

      <ModalVideo 
        open={open}
        srcDesktop=""
      />

      <Modal3D
        open={open}
        imageSource=""
      />

    </div>
  )
}

export default ProductVisualization;
