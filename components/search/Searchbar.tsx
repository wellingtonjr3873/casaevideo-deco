/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import ProductCard from "$store/components/product/ProductCard.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSuggestions } from "$store/sdk/useSuggestions.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import {  useRef } from "preact/compat";
import type { Platform } from "$store/apps/site.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { IntelligenseSearch } from "deco-sites/casaevideo/loaders/search/intelligenseSearch.ts";
// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<IntelligenseSearch | null>;

  platform: Platform;
  isMobile?: boolean
}

function Searchbar({
  placeholder = "Buscar por produto ou marca...",
  action = "/s",
  name = "q",
  loader,
  platform,
  isMobile
}: Props) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery, payload, loading } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  return (
    <div class="w-full grid gap-8 overflow-y-hidden h-[40px]" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
      <form
        id={id}
        action={action}
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        class="flex bg-[white] rounded-[4px] shadow-[0px_2px_8px_0px_rgba(57, 57, 57, 0.08)] overflow-hidden"
      >
        <input
          ref={searchInputRef}
          id="search-input"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
          class="flex-grow bg-[#FFF] h-[40px] pl-[8px] pt-[8px] pb-[8px] outline-none small-regular text-brand-secondary-900 placeholder:text-brand-secondary-900 placeholder:font-[var(--font-family)]"
          name={name}
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (value) {
              displaySearchPopup.value = true
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            setQuery(value);
          }}
          placeholder={"Buscar por produto ou marca..."}
          role="combobox"
          aria-controls="search-suggestion"
          autocomplete="off"
        />
        <Button
          type="submit"
          class="border-none h-[40px] p-[12px] min-h-fit bg-[#FFF] shadow-none"
          aria-label="Search"
          for={id}
          tabIndex={-1}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : <Icon id="MagnifyingGlass" size={16} strokeWidth={0.01} />}
        </Button>
      </form>
       {displaySearchPopup.value && <div class="absolute z-[98] inset-[0_0_0_0]" onClick={() => {
          displaySearchPopup.value = false
        }}/>
      }
     { true && <div
        class={`overflow ${!hasProducts && !hasTerms ? "hidden" : ""}  ${displaySearchPopup.value ? "block" : "hidden"} absolute mt-10 z-[99] bg-neutral-50 left-[16px] right-[16px] lg:left-[10%] lg:right-[unset] xl-b:left-[unset]`}
            
      >
        <div class="gap-4 flex flex-col lg:grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[150px_1fr] p-2 lg:p-4 shadow-[-3px_2px_7px_rgba(0,0,0,.2)]">
          <div class="flex flex-col gap-6"> 
            <span
              class="body-bold"
              role="heading"
              aria-level={3}
            >
              SUGESTÕES
            </span>
            <ul id="search-suggestion" class="flex flex-col gap-6">
              {searches.map(({term, attributes }) => (
                <li>
                  <a href={`/search?q=${term}`} class="flex gap-4 items-center">
                    <span dangerouslySetInnerHTML={{ __html: term }} class="body-regular" />
                  </a>
                  <ul class="ml-2">
                      {attributes?.map(item => {
                        return <li>
                              <a href={`/search?q=${item.labelValue.toLowerCase()}`} class="x-small-regular" >
                                {item.labelValue}
                              </a>
                          </li>
                      })}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div class="flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden">
            <span
              class="body-bold"
              role="heading"
              aria-level={3}
            >
              PRODUTOS SUGERIDOS
            </span>
            <div class="flex flex-col gap-4 items-center">
              <div class="flex flex-col lg:flex-row gap-1 lg:gap-2">

              {products.map((product, index) => {
                const { listPrice, price } = useOffer(product.offers);
                const [ productFrontImage ] = product.image!
                return (
                <li
                  key={index}
                  class="list-none gap-2 lg:gap-4"
                >

                  {!isMobile ?
                   <div class="carousel-item lg:first:ml-4 last:mr-4 min-w-[155px] lg:min-w-[200px] max-w-[200px]">
                    <ProductCard
                      product={product}
                      platform={platform}
                      index={index}
                      itemListName="Suggeestions"
                      dataVanPlacement={"autocomplete"}
                      /> 
                    </div>
                    :
                  <a href={product.url?.split("?")[0]} class="flex gap-2">
                      <picture>
                        <img src={productFrontImage.url} alt="" class="h-16 w-16 max-w-none"/>
                      </picture>
                      <div class="flex flex-col">
                        <span class="small-regular line-clamp-1 truncate whitespace-break-spaces">{product.name}</span>
                        <span class="line-through x-small-regular">
                          {formatPrice(listPrice, product.offers?.priceCurrency)}
                        </span>
                        <span class="x-small-bold">
                          {formatPrice(price, product.offers?.priceCurrency)}
                        </span>
                      </div>
                  </a>
                  }
                </li>
              )})}
              </div>

         { searches[0]?.term && <a href={`/search?q=${searches[0].term}`} class="x-small-regular">veja todos os {searches[0].count} produtos</a> }
            </div>
          </div>
        </div>
      </div> }
    </div>
  );
}

export default Searchbar;
