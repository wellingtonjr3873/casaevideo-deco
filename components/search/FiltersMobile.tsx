import type { Filter, FilterToggle, FilterToggleValue, ProductListingPage } from "apps/commerce/types.ts";
import { useSignal } from "@preact/signals";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Avatar from "deco-sites/casaevideo/components/ui/Avatar.tsx";
import { formatPrice } from "deco-sites/casaevideo/sdk/format.ts";
import RangePrice from "deco-sites/casaevideo/components/search/RangePrice.tsx";

import { useEffect } from "preact/hooks";



type ChildrenFilter = {
    composeFilters: (filterName: string, value: string) => void;
    selectedFilters: string
}
const isToggle = (filter: Filter): filter is FilterToggle =>
    filter["@type"] === "FilterToggle";

function ValueItem({ url, label, value, composeFilters, selectedFilters }: FilterToggleValue & ChildrenFilter) {


    const filterName = url.split(".")!.pop()!.split("=")[0];
    const composedFilter = `&filter.${filterName}=${value}`
    const isSelected = selectedFilters.includes(composedFilter);

    return (
        <li className="py-2 w-full">
            <button href={url} rel="nofollow" className="flex items-center gap-2" onClick={() => {
                composeFilters(filterName, value)
            }}>
                <div checked={isSelected} className="checkbox checkbox-warning w-4 h-4 border-brand-secondary-200 rounded-[4px] border-[2.75px]" />
                <span className="small-regular w-full break-words text-left">{label}</span>
            </button>
        </li>
    );
}

function FilterListSelected({ values }: FilterToggle) {
    return (
        <>
            {
                values.map((item, index) => {
                    const { selected, url } = item;
                    
                    return selected && (
                        <li key={`selected-item-${index}`} className="">
                            
                            <a href={url} rel="nofollow" className="flex items-center justify-center gap-2 w-fit rounded-md border border-brand-secondary-400 bg-brand-terciary-1 p-2">
                                <div aria-checked={selected} className="border rounded-full font-normal text-sm p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                                </div>
                                <span className="text-sm text-neutral-900 w-full break-words max-w-40">{item.label}</span>
                            </a>
                        </li>
                    );
                })
            }

        </>
    )
}

function FilterValues({ key, values, selectedFilters, composeFilters }: FilterToggle & ChildrenFilter) {
    const flexDirection = ["tamanho"].includes(key) ? "flex-row" : "flex-col";

    return (
        <ul className={`flex flex-wrap gap-2 ${flexDirection} pt-3`}>
            {values.slice(0, 6).map((item, index) => {
                const { url, value } = item;

                const composedFilter = `&filter.${key}=${value}`
                const isSelected = selectedFilters.includes(composedFilter);

                if (key === "tamanho") {
                    return (
                        <li key={index}>    
                            <button rel="nofollow" onClick={() => {
                                composeFilters(key, value)
                            }}>
                                <Avatar content={value} variant={isSelected ? "active" : "default"} />
                            </button>
                        </li>
                    );
                }

                return <ValueItem key={index} {...item} composeFilters={composeFilters} selectedFilters={selectedFilters} />;
            })}

            {values.length > 6 && (
                <li className="w-full">
                    <div className="more-content">
                        <ul className="flex flex-wrap gap-2 flex-row">
                            {values.slice(6).map((item, index) => {
                                const { url, value, label } = item;
                                
                                const filterName = url.split(".")!.pop()!.split("=")[0];
                                const composedFilter = `&filter.${filterName}=${value}`
                                const isSelected = selectedFilters.includes(label);
                                
                                if (key === "tamanho") {
                                    return (
                                        <li key={index}>
                                            <button href={url} rel="nofollow" onClick={() => {
                                                composeFilters(filterName, value)
                                            }}>
                                                <Avatar content={value} variant={isSelected ? "active" : "default"} />
                                            </button>
                                        </li>
                                    );
                                }
                                return <ValueItem key={index} {...item} composeFilters={composeFilters}
                                    selectedFilters={selectedFilters} />;
                            })}
                        </ul>
                    </div>

                    <label class="label-check cursor-pointer w-full text-right body-bold block">
                        <input class="hidden-checkbox" type="checkbox" style={{ display: "none" }} />
                    </label>
                </li>

            )}
        </ul>
    );
}
// function FilterValuesPrice({ key, values, composeFilters, selectedFilters }: FilterToggle &  ChildrenFilter) {
//     const flexDirection = ["tamanho"].includes(key) ? "flex-row" : "flex-col";

