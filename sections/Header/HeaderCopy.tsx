import Header, { Props } from "$store/components/header/HeaderCopy.tsx";
import type { SectionProps } from "deco/types.ts";
import { UAParser } from "https://esm.sh/ua-parser-js@1.0.35";
import { AppContext } from "deco-sites/casaevideo/apps/site.ts";


const REGEX_QUERY_VALUE = /[?&]q=([^&]*)/;

function getQueryValue(url: string){
    const match = url.match(REGEX_QUERY_VALUE);
    const response = match ? decodeURIComponent(match[1]) : undefined;
    return response
}
export async function loader(props: Props, req: Request, ctx: AppContext){
    const result = await ctx.invoke(
    //@ts-ignore: ignore type attr
    "vtex/loaders/categories/tree.ts",
    { categoryLevels: 3 }
        );

        const cfDeviceHint: string | null = req.headers.get("cf-device-type") ||
        "";
        const ua: string | null = req.headers.get("user-agent") || "";
        const parser = new UAParser(ua).getDevice().type;

        const device = cfDeviceHint ||  parser || "desktop"
        const mobileDevices = ["mobile", "android", "ios"];
        const isMobile = mobileDevices.includes(device);

        const currentSearchParam = getQueryValue(req.url)
       
    return {...props, navItems: result, isMobile, device: ctx.device, currentSearchParam}
}

export default function (props: SectionProps<typeof loader>){
    return <Header {...props}/>
}
