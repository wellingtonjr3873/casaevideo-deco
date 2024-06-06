import { Head } from "$fresh/runtime.ts";

function Live() {

    return <>
        <div id="nizza-player" />
            <script>
                {`;(function(){
                    const script = document.createElement('script')                            
                    script.type = 'module';
                    script.src = 'https://cdn.nizza.com/player/prod/nz-index.es.js?id=98f4fdf4-74ae-491f-ae58-9f1c2a6a1de3&account=casaevideonewio&inactiveSidebarProducts=true&inactiveProductsCarousel=false&inactivateChat=true&inactivateLike=true&inactivateViewers=true&isInfinite=true&time=10&pdp=false&kuikpay=false&quickView=true&originOfProducts=platform';
                    script.id = 'nizza-player-script'
                    document.getElementsByTagName('BODY')[0].appendChild(script) 
                    })(document)`}
            </script>
    </>
}

export default Live