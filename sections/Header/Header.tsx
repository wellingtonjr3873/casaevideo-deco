import Header, { Props } from "$store/components/header/Header.tsx";
import type { SectionProps } from "deco/types.ts";
import MatchDevice from "apps/website/matchers/device.ts";
import { UAParser } from "https://esm.sh/ua-parser-js@1.0.35";
import { AppContext } from "deco-sites/casaevideo/apps/site.ts";

export async function loader(props: Props, _req: Request, ctx: AppContext){
    const result = await ctx.invoke(
    //@ts-ignore: ignore type attr
    "vtex/loaders/categories/tree.ts",
    { categoryLevels: 3 }
        );

        const cfDeviceHint: string | null = _req.headers.get("cf-device-type") ||
        "";
        const ua: string | null = _req.headers.get("user-agent") || "";
        const parser = new UAParser(ua).getDevice().type;

        const device = cfDeviceHint ||  parser || "desktop"
        const mobileDevices = ["mobile", "android", "ios"];
        const isMobile = mobileDevices.includes(device);
       
    return {...props, navItems: result, isMobile, device: ctx.device}
}

MatchDevice

export default function (props: SectionProps<typeof loader>){
    return <Header {...props}/>
}
