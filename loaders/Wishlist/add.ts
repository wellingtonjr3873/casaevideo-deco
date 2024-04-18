export interface Props {
  /** @hide */
  items: {
    productId: string;
  }[];
  /** @hide */
  userId?: string;
}

import { AppContext } from "deco-sites/casaevideo/apps/site.ts";

const loader = async (props: Props, req, ctx: AppContext): Promise<any> => {
  const account: "casaevideonewio" | "lebiscuit" = ctx.account ||
    ctx.commerce.account || "casaevideonewio";
  const apiKey = ctx.GatewayApiKey.get();

  console.log(apiKey, "seee apikey", account);

  const pathsDictionary = {
    "casaevideonewio":
      "https://api-cev-gateway.lebiscuit.io/wishlist/v2/_internal/wishlists",
    "lebiscuit":
      "https://api-gateway.lebiscuit.io/wishlist/v2/_internal/wishlists",
  };

  const payload = JSON.stringify({
    title: "Meus favoritos",
    items: props.items.map((item) => ({ itemId: item.productId })),
  });

  try {
    console.log("seee");
    const res = await fetch(pathsDictionary[account], {
      method: "POST",
      body: payload,
      headers: {
        "X-Ocelot-Auth": "wellingtonrufino@lelabs.com.br",
        "X-Api-Key": apiKey!,
      },
    });

    return res.json();
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default loader;