//     return (
//         <ul className={`flex flex-wrap gap-2 ${flexDirection} pt-3`}>
//             {values.slice(0, 6).map((item, index) => {
//                 if (key === "price") {
//                     const range = parseRange(item.value);
//                     return range && (
//                         <>
//                             {index === values.length - 1 && (<RangePrice />)}
//                         </>
//                     );
//                 }

//                 return <ValueItem key={index} {...item} composeFilters={composeFilters} selectedFilters={selectedFilters}/>;
//             })}

//             {values.length > 6 && (
//                 <li className="w-full">
//                     <details className={`collapse`}>
//                         <summary className="w-full block pt-2 px-4 collapse-title text-right text-base font-bold">Ver mais</summary>
//                         <ul className="flex flex-wrap gap-2 flex-row">
//                             {values.slice(6).map((item, index) => {
//                                 const { selected, value } = item;

//                                 if (key === "tamanho") {
//                                     return (
//                                         <li key={index}>
//                                             <button rel="nofollow" onClick={() => {
//    
//                                             }}>
//                                                 <Avatar content={value} variant={selected ? "active" : "default"} />
//                                             </button>
//                                         </li>
//                                     );
//                                 }
//                                 return <ValueItem key={index} {...item} composeFilters={composeFilters} selectedFilters={selectedFilters} />;
//                             })}

//                         </ul>
//                     </details>
//                 </li>
//             )}
//         </ul>
//     );
// }

const FilstersMobile = (props: Pick<ProductListingPage, "filters" | "sortOptions">) => {
    const { filters, sortOptions } = props;

    const selectedFilters = useSignal("");

    const composeFilters = (filterName: string, filterValue: string) => {

        const composedFilter = `&filter.${filterName}=${filterValue}`

        if (selectedFilters.value.includes(composedFilter)) {
            selectedFilters.value = selectedFilters.value.replace(composedFilter, "");
            return
        }
        selectedFilters.value = `${selectedFilters.value}${composedFilter}`;
    }

    const goToFilters = () => {
        window.location.search = "?" + selectedFilters
    }


    useEffect(() => {
        selectedFilters.value = window.location.search.substring(1);
    }, []);


    //verifica se há pelo menos 1 filtro ativo
    const hasFilterActive = filters.filter(isToggle).some(filter => filter.values.some(value => value.selected));

    return (
        <>
            {
                hasFilterActive && (
                    <div className="mb-2 bg-transparent border border-neultral-200">
                        <header className="px-4 py-2 text-left">
                            <p className="font-bold text-base">Fltros Selecionados</p>
                        </header>
                        <ul className="flex flex-wrap justify-start items-center gap-2 px-4 py-2">
                            {
                                filters.filter(isToggle).map((filter) => {
                                    return <FilterListSelected  {...filter} />
                                })
                            }
                        </ul>
                        <a href="?" className="block w-full text-right py-2 px-4 text-base font-bold">Limpar Filtros</a>
                    </div>
                )
            }
            <ul className="flex flex-col gap-4 mb-4">
                {
                    filters.filter(isToggle).map((filter, index) => (
                        filter.key != "price" ?
                            <li key={index} className="dropdown bg-neutral-50 py-3 px-5">
                                <details className="group">
                                    <summary className="flex justify-between items-center cursor-pointer body-bold text-[#4B4B4B]">
                                        {
                                            filter.label !== 'Preço' ? filter.label : 'Faixa de Preço'
                                        }
                                        <span className="w-4 h-4 text-center flex justify-center items-center">
                                            <span className="group-open:-rotate-90 transition-all duration-200 ease-in">
                                                <Icon id="ArrowAccordion" size={20} strokeWidth={2} style="text-neutral-900" />
                                            </span>
                                        </span>
                                    </summary>
                                    <FilterValues {...filter} composeFilters={composeFilters}
                                        selectedFilters={selectedFilters.value} />
                                </details>
                            </li>
                            :
                            <li key={index} className="dropdown bg-neutral-50 py-3 px-5">
                                <div className="group">
                                    <div className="m-1 flex justify-between items-center cursor-pointer font-bold text-base">
                                        {
                                            filter.label !== 'Preço' ? filter.label : 'Faixa de Preço'
                                        }
                                    </div>
                                    <RangePrice />
                                </div>
                            </li>
                    ))
                }
            </ul>
            <button class="sticky bottom-0 body-regular text-neutral-0 py-3 rounded-md bg-brand-secondary-900 px-4 left-[16px] right-[16px] w-full" onClick={goToFilters} >Filtrar</button>
        </>
    );


}

export default FilstersMobile