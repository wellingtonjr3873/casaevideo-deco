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
import BannerCarousel, { Banner } from "deco-sites/casaevideo/components/ui/BannerCarousel.tsx";
import MiniBannerCarousel, { MiniBanner } from "deco-sites/casaevideo/components/ui/MiniBannerCarousel.tsx";

import NotFoundPage from "$store/sections/Product/NotFound.tsx"
import { Props as NotFoundProps } from "$store/sections/Product/NotFound.tsx"
import Faq, { Question } from "deco-sites/casaevideo/sections/Content/Faq.tsx";

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
  cardLayout?: CardLayout;
  bannerCarousel?: Banner[];
  /** @maxItems 1 */
  bannerGrid?: SingleBanner[];
  miniBannerCarousel?: MiniBanner[];
  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
  /** @title FAQ */
  questions?: Question[];
}

function Result({
  page,
  layout,
  cardLayout,
  bannerCarousel,
  bannerGrid,
  miniBannerCarousel,
  questions = [
    {
      question: "Como faço para acompanhar o meu pedido?",
      answer:
        "Acompanhar o seu pedido é fácil! Assim que o seu pedido for enviado, enviaremos um e-mail de confirmação com um número de rastreamento. Basta clicar no número de rastreamento ou visitar o nosso site e inserir o número de rastreamento na seção designada para obter atualizações em tempo real sobre a localização e o status de entrega do seu pedido.",
    },
    {
      question: "Qual é a política de devolução?",
      answer:
        "Oferecemos uma política de devolução sem complicações. Se você não estiver completamente satisfeito(a) com a sua compra, pode devolver o item em até 30 dias após a entrega para obter um reembolso total ou troca. Certifique-se de que o item esteja sem uso, na embalagem original e acompanhado do recibo. Entre em contato com a nossa equipe de atendimento ao cliente e eles o(a) orientarão pelo processo de devolução.",
    },
  ],
  startingPage = 0,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const pageName = breadcrumb?.itemListElement?.[0]?.name || ""
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
        <div class="flex flex-row gap-5">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[264px]">
              <Filters filters={filters} />
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
                  Página {zeroIndexedOffsetPage + 1}
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

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFoundPage {...props.notFoundPage} />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
