import { AppContext } from "apps/vtex/mod.ts";
import { createHttpClient } from "apps/utils/http.ts";
import { fetchSafe } from "apps/vtex/utils/fetchVTEX.ts";
import { getSegmentFromBag } from "apps/vtex/utils/segment.ts";
import { VTEXCommerceStable } from "apps/vtex/utils/client.ts";
import { withSegmentCookie } from "apps/vtex/utils/segment.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { ExtensionOf } from "apps/website/loaders/extension.ts";
import { ProductVtexRest } from "deco-sites/casaevideo/types/vtexRestApi.ts";
import { useOffer } from "deco-sites/casaevideo/sdk/useOffer.ts";
import { getDefaultVtexSeller } from "deco-sites/casaevideo/utils/getDefaultVtexSeller.ts";
import { BuyTogetherProduct } from "deco-sites/casaevideo/types/buyTogether.ts";

export interface Props {
  productId: string;
}
export interface BuyTogetherLoader {
  buyTogether: BuyTogetherProduct[];
}

interface BuyTogetherApi extends VTEXCommerceStable {
  "GET /core/v1/produtos/api/showcase/who-bought-also-bought/:productId": {
    response: Promise<{ productId: string }[]>;
  };
}

interface VTEXCommerceStableFull extends VTEXCommerceStable {
  "GET /api/catalog_system/pub/products/search": {
    response: Promise<ProductVtexRest[]>;
    searchParams: {
      fq?: string;
    };
  };
}

/**
 * @title Product buy together
 * @description Product buy together
 */
export default function productDetailsPage(
  props: Props,
  _req: Request,
  ctx: AppContext,
): ExtensionOf<ProductDetailsPage | null> {
  const { productId } = props;

  return async (productDetailsPage: ProductDetailsPage | null) => {
    if (!productDetailsPage) {
      return null;
    }

    const productID = productDetailsPage.product.inProductGroupWithID || "";
    const segment = getSegmentFromBag(ctx);

    const buyTogetherApi = createHttpClient<BuyTogetherApi>({
      base: `https://api-cev-gateway.lebiscuit.io`,
      fetcher: fetchSafe,
      headers: withSegmentCookie(
        segment,
        new Headers({
          "content-type": "application/json",
          accept: "application/json",
          deviceId: "site",
          "X-Api-Key": "6A799190-9DBC-4E8A-836B-269FA2DBF5D6",
        }),
      ),
    });

    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    const account = ctx.account || ctx.commerce.account || "casaevideonewio";

    const vtexApi = createHttpClient<VTEXCommerceStableFull>({
      base: `https://${account}.vtexcommercestable.com.br`,
      fetcher: fetchSafe,
    });

    const getWhoBoughtAlsoBought = async (
      productId: string,
    ) => {
      const response = await buyTogetherApi
        ["GET /core/v1/produtos/api/showcase/who-bought-also-bought/:productId"](
          {
            productId,
          },
        );

      const data = await response.json();

      return data[0];
    };

    const getSkuFromProductId = async (productId: string) => {
      const response = await vtexApi
        ["GET /api/catalog_system/pub/products/search"]({
          fq: `productId:${productId}`,
        });

      const data = await response.json();

      return data[0];
    };

    const buyTogether = await getWhoBoughtAlsoBought(productID);
    const product = productDetailsPage.product;
    const buyTogetherFullProduct = await getSkuFromProductId(
      productId || buyTogether.productId,
    );
    const buyTogetherFullProductSeller = getDefaultVtexSeller(
      buyTogetherFullProduct?.items?.[0]?.sellers || [],
    );

    const {
      seller,
      listPrice,
      installments,
      price,
      availability,
    } = useOffer(product.offers);

    return {
      ...productDetailsPage,
      buyTogether: [
        {
          productID: product.productID,
          name: product.name,
          seller,
          quantity: 1,
          image: product?.image?.map((image) => ({
            url: image.url,
            alt: image.alternateName,
          }))[0],
          listPrice,
          installments,
          price,
          availability,
        },
        {
          productID: buyTogetherFullProduct?.items[0].itemId,
          name: buyTogetherFullProduct.productName,
          seller: buyTogetherFullProductSeller?.sellerId,
          quantity: 1,
          image: buyTogetherFullProduct?.items[0].images.map((image) => ({
            url: image.imageUrl,
            alt: image.imageText,
          }))[0],
          listPrice: buyTogetherFullProductSeller?.commertialOffer.ListPrice,
          installments: "",
          price: buyTogetherFullProductSeller?.commertialOffer.Price,
          availability:
            buyTogetherFullProductSeller?.commertialOffer?.IsAvailable || false,
        },
      ],
    };
  };
}
