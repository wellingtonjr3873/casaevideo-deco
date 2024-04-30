export interface Props {
  productId: string;
  userId: string;
  skuId: string;
}

import { DEFAULT_WISHLIST_LIST_NAME } from "deco-sites/casaevideo/constants.tsx";

import { AppContext } from "deco-sites/casaevideo/apps/site.ts";

const loader = async (
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<boolean> => {
  const account: "casaevideonewio" | "lebiscuit" = ctx.account;

  const apiKey = ctx.GatewayApiKey.get();

  const pathsDictionary = {
    "casaevideonewio":
      "https://api-cev-gateway.lebiscuit.io/wishlist/v2/_internal/wishlist",
    "lebiscuit":
      "https://api-gateway.lebiscuit.io/wishlist/v2/_internal/wishlist",
  };

  const payload = JSON.stringify({
    items: [{ itemId: props.productId }],
    title: DEFAULT_WISHLIST_LIST_NAME,
  });

  const controller = new AbortController();
  const signal = controller.signal;

  const headers = new Headers();
  headers.append("X-Api-Key", apiKey!);
  headers.append("X-Ocelot-Auth", props.userId);
  headers.append("Content-Type", "application/json");

  try {
    const res = await fetch(pathsDictionary[account], {
      signal,
      body: payload,
      method: "POST",
      headers,
    });

    const tratedResponse = await res.json();
    return !!tratedResponse.data.products.length;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default loader;
