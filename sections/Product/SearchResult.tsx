import SearchResult, { Props }  from "$store/components/search/SearchResult.tsx";
import type { SectionProps } from "deco/types.ts";
import { AppContext } from "deco-sites/casaevideo/apps/site.ts";

export function loader(props: Props, _req: Request, ctx: AppContext){
    return {...props, device: ctx.device}
}

export default function (props: SectionProps<typeof loader>){
    return <SearchResult {...props}/>
}
