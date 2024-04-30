import { JSX } from 'preact';
import { useSignal } from "@preact/signals";
import { useRef, useEffect } from 'preact/hooks';
import { IS_BROWSER } from "$fresh/runtime.ts";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";

export default function RangePrice() {
    const signalMinValue = useSignal('');
    const signalMaxValue = useSignal('');
    const signalUrlFilter = useSignal('');

    const inputMinRef = useRef<HTMLInputElement>(null);
    const inputMaxRef = useRef<HTMLInputElement>(null);

    const handleMinInputChange = (event: JSX.TargetedEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        signalMinValue.value = newValue;
    };

    const handleMaxInputChange = (event: JSX.TargetedEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        signalMaxValue.value = newValue;
    };

    const regex = /(\d*\.?\d+)%3A(\d*\.?\d+)/;
    const currentQueryString = IS_BROWSER ? globalThis.location : undefined;

    useEffect(() => {
        /*
            Reconstroi os filtros, se encontra parametro de filtro .price na url ele atualiza 
            apenas os valores do primeiro filter price encontrado na url, se não encontra 
            ele monta um novo, também verifica se os inputs estão com valores validos.
        */
        const minMaxIsVoid = (signalMinValue.value && signalMaxValue.value) === '' ? true : false;
        signalUrlFilter.value = currentQueryString && !minMaxIsVoid ? (
            currentQueryString.search?.includes('filter.price=') ? 
                currentQueryString.search.replace(regex, `${signalMinValue.value}%3A${signalMaxValue.value}`) 
                : `?filter.category-1=${currentQueryString.pathname.replace('/', '')}&filter.price=${signalMinValue.value}%3A${signalMaxValue.value}`
        ) : '#linkElement';

        
    }, [signalMinValue.value, signalMaxValue.value]);

    useEffect(() => {
        const filterAlreadyExist = currentQueryString.search?.includes('filter.price=');
        if(filterAlreadyExist){
            const values = currentQueryString.search.substring(1);
            const queryParams = {};
            values.split('&').forEach(pair => {
                const [key, value] = pair.split('=');
                queryParams[key] = decodeURIComponent(value);
            });
            const [min, max] = queryParams['filter.price'].split(':');
            signalMinValue.value = min
            signalMaxValue.value = max
            inputMinRef.current!.value = min
            inputMaxRef.current!.value = max
        }
    }, [])

    return (
        <li className="flex justify-center items-center gap-2">
            <input 
                ref={inputMinRef} 
                type="number" 
                id="inputMin" 
                onInput={handleMinInputChange} 
                value={signalMinValue.value} 
                class="input-range-min input border-brand-secondary-200 input-primary w-full max-w-20 min-w-20 h-10 px-4 py-2 focus:border-brand-terciary-1 focus:outline-brand-terciary-1 text-xs" 
                placeholder="Mínimo" 
                required
            />
            -
            <input 
                ref={inputMaxRef} 
                type="number" 
                id="inputMax" 
                onInput={handleMaxInputChange} 
                value={signalMaxValue.value} 
                class="input-range-max input border-brand-secondary-200 input-primary w-full max-w-20 h-10 px-4 py-2 focus:border-brand-terciary-1 focus:outline-brand-terciary-1 text-xs"  
                placeholder="Máximo"
                required
            />
            <a 
                id="linkElement" 
                class="flex justify-center items-center bg-brand-terciary-1 h-10 min-w-10 rounded-md hover:scale-95" 
                href={signalUrlFilter.value}
            >
                <Icon 
                    id="ArrowBack" 
                    class="rotate-180" 
                    size={24} 
                    strokeWidth={2} 
                    fill="text-neutral-900" 
                />
            </a>
        </li>
    )
}
