import { useEffect, useState } from "preact/hooks";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";

export interface Props {
    /** @title Inicio da Oferta */
    /** @description Data inicial da oferta */
    /** @format datetime */
    startOffer?: string;
    /** @title Fim da Oferta */
    /** @description Data final da oferta quando a vitrine será substituida pela vitrine normal*/
    /** @format datetime */
    endOffer?: string;
}

function CountDownTimer({
    endOffer
}: Props) {

    const [remainingTime, setRemainingTime] = useState<number | null>(null);

    useEffect(() => {
        const finalDate = new Date(endOffer!);
        const interval = setInterval(() => {
            const remaining = finalDate.getTime() - Date.now();
            setRemainingTime(remaining > 0 ? remaining : 0);
        }, 1000);
        return () => clearInterval(interval);
    }, [endOffer]);

    const hours = remainingTime ? Math.floor(remainingTime / (1000 * 60 * 60)) : 0;
    const minutes = remainingTime ? Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)) : 0;
    const seconds = remainingTime ? Math.floor((remainingTime % (1000 * 60)) / 1000) : 0;

    return (
        <div class="flex gap-2 items-center">
            <span class="flex gap-2 items-center h6-bold text-complementary-2 px-4 md:px-0">
                <Icon width={24} height={24} id={"Lightning"} />
                OFERTA RELÂMPAGO
            </span>
            <div class="grid grid-flow-col gap-1 items-center text-center auto-cols-max h-8 min-h-8">
                <div class="flex flex-col p-2 px-2 py-1 bg-complementary-2 h-8 min-h-8 text-neutral-content justify-center rounded-md">
                    <span class="countdown body-bold text-neutral-50">
                        <span style={`--value:${String(hours).padStart(2, '0')};`}></span>
                    </span>
                </div>
                :
                <div class="flex flex-col p-2 px-2 py-1 bg-complementary-2 text-neutral-content h-8 min-h-8 justify-center rounded-md">
                    <span class="countdown body-bold text-neutral-50">
                        <span style={`--value:${String(minutes).padStart(2, '0')};`}></span>
                    </span>
                </div>
                :
                <div class="flex flex-col p-2 px-2 py-1 bg-complementary-2 text-neutral-content h-8 min-h-8 justify-center rounded-md">
                    <span class="countdown body-bold text-neutral-50">
                        <span style={`--value:${String(seconds).padStart(2, '0')};`}></span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CountDownTimer;