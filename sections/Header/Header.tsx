import Header, { Props } from "$store/components/header/Header.tsx";
import type { SectionProps } from "deco/mod.ts";
import MatchDevice from "apps/website/matchers/device.ts";
import { UAParser } from "https://esm.sh/ua-parser-js@1.0.35";

export async function loader(props: Props, req: Request, ctx: any){
    const result = await ctx.invoke(
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
       
    return {...props, navItems: result, isMobile}
}

MatchDevice

export default function (props: SectionProps<typeof loader>){
    return <Header {...props}/>
}
