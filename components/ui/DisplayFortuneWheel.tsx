import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { useRoullete } from "deco-sites/casaevideo/sdk/display-roullete.ts";

export interface Props {
    gif: {
        desktop: ImageWidget;
        mobile: ImageWidget;
    }
}

const DisplayFortuneWheel = (props: Props) => {
    const {displayRoullete} = useRoullete();

    return  <div class="max-w-[124px] mx-auto">
        <Picture onClick={() => displayRoullete.value = true}>
            <Source
            media="(max-width: 767px)"
            src={props.gif.mobile}
            width={320}
            height={280}
            />
            <Source
            media="(min-width: 768px)"
            src={props.gif.desktop}
            width={1280}
            height={280}
            />
            <img
            class="object-cover w-full h-full"
            src={props.gif.mobile}
            />
        </Picture>
    </div>
}

export default DisplayFortuneWheel