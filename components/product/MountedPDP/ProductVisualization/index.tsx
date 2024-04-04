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
    image, isVariantOf,name
  } = product;
  const total = product;

  

  const product3D = isVariantOf?.additionalProperty.find(property => property.name === "produto3D")?.value
  console.log(product3D, 'product3D')

  
   let options: Option[]
  if(product3D !== undefined) {
   options = [
    { icon: "Image", name: "Fotos", modal: 'ProductImage' },
    { icon: "Video", name: "Vídeo", modal: 'ProductVideo' },
    { icon: "3D", name: "3D", modal: 'Product3D' },
  ];
} else {
  options = [
    { icon: "Image", name: "Fotos", modal: 'ProductImage' },
    { icon: "Video", name: "Vídeo", modal: 'ProductVideo' },
    
  ];
}

  return (
    <div class="flex border border-neutral-100 rounded-lg p-0.5 w-full bg-neutral-50">
      {options.map((option) => (
        <Button 
          class={`flex shadow-none justify-center items-center py-2 w-full rounded-lg gap-1 small-bold text-neutral-900 shrink ${
            open.value === option.modal ? 'bg-brand-secondary-50 border border-neutral-900' : 'border-0' 
          }`}
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
        produto3D={product3D}
        productName={name}
      />

    </div>
  )
}

export default ProductVisualization;
