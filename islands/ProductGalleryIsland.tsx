import ProductCardIsland, {
  Layout as CardLayout,
} from "$store/islands/ProductCardIsland.tsx";
import { Product } from "apps/commerce/types.ts";
import { useUI } from "deco-sites/casaevideo/sdk/useUI.ts";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
}

export interface Props {
  products: Product[] | null;
  offset: number;
  layout?: {
    card?: CardLayout;
    columns?: Columns;
  };
}

function ProductGalleryIsland({ products, layout, offset }: Props,) {
  const { layoutSelected } = useUI();

  return (
    <div class={`grid ${layoutSelected?.value === "grid" ? "grid-cols-2" : "grid-cols-1"} gap-2 items-center ${layoutSelected?.value === "grid" ? "sm:grid-cols-4 sm:gap-2" : "sm:grid-cols-1 sm:gap-4"} `}>
      {products?.map((product, index) => (
        <ProductCardIsland
          product={product}
          preload={index === 0}
          index={offset + index}
          layout={layout?.card}
        />
      ))}
    </div>
  );
}

export default ProductGalleryIsland;
