import Component from "$store/components/search/RangePrice.tsx";
import { FilterToggle } from "apps/commerce/types.ts";
// import type { Props } from "$store/components/search/Controls.tsx";

function Island(props: FilterToggle) {
  return <Component  {...props}/>;
}

export default Island;
