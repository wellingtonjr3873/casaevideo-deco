import { AppContext } from "deco-sites/casaevideo/apps/site.ts";

export interface Device {
    isMobile?: boolean
}

const loader = (_props: Device, _req, ctx: AppContext): Device => {
    console.log(ctx.device, 'seee')
    const isMobile = ctx.device !== "desktop" 
    return {
        isMobile: true
    }
}

export default loader