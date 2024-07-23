import { FreshContext } from "$fresh/server.ts";
const APPLE_DEEP_LINK = "apple-app-site-association";
export async function handler(req: Request, ctx: FreshContext<any>){
    const referUrl = req.url;
    if(referUrl && referUrl.includes(APPLE_DEEP_LINK)){
        
        const file  = await Deno.readFile('apple-app-site-association');
        const response = new Response(file)
        response.headers.set("Content-Type", "application/json");
        return new Response(file)
    }

return await ctx.next();
}