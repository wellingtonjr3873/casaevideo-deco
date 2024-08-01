import { SendEventOnView } from "deco-sites/casaevideo/islands/Analytics.tsx";

import { Layout as CardLayoutHorizontal } from "$store/components/product/ProductCardHorizontal.tsx";

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
import BannerCarousel, { Banner } from "deco-sites/casaevideo/components/ui/BannerCarousel.tsx";
import MiniBannerCarousel, { MiniBanner } from "deco-sites/casaevideo/components/ui/MiniBannerCarousel.tsx";

import NotFoundPage from "$store/sections/Product/NotFound.tsx"
import { Props as NotFoundProps } from "$store/sections/Product/NotFound.tsx"
import Faq, { Question } from "deco-sites/casaevideo/sections/Content/Faq.tsx";
import { useAccount } from "deco-sites/casaevideo/hooks/useAccount.tsx";


const PAGE_REGEX = /page([1-9]\d*)/;
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

export interface SingleBanner {
  /**
   * @description Largura da imagem Desktop
   */
  bannerWidthDesk: number;
  /**
   * @description Largura da imagem Desktop
   */
  bannerHeightDesk: number;
  srcDesktop: ImageWidget;
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
  notFoundPage: NotFoundProps;
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  bannerCarousel?: Banner[];
  /** @maxItems 1 */
  bannerGrid?: SingleBanner[];
  miniBannerCarousel?: MiniBanner[];
  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
  /** @title FAQ */
  questions?: Question[];
  /** *@hide */
  device: "mobile" | "desktop" | "tablet";
}

