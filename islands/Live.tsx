import { useEffect } from "preact/hooks";

export interface Props  {
    liveId: string;
    isActive: boolean
}
function Live({isActive, liveId}: Props) {
    useEffect(() => {
        if(!isActive) return;
        const script = document.createElement('script')
        script.type = 'module';
        script.src = `https://cdn.nizza.com/player/prod/nz-index.es.js?id=${liveId}&account=casaevideonewio&inactiveSidebarProducts=false&inactiveProductsCarousel=false&inactivateChat=true&inactivateLike=true&inactivateViewers=true&isInfinite=true&time=10&pdp=false&kuikpay=false&quickView=false&originOfProducts=platform`;
        script.id = 'nizza-player-script'
        document.getElementsByTagName('BODY')[0].appendChild(script)
    }, [])

    if(!isActive) return;

    return <>
        <div class="mt-6 md:mt-12 my-[48px] md:px-6 xl-b:px-0 mx-auto">
            <div id="nizza-player" />
        </div>
    </>
}

export default Live