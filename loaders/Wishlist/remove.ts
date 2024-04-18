import { Secret } from "apps/website/loaders/secret.ts";

export interface Props {
  /** @hide */
  items: {
    productId: string;
  }[];
  /** @hide */
  userId: string;
  /** @hide */
  tenant: "CV" | "LB";
  ApiKey: Secret;
}

const loader = async (props: Props, _req, ctx: AppContext): Promise<any> => {
  const apiKey = props?.ApiKey?.get();

  const pathsDictionary = {
    "CV":
      "https://api-cev-gateway.lebiscuit.io/wishlist/v2/_internal/wishlists",
    "LB": "https://api-gateway.lebiscuit.io/wishlist/v2/_internal/wishlists",
  };

  const payload = JSON.stringify({
    title: "Meus favoritos",
    items: props.items.map((item) => ({ itemId: item.productId })),
  });

  const res = await fetch(pathsDictionary[props.tenant], {
    method: "POST",
    body: payload,
    headers: {
      "X-Ocelot-Auth": "",
      "X-Api-Key": props.userId,
    },
  });
  return res;
};

export default loader;
