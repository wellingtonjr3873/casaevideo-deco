import { AppContext } from "deco-sites/casaevideo/apps/site.ts";

import { createHttpClient } from "apps/utils/http.ts";
export interface Props {
  /** *@hide */
  items: {
    productId: string;
  }[];
  /** *@hide */
  userId: string;
}

interface ApiService {
  "GET /wishlist/v2/_internal/wishlists": {
    response: {
      data: any;
    };
  };
}

const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<any> => {
  const account: "casaevideonewio" | "lebiscuit" = ctx.account ||
    ctx.commerce.account || "casaevideonewio";
  const apiKey = ctx.GatewayApiKey.get();

  const pathsDictionary = {
    "casaevideonewio":
      "http://api-cev-gateway.lebiscuit.io/wishlist/v2/_internal/wishlists",
    "lebiscuit":
      "http://api-gateway.lebiscuit.io/wishlist/v2/_internal/wishlists",
  };

  const payload = JSON.stringify({
    title: "Meus favoritos",
    items: props.items.map((item) => ({ itemId: item.productId })),
  });

  const url = pathsDictionary[account];

  const headers = new Headers();
  headers.append("X-Api-Key", apiKey!);
  headers.append("X-Ocelot-Auth", "wellingtonrufino@lelabs.com.br");

  try {
    const res = await fetch(url, { headers, method: "GET" });
    return res.json();
  } catch (err) {
    console.error("err", err);
    return false;
  }
};

export default loader;
