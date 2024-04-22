
import { useSignal } from "@preact/signals";
import { useRef ,useState, useEffect } from 'preact/hooks';


// TODO: TENTAR REMOVER O USEsTATE E USAR APENAS SIGNAL
// MONTAR A QUERYSTRING DE PRICE QUANDO NÃO EXISTIR, E QUANTO EXISTIR ATUALIZAR OS VALORES
export default function RangePrice() {
    const [minValue, setMinValue] = useState('0');
    const [maxValue, setMaxValue] = useState('99');
    const signalMinValue = useSignal(minValue);
    const signalMaxValue = useSignal(maxValue);

    const inputMinRef = useRef<HTMLInputElement>(null);
    const inputMaxRef = useRef<HTMLInputElement>(null);

    const handleMinInputChange = (event: JSX.TargetedEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        setMinValue(newValue);
    };

    const handleMaxInputChange = (event: JSX.TargetedEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        setMaxValue(newValue);
    };

    useEffect(() => {
        // Atualiza os sinais após cada renderização
        signalMinValue.value = minValue;
        signalMaxValue.value = maxValue;
    }, [minValue, maxValue, signalMinValue, signalMaxValue]);

    return (
        <div>
            <input ref={inputMinRef} type="number" id="inputMin" onInput={handleMinInputChange} value={minValue} class="input-range-min input input-bordered input-primary w-full max-w-xs" />
            <input ref={inputMaxRef} type="number" id="inputMax" onInput={handleMaxInputChange} value={maxValue} class="input-range-max input input-bordered input-primary w-full max-w-xs" />
            <a id="linkElement" href={`${window.location.search}&filter.price=${signalMinValue.value}%3A${signalMaxValue.value}`}>Link</a>
        </div>
    )
}
