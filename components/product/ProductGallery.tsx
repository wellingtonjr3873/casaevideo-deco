//VERIFICAR DEPOIS SE ESTÃO USANDO ESSE COMPONENTE EM ALGUM LUGAR @@@@@@@@@@@@@@@@@@@@@@@@@@@@

// import ProductCardIsland, {
//   Layout as CardLayout,
// } from "$store/islands/ProductCardIsland.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product } from "apps/commerce/types.ts";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
}

export interface Props {
  products: Product[] | null;
  offset: number;
  layout?: {
    // card?: CardLayout;
    columns?: Columns;
  };
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
};

function ProductGallery({ products, layout, offset }: Props) {
  const platform = usePlatform();
  const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
  const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 4];

  return (
    <div class={`grid ${mobile} gap-2 items-center ${desktop} sm:gap-10`}>
      {products?.map((product, index) => (
        // <ProductCardIsland
        //   product={product}
        //   preload={index === 0}
        //   index={offset + index}
        //   layout={layout?.card}
        // />
        <></>
      ))}
    </div>
  );
}

export default ProductGallery;
