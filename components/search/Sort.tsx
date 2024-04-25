import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

// TODO: move this to the loader
const portugueseMappings = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  // "name:desc": "Nome - de Z a A",
  // "name:asc": "Nome - de A a Z",
  "release:desc": "Mais recentes",
  "discount:desc": "Descontos",
};

function Sort({ sortOptions }: Props) {
  const sort = useSort();

  return (
    <div class="md:flex items-center">
      <span class="h6-regular text-neutral-900 hidden md:flex">Ordernar por:</span>
      <select
      id="sort"
      name="sort"
      onInput={applySort}
      class="bg-unset w-min h-10 px-1 rounded m-2 text-base-content cursor-pointer outline-none small-regular md:h6-regular text-neutral-900"
    >
      {sortOptions.map(({ value, label }) => ({
        value,
        label: portugueseMappings[label as keyof typeof portugueseMappings] ??
          label,
      })).filter(({ label }) => label !== 'name:desc' && label !== 'name:asc').map(({ value, label }) => (
  
        <option key={value} value={value} selected={value === sort}>
          <span class="text-sm">{label}</span>
        </option>
      ))}
    </select>
    </div>
  );
}

export default Sort;
