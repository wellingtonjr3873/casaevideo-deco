import { createHttpClient } from "apps/utils/http.ts";
import { fetchSafe } from "apps/vtex/utils/fetchVTEX.ts";
import { getSegmentFromBag } from "apps/vtex/utils/segment.ts";
import { VTEXCommerceStable } from "apps/vtex/utils/client.ts";
import { withSegmentCookie } from "apps/vtex/utils/segment.ts";
import { STALE } from "apps/utils/fetch.ts";
import {
  ReviewLikedResponse,
  ReviewListResponse,
  ReviewResponse,
} from "../../types/reviews.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { ExtensionOf } from "apps/website/loaders/extension.ts";
import { logger } from "deco/observability/otel/config.ts";

import { AppContext as LegacyAppContext } from "apps/vtex/mod.ts";

import { AppContext } from "deco-sites/casaevideo/apps/site.ts";

export interface Props {
  productId: string;
}

export interface ProductReviewsLoader {
  reviews: ReviewResponse;
  getProductReview: (
    productId: string,
    ordernationCode: string,
  ) => Promise<ReviewResponse>;
  getProductsListReviews: (productIds: string) => Promise<ReviewListResponse>;
  reviewLikeAction: (
    reviewId: string,
    like: boolean,
  ) => Promise<ReviewLikedResponse>;
}

interface ProductReviewsApi extends VTEXCommerceStable {
  "GET /core/v1/produtos/api/review/product/:productId/all": {
    response: ReviewResponse;
    searchParams: {
      orderBy?: string;
    };
  };
  "GET /core/v1/produtos/api/review/product": {
    response: ReviewListResponse;
    searchParams: {
      products?: string;
    };
  };
  "POST /core/v1/produtos/api/review/setvote": {
    response: ReviewLikedResponse;
    body: {
      reviewId: string;
      like: boolean;
    };
  };
}

/**
 * @title Product Reviews
 * @description Product Reviews
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

    const apiKey = ctx.GatewayApiKey.get();
    const productID = productDetailsPage.product.inProductGroupWithID || "";

    const segment = getSegmentFromBag(ctx as unknown as LegacyAppContext);

    const reviewsApi = createHttpClient<ProductReviewsApi>({
      base: `https://api-cev-gateway.lebiscuit.io`,
      fetcher: fetchSafe,
      headers: withSegmentCookie(
        segment,
        new Headers({
          "content-type": "application/json",
          accept: "application/json",
          deviceId: "site",
          "X-Api-Key": apiKey!,
        }),
      ),
    });

    const getProductReview = async (
      productId: string,
      ordernationCode = "1",
    ) => {
      const response = await reviewsApi
        ["GET /core/v1/produtos/api/review/product/:productId/all"]({
          productId,
          orderBy: ordernationCode,
        });

      const data = await response.json();

      return data;
    };

    const getProductsListReviews = async (productIds: string) => {
      const response = await reviewsApi
        ["GET /core/v1/produtos/api/review/product"]({
          products: productIds,
        }, {
          ...STALE,
        });

      const data = await response.json();

      return data;
    };

    const reviewLikeAction = async (reviewId: string, like: boolean) => {
      const response = await reviewsApi
        ["POST /core/v1/produtos/api/review/setvote"]({}, {
          body: {
            like,
            reviewId,
          },
        });

      const data = await response.json();

      return data;
    };

    const reviews = await getProductReview(productId || productID);

    return {
      ...productDetailsPage,
      reviews,
      getProductReview,
      reviewLikeAction,
      getProductsListReviews,
    };
  };
}
