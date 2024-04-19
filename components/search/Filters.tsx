import Avatar from "$store/components/ui/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";


interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <li class="py-2">
      <a href={url} rel="nofollow" class="flex items-center gap-2">
        <div aria-checked={selected} class="checkbox checkbox-warning w-4 h-4 rounded-sm border-brand-secondary-200" />
        <span class="text-sm text-neutral-900">{label}</span>
      </a>
    </li>
  );
}


function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <>
      <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
       
        {values.map((item, index) => {
          const { url, selected, value } = item;

          if (index <= 4) {

            if (key === "cor" || key === "tamanho") {
              return (
                <li>
                  <a href={url} rel="nofollow">
                    <Avatar
                      content={value}
                      variant={selected ? "active" : "default"}
                    />
                  </a>
                </li>
              );
            }

            if (key === "price") {
              const range = parseRange(item.value);

              return range && (
                <ValueItem
                  {...item}
                  label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
                />
              );
            }

            return <ValueItem {...item} />;
          }
        })}


        {values.length > 4 && (
          <details class="collapse">
            <summary class="collapse-title text-xl font-medium">Click to open/close</summary>
            {
              values.map((item, index) => {

                const { url, selected, value } = item;

                if (key === "cor" || key === "tamanho") {
                  return (
                    <li>
                      <a href={url} rel="nofollow">
                        <Avatar
                          content={value}
                          variant={selected ? "active" : "default"}
                        />
                      </a>
                    </li>
                  );
                }

                if (index > 4) {
                  return <ValueItem {...item} />;
                }
              })
            }
          </details>)
          }
      </ul>

    </>

  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col gap-4">
      {filters
        .filter(isToggle)
        .map((filter, index) => (
          <li tabIndex={index} class="dropdown bg-neutral-50 py-3 px-5">
            <details class="group">
              <summary class="m-1 flex justify-between items-center cursor-pointer font-bold text-base">
                {filter.label}
                <span class="w-4 h-4 text-center flex justify-center items-center">
                  <span class="group-open:-rotate-90 transition-all duration-200 ease-in">
                    <Icon id="ArrowAccordion" size={24} strokeWidth={2} fill={`text-neutral-900`} />
                  </span>
                </span>
              </summary>
              <FilterValues {...filter} />
            </details>
          </li>
        ))}
    </ul>
  );
}

export default Filters;
