import { Product } from "apps/commerce/types.ts";
import { useUI } from "deco-sites/casaevideo/sdk/useUI.ts";
import ProductCard, {
  Layout as CardLayout,
} from "deco-sites/casaevideo/components/product/ProductCard.tsx";
import ProductCardHorizontal, {
  Layout as CardLayoutIsland
} from "deco-sites/casaevideo/components/product/ProductCardHorizontal.tsx";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
}

export interface Props {
  products: Product[] | null;
  offset: number;
  layout?: {
    card?: CardLayout;
    cardHorizontal?: CardLayoutIsland;
    columns?: Columns;
  };
}

function ProductGalleryIsland({ products, layout, offset }: Props,) {
  const { layoutSelected } = useUI();

  return (
    <div class={`grid ${layoutSelected?.value === "grid" ? "grid-cols-2" : "grid-cols-1"} gap-2 items-center ${layoutSelected?.value === "grid" ? "sm:grid-cols-4 sm:gap-2" : "sm:grid-cols-1 sm:gap-4"} `}>
      {products?.map((product, index) => (
        layoutSelected?.value === "list" ?
        <ProductCardHorizontal
          product={product}
          preload={index === 0}
          index={offset + index}
          layout={layout?.cardHorizontal}
        />
        :
        <ProductCard
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
