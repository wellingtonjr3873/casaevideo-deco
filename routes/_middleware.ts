import { FreshContext } from "$fresh/server.ts";
const APPLE_DEEP_LINK = "apple-app-site-association";
export async function handler(req: Request, ctx: FreshContext<any>){
    const referUrl = req.headers.get('referer');
    const file  = await Deno.readFile('apple-app-site-association');
    if(referUrl && referUrl.includes(APPLE_DEEP_LINK)){
        const resp = await ctx.next();
        resp.headers.set("Content-Type", "application/json");
        return new Response(file)
    }

    const resp = await ctx.next();

return resp
}