import { AppContext } from "deco-sites/casaevideo/apps/site.ts";
import { Product } from "apps/vtex/utils/types.ts";
export interface Props {
  userId: string;
  listId: string;
}
type Res = {
  data: {
    id: string;
    title: string;
    products: Product[];
  };
};

const loader = async (
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<Res | boolean> => {
  const account: "casaevideonewio" | "lebiscuit" = ctx.account;
  const apiKey = ctx.GatewayApiKey.get();

  const pathsDictionary = {
    "casaevideonewio":
      `http://api-cev-gateway.lebiscuit.io/wishlist/v2/_internal/wishlist/${props.listId}`,
    "lebiscuit":
      `http://api-gateway.lebiscuit.io/wishlist/v2/_internal/wishlist/${props.listId}`,
  };

  const url = pathsDictionary[account];

  const headers = new Headers();
  headers.append("X-Api-Key", apiKey!);
  headers.append("X-Ocelot-Auth", props.userId);

  try {
    const res = await fetch(url, { headers, method: "GET" });
    return res.json();
  } catch (err) {
    console.error("err", err);
    return false;
  }
};

export default loader;
