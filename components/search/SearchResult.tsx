import { SendEventOnView } from "deco-sites/casaevideo/islands/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGalleryIsland, { Columns } from "$store/islands/ProductGalleryIsland.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { Picture, Source } from "deco-sites/casaevideo/components/ui/Picture.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import BannerCarousel from "deco-sites/casaevideo/components/ui/BannerCarousel.tsx";
export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
}

export interface Banner {
  /**
   * @description Largura da imagem Desktop
   */
  bannerWidthDesk: number;
  /**
   * @description Largura da imagem Desktop
   */
  bannerHeightDesk: number;
  srcDesktop?: ImageWidget;
  /**
   * @description Largura da imagem Mobile
   */
  bannerWidthMob: number;
  /**
   * @description Largura da imagem Mobile
   */
  bannerHeightMob: number;
  srcMobile: ImageWidget;
  /**
   * @description Texto alt da imagem
   */
  alt: string;
  /**
   * @description Link de redirecionamento
   */
  href: string;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  cardLayout?: CardLayout;
  bannerGrid?: Banner;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  layout,
  cardLayout,
  bannerGrid = {
    srcDesktop: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3429/b4b07511-ba19-453d-94e7-988d402a99d2",
    bannerWidthDesk: 992,
    bannerHeightDesk: 121,
    srcMobile: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3429/ddd587d8-141d-4e7a-9192-c6276dd9674b",
    bannerWidthMob: 992,
    bannerHeightMob: 280,
    alt: "Os melhores Smarts",
    href: "/"
  },
  startingPage = 0,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const pageName = breadcrumb?.itemListElement?.[0].name
  const perPage = pageInfo.recordPerPage || products.length;

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  return (
    <>
      <div class="container px-4 sm:py-10">
        <div class="flex flex-col md:flex-row items-left sm:p-0 mb-2  text-left mt-[24px]">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
          <span class="block md:hidden h6-bold mt-[24px]">
            {pageName && pageName}
          </span>
        </div>
        <div class="flex flex-row">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[250px]">
              <Filters filters={filters} />
            </aside>
          )}
          <div class="flex-grow w-full" id={id}>

            <BannerCarousel arrows={false} spacesCss={"max-[768px]:px-0 md:px-6 xl-b:px-0 my-[20px] mx-[auto]"} />

            {bannerGrid &&
              <a
                href={bannerGrid?.href}
                class={`overflow-hidden rounded-lg md:mb-8 block`}
              >
                <Picture>
                  <Source
                    media="(max-width: 767px)"
                    src={bannerGrid?.srcMobile}
                    width={bannerGrid?.bannerWidthMob}
                    height={bannerGrid?.bannerHeightMob}
                    fetchPriority="low"
                  />
                  <Source
                    media="(min-width: 768px)"
                    src={bannerGrid?.srcDesktop ? bannerGrid?.srcDesktop : bannerGrid?.srcMobile}
                    width={bannerGrid?.bannerWidthDesk}
                    height={bannerGrid?.bannerHeightDesk}
                  />
                  <img
                    class="w-full"
                    sizes="(max-width: 640px) 100vw, 30vw"
                    src={bannerGrid?.srcMobile}
                    alt={bannerGrid?.alt}
                    decoding="async"
                    loading="lazy"
                  />
                </Picture>
              </a>
            }

            <div class="flex md:hidden gap-[10px] text-left mt-[32px]">
              <span class="body-bold">{pageName && pageName} </span> 
              ({pageInfo?.records && pageInfo?.records <= 1 ? `${pageInfo?.records} Produto` : `${pageInfo?.records} Produtos`})
            </div>

            <SearchControls
              sortOptions={sortOptions}
              filters={filters}
              productQnt={pageInfo?.records}
              displayFilter={layout?.variant === "drawer"}
            />
            <ProductGalleryIsland
              products={products}
              offset={offset}
              layout={{ card: cardLayout, columns: layout?.columns }}
            />
          </div>
        </div>

        <div class="flex justify-center my-4">
          <div class="join">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class="btn btn-ghost join-item"
            >
              <Icon id="ChevronLeft" size={24} strokeWidth={2} />
            </a>
            <span class="btn btn-ghost join-item">
              Page {zeroIndexedOffsetPage + 1}
            </span>
            <a
              aria-label="next page link"
              rel="next"
              href={pageInfo.nextPage ?? "#"}
              class="btn btn-ghost join-item"
            >
              <Icon id="ChevronRight" size={24} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
