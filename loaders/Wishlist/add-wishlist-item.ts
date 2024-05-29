export interface Props {
  productId: string;
  userId: string;
  skuId: string;
  listId?: string;
}

import { AppContext } from "deco-sites/casaevideo/apps/site.ts";
import * as Sentry from "@sentry/react";

const loader = async (
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<boolean> => {
  const account: "casaevideonewio" | "lebiscuit" = ctx.account;

  const apiKey = ctx.GatewayApiKey.get();

  const pathsDictionary = {
    "casaevideonewio":
      `https://api-cev-gateway.lebiscuit.io/wishlist/v2/_internal/wishlist/${props.listId}/item`,
    "lebiscuit":
      `https://api-gateway.lebiscuit.io/wishlist/v2/_internal/wishlist/${props.listId}/item`,
  };

  const payload = JSON.stringify({
    itemId: props.productId,
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
    Sentry.captureException(err);
    console.error(err);
    return false;
  }
};

export default loader;
