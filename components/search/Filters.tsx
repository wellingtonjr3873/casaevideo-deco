import Avatar from "$store/components/ui/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";

import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import RangePrice from "deco-sites/casaevideo/islands/RangePrice.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem({ url, selected, label, quantity }: FilterToggleValue) {
  return (
    <li className="py-2 w-full">
      <a href={url} rel="nofollow" className="flex items-center gap-2">
        <div aria-checked={selected} className="checkbox checkbox-warning w-4 h-4 rounded-sm border-brand-secondary-200" />
        <span className="text-sm text-neutral-900 w-full break-words max-w-40">{label}</span>
      </a>
    </li>
  );
}

function FilterListSelected({ values }: FilterToggle) {
  return (
    <>
      {
        values.map((item, index) => {
          const { selected } = item;
          return selected && (
            <li key={`selected-item-${index}`} className="">
              <a href={item.url} rel="nofollow" className="flex items-center justify-center gap-2 w-fit rounded-md border border-brand-secondary-400 bg-brand-terciary-1 p-2">
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

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = ["tamanho", "cor"].includes(key) ? "flex-row" : "flex-col";
  
  return (
    <ul className={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.slice(0, 6).map((item, index) => {
        const { url, selected, value } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <li key={index}>
              <a href={url} rel="nofollow">
                <Avatar content={value} variant={selected ? "active" : "default"} />
              </a>
            </li>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);
          return range && (
            <>
              <ValueItem
                key={index}
                {...item}
                label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
              />
              {index === values.length-1 && (<RangePrice/>)}
            </>
          );
        }

        return <ValueItem key={index} {...item} />;
      })}

      {values.length > 6 && (
        <li className="w-full">
          <details className={`collapse`}>
            <summary className="w-full block pt-2 px-4 collapse-title text-right text-base font-bold">Ver mais</summary>
            <ul className="flex flex-wrap gap-2 flex-row">
              {values.slice(6).map((item, index) => {
                const { url, selected, value } = item;

                if (key === "cor" || key === "tamanho") {
                  return (
                    <li key={index}>
                      <a href={url} rel="nofollow">
                        <Avatar content={value} variant={selected ? "active" : "default"} />
                      </a>
                    </li>
                  );
                }
                return <ValueItem key={index} {...item} />;
              })}

            </ul>
          </details>
        </li>
      )}
    </ul>
  );
}


function Filters({ filters }: Props) {

  //verifica se há pelo menos 1 filtro ativo
  const hasFilterActive = filters.filter(isToggle).some(filter => filter.values.some(value => value.selected));

  return (
    <>
      {
        hasFilterActive && (
          <div className="mb-2 bg-neutral-50 border border-brand-secondary-400">
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
      <ul className="flex flex-col gap-4">
        {
          filters.filter(isToggle).map((filter, index) => (
            
            <li key={index} className="dropdown bg-neutral-50 py-3 px-5">
              <details className="group">
                <summary className="m-1 flex justify-between items-center cursor-pointer font-bold text-base pb-3">
                  {
                    filter.label !== 'Preço' ? filter.label : 'Faixa de Preço' 
                  }
                  <span className="w-4 h-4 text-center flex justify-center items-center">
                    <span className="group-open:-rotate-90 transition-all duration-200 ease-in">
                      <Icon id="ArrowAccordion" size={24} strokeWidth={2} fill="text-neutral-900" />
                    </span>
                  </span>
                </summary>
                <FilterValues {...filter} />
              </details>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Filters;
