import type { Section } from "deco/blocks/section.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { AppContext } from "deco-sites/casaevideo/apps/site.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  /** @title On Product Found */
  children: Section;

  /** @title On Product Not Found */
  fallback: Section;
}

function NotFoundChallenge({ page, children, fallback }: Props) {
  if (page === null) {
    return <fallback.Component {...fallback.props} />;
  }

  return <children.Component {...children.props} />;
}

export const loader = (props: Props, _: Request, ctx: AppContext) => {
  if(!props.page?.product.offers?.offers.some(offer => offer.availability === "https://schema.org/InStock")){
    ctx.response.status = 404;
  }
  return props
}

export default NotFoundChallenge;
