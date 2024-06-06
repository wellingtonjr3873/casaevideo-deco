import { useEffect } from "preact/hooks";

function Live() {
    useEffect(() => {
        const script = document.createElement('script')
        script.type = 'module';
        script.src = 'https://cdn.nizza.com/player/prod/nz-index.es.js?id=98f4fdf4-74ae-491f-ae58-9f1c2a6a1de3&account=casaevideonewio&inactiveSidebarProducts=true&inactiveProductsCarousel=false&inactivateChat=true&inactivateLike=true&inactivateViewers=true&isInfinite=true&time=10&pdp=false&kuikpay=false&quickView=true&originOfProducts=platform';
        script.id = 'nizza-player-script'
        document.getElementsByTagName('BODY')[0].appendChild(script)
    }, [])

    return <>
        <div class="mt-6 md:mt-12 my-[48px] md:px-6 xl-b:px-0 mx-auto">
            <div id="nizza-player" />
        </div>
    </>
}

export default Live