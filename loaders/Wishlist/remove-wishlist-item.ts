import { AppContext } from "deco-sites/casaevideo/apps/site.ts";
import * as Sentry from "@sentry/react";
export interface Props {
  productId: string;
  userId: string;
  listId: string;
}

const loader = async (
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<boolean> => {
  const account: "casaevideonewio" | "lebiscuit" = ctx.account;

  const pathsDictionary = {
    "casaevideonewio":
      `https://api-cev-gateway.lebiscuit.io/wishlist/v2/_internal/wishlist/${props.listId}/item`,
    "lebiscuit":
      `https://api-gateway.lebiscuit.io/wishlist/v2/_internal/wishlist/${props.listId}/item`,
  };

  const apiKey = ctx.GatewayApiKey.get();

  const headers = new Headers();
  headers.append("X-Api-Key", apiKey!);
  headers.append("X-Ocelot-Auth", props.userId);
  headers.append("Content-Type", "application/json");

  const payload = JSON.stringify({
    itemId: props.productId,
  });

  try {
    const res = await fetch(pathsDictionary[account], {
      method: "DELETE",
      body: payload,
      headers,
    });
    return await res.json();
  } catch (err) {
    Sentry.captureException(err);
    console.error(err);
    return false;
  }
};

export default loader;
