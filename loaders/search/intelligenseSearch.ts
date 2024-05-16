import { toProduct } from "apps/vtex/utils/transform.ts";
import { withDefaultFacets } from "apps/vtex/utils/intelligentSearch.ts";
import { withDefaultParams } from "apps/vtex/utils/intelligentSearch.ts";
import { withSegmentCookie } from "apps/vtex/utils/segment.ts";
import { toPath } from "apps/vtex/utils/intelligentSearch.ts";
import { getSegmentFromBag } from "apps/vtex/utils/segment.ts";
import { AppContext } from "apps/vtex/mod.ts";
import { Product } from "apps/commerce/types.ts";
import { createHttpClient } from "apps/utils/http.ts";
import { fetchSafe } from "apps/vtex/utils/fetchVTEX.ts";
import { VTEXCommerceStable } from "apps/vtex/utils/client.ts";
import { STALE } from "apps/utils/fetch.ts";

export interface Props {
  query?: string;
  /**
   * @description limit the number of searches
   * @default 4
   */
  count?: number;

  /**
   * @description Include similar products
   * @deprecated Use product extensions instead
   */
  similars?: boolean;
}
export interface Searches {
  term: string;
  count: number;
  attributes: {
    key: string;
    value: string;
    labelKey: string;
    labelValue: string;
  }[];
}

export interface IntelligenseSearch {
  products: Product[];
  searches: Searches[];
}

/**
 * @title Casaevideo Integration - Intelligent Search
 * @description Product Suggestion loader
 */
const loaders = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<IntelligenseSearch | null> => {
  const { url } = req;
  const { count, query } = props;
  const locale = "pt-BR"; // config!.defaultLocale; // TODO
  const segment = getSegmentFromBag(ctx);

  interface CasaevideoCommerceStable extends VTEXCommerceStable {
    "GET /api/io/_v/api/intelligent-search/autocomplete_suggestions": {
      response: {
        searches: Searches[];
      };
    };
  }
  const vcsDeprecated = createHttpClient<CasaevideoCommerceStable>({
    base: `https://casaevideonewio.vtexcommercestable.com.br`,
    fetcher: fetchSafe,
  });

  const intelligenseSuggestions = () =>
    vcsDeprecated
      ["GET /api/io/_v/api/intelligent-search/autocomplete_suggestions"]({
        locale,
        query: query ?? "",
      }, {
        // Not adding suggestions to cache since queries are very spread out
        // deco: { cache: "stale-while-revalidate" },
        headers: withSegmentCookie(segment),
      }).then((res) => res.json());

  // const topSearches = () =>
  //   vcsDeprecated["GET /api/io/_v/api/intelligent-search/top_searches"]({
  //     locale,
  //   }, { ...STALE, headers: withSegmentCookie(segment) })
  //     .then((res) => res.json());

  const productSearch = () => {
    const facets = withDefaultFacets([], ctx);
    const params = withDefaultParams({ query, count: count ?? 4, locale });

    return vcsDeprecated
      ["GET /api/io/_v/api/intelligent-search/product_search/*facets"]({
        //Well vai refatorar a tipagem.
        // deno-lint-ignore ban-ts-comment
        //@ts-ignore
        showSponsored: true, 
        placement: "top-search",
        ...params,
        facets: toPath(facets),
      }, { ...STALE, headers: withSegmentCookie(segment) })
      .then((res) => res.json());
  };

  const [{ searches }, { products }] = await Promise.all([
    intelligenseSuggestions(),
    productSearch(),
  ]);

  if (!searches || !productSearch) return null;

  const options = {
    baseUrl: url,
    priceCurrency: segment?.payload?.currencyCode ?? "BRL",
  };

  return {
    searches,
    products: await Promise.all(
      products
        .map((p) => toProduct(p, p.items[0], 0, options)).slice(0, count)
    )
  };
};

export default loaders;
