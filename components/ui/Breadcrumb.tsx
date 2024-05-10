import type { BreadcrumbList } from "apps/commerce/types.ts";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
  homeName?: string;
  isCategory?: boolean;
}

function Breadcrumb({ itemListElement = [], homeName = "Casa&Video", isCategory = false }: Props) {
  const items = [{ name: homeName, item: "/" }, ...itemListElement];
  
  return (
    <div class="overflow-visible x-small-regular md:body-regular text-neutral-900 p-0">
      <ul class="last:x-small-bold md:last:body-bold flex-wrap flex min-h-min items-center whitespace-nowrap">
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }, index) => (
            <li class="flex items-center before:translate-x-0:important before:translate-y-0 before:rotate-0 before:h-auto before:border-0 before:content-['|'] first:before:content-[''] pl-1 first:p-0 before:pr-1 first:before:p-0">
              <a href={item} class="flex items-center gap-1">
                {name === homeName && (
                  <Icon id="Home" width={24} height={24} />
                )}
                {index == items.length - 1 && isCategory ? 
                <>
                  <h1>{name}</h1>
                </>
                :
                <>
                  {name}
                </>
                }
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
