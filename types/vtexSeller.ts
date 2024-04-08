import { CommertialOffer } from "deco-sites/casaevideo/types/vtexRestApi.ts";

export interface Seller {
  sellerId: string;
  sellerName: string;
  addToCartLink: string;
  sellerDefault: boolean;
  commertialOffer: CommertialOffer;
}
