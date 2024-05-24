import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { Device } from "deco/utils/userAgent.ts";
import { useEffect, useState } from "preact/hooks";



type  PositionValue = {
       /** 
     * @title Coordenada do banner no eixo Y
     * @description Pode ser um valor em pixel "35px" ou em % "10%"
     * @default base-left 
     **/   
    yCoordenate?: string;

        /** 
     * @title Coordenada do banner no eixo X
     * @description Pode ser um valor em pixel "35px" ou em % "10%"
     * @default base-left 
     **/   
    xCoordenate?: string;


        /** 
     * @title Coordenada do banner no eixo Y no Desktop
     * @description Pode ser um valor em pixel "35px" ou em % "10%"
     * @default base-left 
     **/   
    yCoordenateDesktop?: string;

        /** 
     * @title Coordenada do banner no eixo X no desktop
     * @description Pode ser um valor em pixel "35px" ou em % "10%"
     * @default base-left 
     **/   
    xCoordenateDesktop?: string;
}


interface BaseLeft extends PositionValue{
    /** 
     * @hide
     * @default base-left 
     **/   
    key: string;
};
interface TopLeft extends PositionValue{
       /** 
     * @hide
     * @default top-left
     **/   
    key: string;
};
interface TopRight extends PositionValue{
       /** 
     * @hide
     * @default top-right
     **/   
    key: string;
};
interface BaseCenter extends PositionValue{
       /** 
     * @hide
     * @default base-center
     **/   
    key: string;
}
interface BaseRight extends PositionValue{
       /** 
     * @hide
     * @default base-right
     **/   
    key: string;
}



export interface Props  {
    /**
    * @hide
     */
    endDateAt: string
    /** @title Imagem do logo Desktop */
    desktop?: ImageWidget;
    /** @title Imagem do logo Mobile */
    mobile?: ImageWidget;
    position?: BaseLeft | TopLeft | TopRight | BaseCenter | BaseRight,
    /** 
     * @format color 
     * @title Cor do texto da label
     * */
    labelColor?: string;

        /** 
     * @format color 
     * @title Cor do texto
     * */
    textColor: string;
    /** 
     * @format color 
     * @title Cor de fundo do cronometro
     * */
    backgroundColor: string;
    /**
     * @hide
     */
    isMobile: boolean
}



const BannerStopWatch = ({endDateAt, desktop, mobile, position, backgroundColor, textColor, labelColor, isMobile}: Props) => {
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
        "base-left": `items-start lg:items-center justify-between px-8  lg:p-0 lg:justify-center lg:flex-col flex-row-reverse bottom-[35px] inset-x-0 gap-7 lg:gap-3 lg:left-[127px] lg:top-[unset]  lg:right-[unset]`,
        "top-left": "items-center justify-between px-8  lg:p-0 lg:justify-center lg:flex-col-reverse flex-row-reverse top-[10%] inset-x-0 gap-7 lg:gap-3 lg:left-[127px] lg:[35px] lg:right-[unset]",
        "top-right": "items-center justify-between px-8  lg:p-0 lg:justify-center lg:flex-col-reverse flex-row top-[35px] inset-x-0 gap-7 lg:gap-3 lg:right-[127px] lg:left-[unset]",
        "base-center": "items-center justify-center flex-col gap-7 lg:gap-3 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2",
        "base-right": "items-start lg:items-center justify-between px-8  lg:p-0 lg:justify-center lg:flex-col flex-row bottom-[35px] inset-x-0 lg:right-[127px] lg:left-[unset]"    
    }

    const hours = String(finalDate?.getUTCHours()).length === 2 ? finalDate?.getUTCHours() : '0' + String(finalDate?.getUTCHours());
    const minutes = String(finalDate?.getMinutes()).length === 2 ? finalDate?.getMinutes() : '0' + String(finalDate?.getMinutes());
    const seconds = String(finalDate?.getSeconds()).padStart(2, '0') 

    return <div style={{
        left: isMobile ? position?.xCoordenate : position?.xCoordenateDesktop,
        bottom: isMobile ? position?.yCoordenate : position?.yCoordenateDesktop
    }} class={`absolute flex ${positionDictionary[position?.key  as keyof typeof positionDictionary || "base-right"]}`}>
        {mobile && desktop && <div class="flex">
            <Picture preload={false}>
                <Source
                media="(max-width: 767px)"
                fetchPriority="high"
                src={mobile ? mobile : ""}
                width={320}
                height={280}
                />
                <Source
                media="(min-width: 768px)"
                fetchPriority="high"
                src={desktop ? desktop : ""}
                width={1280}
                height={280}
                />
                <img
                class="object-cover w-full h-full"
                loading="eager"
                src={desktop ? desktop : ""}
                alt={""}
                />
        </Picture>
        </div>}
        <div>
        <p style={{color: labelColor}} class={`xx-small-regular lg:small-regular`}>Aproveite, é por tempo limitado!</p>
          <div style={{backgroundColor}}class={`rounded-lg flex items-center justify-center "bg-brand-terciary-1 text-center w-[128px] lg:w-[198px] h-8 lg:h-[44px] ${!finalDate ? "animate-pulse" : ""}`}>
          {finalDate && <span style={{ color: textColor}} class="h6-bold lg:h3-bold">{hours}:{minutes}:{seconds}</span>}</div>
        </div>
    </div>

};

export default BannerStopWatch

