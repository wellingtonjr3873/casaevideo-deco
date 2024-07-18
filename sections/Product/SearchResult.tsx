import SearchResult, { Props }  from "$store/components/search/SearchResult.tsx";
import type { SectionProps } from "deco/types.ts";
import { UAParser } from "https://esm.sh/ua-parser-js@1.0.35";
import { AppContext } from "deco-sites/casaevideo/apps/site.ts";

export function loader(props: Props, req: Request, ctx: AppContext){
    
        const cfDeviceHint: string | null = req.headers.get("cf-device-type") || "";
        const ua: string | null = req.headers.get("user-agent") || "";
        const parser = new UAParser(ua).getDevice().type;

        const device = cfDeviceHint ||  parser || "desktop"
        const mobileDevices = ["mobile", "android", "ios"];
        const isMobile = mobileDevices.includes(device);

    return {...props, isMobile, device: ctx.device}
}

export default function (props: SectionProps<typeof loader>){
    return <SearchResult {...props}/>
}
