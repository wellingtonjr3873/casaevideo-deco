import Component, {Props} from "$store/components/ui/BannerCarousel.tsx";
import { AppContext } from "apps/commerce/mod.ts";


 export function loader(props: Omit<Props, "isMobile">, _req: Request, ctx: AppContext){
    const mobileDevices = ["mobile", "tablet",];
    return {...props, isMobile: mobileDevices.includes(ctx.device)}
}

const Section = (props: Props) => {
    return <Component {...props}/>
}

export default Section