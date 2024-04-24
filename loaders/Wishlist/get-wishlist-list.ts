import { AppContext } from "deco-sites/casaevideo/apps/site.ts";
export interface Props {
  userId: string;
}

type Res = {
  data: { title: string; id: string; count: number }[];
};

const loader = async (
  _props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<Res> => {
  const account: "casaevideonewio" | "lebiscuit" = ctx.account ||
    ctx.commerce.account || "casaevideonewio";
  const apiKey = ctx.GatewayApiKey.get();

  const pathsDictionary = {
    "casaevideonewio":
      "http://api-cev-gateway.lebiscuit.io/wishlist/v2/_internal/wishlists",
    "lebiscuit":
      "http://api-gateway.lebiscuit.io/wishlist/v2/_internal/wishlists",
  };

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
