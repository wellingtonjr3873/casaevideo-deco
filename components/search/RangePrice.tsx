import { JSX } from 'preact';
import { useSignal } from "@preact/signals";
import { useEffect, useRef } from 'preact/hooks';
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import { FilterToggle } from "apps/commerce/types.ts";


export default function RangePrice(props: FilterToggle) {
    
    const REGEX_FILTER_MATCH = /filter\.price=\d+(\.\d+)?:\d+(\.\d+)?/g
    
    const signalMinValue = useSignal('');
    const signalMaxValue = useSignal('');
    
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


    const _validMinAndMaxValue = () => {
        if(!signalMinValue.value || !signalMaxValue.value){
           return
        }
    }
    
    const handleClickInput = () => {

        const validFields = () => {}

        const urlAlreadyHaveRangeFilter = window.location.search.includes("filter.price=")
        const filterValue = `filter.price=${signalMinValue.value}:${signalMaxValue.value}`;
        
        if(urlAlreadyHaveRangeFilter){
             window.location.href = window.location.href.replace(REGEX_FILTER_MATCH, filterValue)
            return;
        }

        const urlFilter = decodeURIComponent(props?.values[0]?.url).replace(REGEX_FILTER_MATCH, filterValue)
        window.location.href = urlFilter
    }


    useEffect(() => {
        const filterAlreadyExist = globalThis.location!.search.includes('filter.price=');
        if(filterAlreadyExist){
            const values = globalThis.location!.search.substring(1);
            const queryParams : {[key:string]: string}= {};
            values?.split('&').forEach(pair => {
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
        <li className="flex justify-start items-center gap-2">
            <input 
                ref={inputMinRef} 
                type="number" 
                id="inputMin" 
                onInput={handleMinInputChange} 
                value={signalMinValue.value} 
                class="input-range-min input border-brand-secondary-200 input-primary w-full  min-w-20 h-10 px-4 py-2 focus:border-brand-terciary-1 focus:outline-brand-terciary-1 text-xs" 
                placeholder="Mínimo" 
                required
            />
            
            <input 
                ref={inputMaxRef} 
                type="number" 
                id="inputMax" 
                onInput={handleMaxInputChange} 
                value={signalMaxValue.value} 
                class="input-range-max input border-brand-secondary-200 input-primary w-full h-10 px-4 py-2 focus:border-brand-terciary-1 focus:outline-brand-terciary-1 text-xs"  
                placeholder="Máximo"
                required
            />
            <button 
                id="linkElement" 
                class="flex justify-center items-center bg-brand-terciary-base h-10 min-w-10 rounded-md hover:scale-95" 
                onClick={handleClickInput}
            >
                <Icon 
                    id="ArrowBack" 
                    class="rotate-180" 
                    size={24} 
                    strokeWidth={2} 
                    fill="text-neutral-900" 
                />
            </button>
        </li>
    )
}
