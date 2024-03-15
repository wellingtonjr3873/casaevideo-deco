import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { useEffect, useState } from "preact/hooks";
import {Props} from '$store/islands/BannerStopWatch.tsx'


const BannerStopWatch = ({endDateAt, desktop, mobile, position, backgroundColor, textColor}: Props) => {
    const endAt = new Date(endDateAt!)
    const [finalDate, setFinalDate] = useState<Date | null>(null)
    
    const updatePointer = () => {
        setFinalDate(new Date(Math.abs(new Date().valueOf() - endAt.valueOf())));
    }

    useEffect( () => {
        const interval = setInterval(updatePointer, 1000);
        return () => clearInterval(interval)
    }, [])

    const positionDictionary = {
        "base-left": "items-start lg:items-center justify-between px-8  lg:p-0 lg:justify-center lg:flex-col flex-row-reverse top-[10%] inset-x-0 gap-7 lg:gap-3 lg:left-[127px] lg:top-1/2 lg:-translate-y-1/2 lg:right-[unset]",
        "top-left": "items-center justify-between px-8  lg:p-0 lg:justify-center lg:flex-col-reverse flex-row-reverse bottom-[10%] inset-x-0 gap-7 lg:gap-3 lg:left-[127px] lg:top-1/2 lg:-translate-y-1/2 lg:right-[unset]",
        "top-right": "items-center justify-between px-8  lg:p-0 lg:justify-center lg:flex-col-reverse flex-row bottom-[10%] inset-x-0 gap-7 lg:gap-3 lg:right-[127px] lg:top-1/2 lg:-translate-y-1/2 lg:left-[unset]",
        "base-center": "items-center justify-center flex-col gap-7 lg:gap-3 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2",
        "base-right": "items-start lg:items-center justify-between px-8  lg:p-0 lg:justify-center lg:flex-col flex-row top-[10%] inset-x-0 lg:right-[127px] lg:top-1/2 lg:-translate-y-1/2 lg:left-[unset]"    
    }

    const hours = String(finalDate?.getUTCHours()).length === 2 ? finalDate?.getUTCHours() : '0' + String(finalDate?.getUTCHours());
    const minutes = String(finalDate?.getMinutes()).length === 2 ? finalDate?.getMinutes() : '0' + String(finalDate?.getMinutes());
    const seconds = finalDate?.getSeconds(); 

    return <div class={`absolute flex ${positionDictionary[position || "base-right"]}`}>
        <div class="flex">

            <Picture preload={false}>
                <Source
                media="(max-width: 767px)"
                fetchPriority="high"
                src={mobile}
                width={320}
                height={280}
                />
                <Source
                media="(min-width: 768px)"
                fetchPriority="high"
                src={desktop}
                width={1280}
                height={280}
                />
                <img
                class="object-cover w-full h-full"
                loading="eager"
                src={desktop}
                alt={""}
                />
        </Picture>
        </div>
        <div>
        <p class={`xx-small-regular lg:small-regular text-[${textColor || "white"}]`}>Aproveite, é por tempo limitado!</p>
          <div class={`rounded-lg flex items-center justify-center ${ backgroundColor || "bg-brand-terciary-1"} text-center w-[128px] lg:w-[198px] h-8 lg:h-[44px] ${!finalDate ? "animate-pulse" : ""}`}>
          {finalDate && <span class="h6-bold lg:h3-bold">{hours}:{minutes}:{seconds}</span>}</div>
        </div>
    </div>

};

export default BannerStopWatch