function Result({
  page,
  layout,
  bannerCarousel,
  bannerGrid,
  miniBannerCarousel,
  questions,
  startingPage = 0,
  device
}: Omit<Props, "page"> & { page: ProductListingPage }) {

  const { products, filters, breadcrumb, pageInfo, sortOptions, seo} = page;
  const getPagePath = new URL(seo?.canonical ?? "").pathname || "";

  const pageName = breadcrumb?.itemListElement?.[0]?.name || ""
  const perPage = pageInfo.recordPerPage || products.length;

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const beforeDots = pageInfo!.pagination!.before.slice(0, 2).map(item => {
    return new URLSearchParams(item.proxyUrl).get("page")
  })


  const afterDots = pageInfo!.pagination!.after.slice(0, 2).map(item => {
    return new URLSearchParams(item.proxyUrl).get("page")
  })

  const pagination = pageInfo.pagination!;
  
  const currentPageNumber = Number(new URLSearchParams(pagination!.current.proxyUrl).get("page")) || 0;
  const beforeDisabledDots = pagination.before.length && currentPageNumber >= 4 ? new Array(pagination.before[0].index - (pagination.first.index)).fill(0).map((_, index) => {
    const currentPageNumber = new URLSearchParams(pagination.before[0].proxyUrl).get("page");
    return pageInfo.previousPage!.replace(PAGE_REGEX, "page" + (Number(currentPageNumber) - (index + 1)))
  }) : []

  const lastIndex = pagination.after.pop()
  const afterDisabledDots = pagination.after.length && pagination.last.index > lastIndex!.index || 0 ? new Array(pagination.last.index - lastIndex!.index || 0).fill(0).map((_, index) => {
    const currentPageNumber = new URLSearchParams(lastIndex!.proxyUrl).get("page");
    return pageInfo.nextPage!.replace(PAGE_REGEX, "page" + (Number(currentPageNumber) + (index + 1)))
  }) : []
  
  const isCv = useAccount();
  
    return (
    <>
      <div class="container px-4 sm:py-10">
        <div class="flex flex-col md:flex-row items-left sm:p-0 mb-2  text-left mt-[24px]">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} isCategory={true} homeName={isCv ? "Casa&Video" : "Lebiscuit"} />
          <span class="block md:hidden h6-bold mt-[24px]">
            {pageName && pageName}
          </span>
        </div>
        <div class="flex flex-row gap-5">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[264px]">
              <Filters filters={filters} urlPath={getPagePath ?? ""}/>
            </aside>
          )}
          <div class="flex-grow w-full" id={id}>
            {bannerCarousel && <BannerCarousel bannerImages={bannerCarousel} arrows={false} />}


            {bannerGrid && bannerGrid.map((banner: SingleBanner) => (
              <a
                href={banner?.href}
                class={`overflow-hidden rounded-lg md:mb-8 block`}
              >
                <Picture>
                  <Source
                    media="(max-width: 767px)"
                    src={banner.srcMobile}
                    width={banner?.bannerWidthMob}
                    height={banner?.bannerHeightMob}
                    fetchPriority="low"
                  />
                  <Source
                    media="(min-width: 768px)"
                    src={banner?.srcDesktop ? banner?.srcDesktop : banner?.srcMobile}
                    width={banner?.bannerWidthDesk}
                    height={banner?.bannerHeightDesk}
                  />
                  <img
                    class="w-full"
                    sizes="(max-width: 640px) 100vw, 30vw"
                    src={banner?.srcMobile}
                    alt={banner?.alt}
                    decoding="async"
                    loading="lazy"
                  />
                </Picture>
              </a>
            ))
            }


            {miniBannerCarousel &&
              <div class="flex flex-col my-[16px]">
                <span class="small-regular md:h6-regular">Compre por marcas:</span>
                <MiniBannerCarousel miniBannerImages={miniBannerCarousel} arrows={true} />
              </div>
            }

            <SearchControls
              device={device}
              records={pageInfo?.records}
              pageName={pageName}
              sortOptions={sortOptions}
              filters={filters}
              productQnt={pageInfo?.records}
              displayFilter={layout?.variant === "drawer"}
              urlPath={getPagePath}
            />
            <ProductGalleryIsland
              products={products}
              offset={offset}
            />
            <div class="flex justify-center my-4">
              <div class="join">

               <div class='hidden'>
                    {beforeDisabledDots.map(item => <a href={item} /> )}
                </div>
                {pageInfo.previousPage && <a

                  aria-label="previous page link"
                  rel="prev"
                  href={pageInfo.previousPage ?? "#"}
                  class="btn btn-ghost join-item"
                >
                  <Icon id="SliderArrowLeft" size={24} strokeWidth={2} />
                </a>}
                {beforeDots.map(item => {
                  return <a class="btn btn-ghost join-item" href={pageInfo.previousPage!.replace(PAGE_REGEX, "page" + item)}>{item}</a>
                })}
                <span class="btn btn-ghost join-item underline">
                  {zeroIndexedOffsetPage + 1}
                </span>
                {afterDots.map((item) => {
                  return <a class="btn btn-ghost join-item" href={pageInfo.nextPage!.replace(PAGE_REGEX, "page" + item)}>{item}</a>
                })}
                <a
                  aria-label="next page link"
                  rel="next"
                  href={pageInfo.nextPage ?? "#"}
                  class="btn btn-ghost join-item"
                >
                  <Icon id="SliderArrowRight" size={24} strokeWidth={2} />
                </a>
                <div class='hidden'>
                    {afterDisabledDots.map(item => <a href={item} /> )}
                </div>
              </div>
            </div>
            {questions && <Faq questions={questions} />}
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


const NOT_FOUND_SEARCH_TEXT = "<h2>OOPS!</h2><h3><strong>Nenhum resultado encontrado :(</strong></h3><p>Que tal tentar outra combinação ?</p>"
function SearchResult({ page, ...props }: Props) {
  if (!page || page && !page.products.length) {

    const defaultProps = page && !page.products.length ? {
      ...props.notFoundPage,
      text: NOT_FOUND_SEARCH_TEXT,
      ctaText: "Editar filtros",
      ctaStyles: {
        backgroundColor: 'bg-brand-primary-1',
        color: 'text-[white]'
      }
    } : props.notFoundPage
    return <NotFoundPage {...defaultProps} />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
