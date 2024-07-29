import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { useUI } from "deco-sites/casaevideo/sdk/useUI.ts";
import FilstersMobile from "deco-sites/casaevideo/components/search/FiltersMobile.tsx";

export type Props =
  & Pick<ProductListingPage, "filters" | "sortOptions">
  & {
    displayFilter?: boolean;
    productQnt?: number;
    records?: number;
    pageName?: string;
    device?: string;
    urlPath: string;
  };

function SearchControls({ filters, displayFilter, records, device, pageName, sortOptions, productQnt, urlPath }: Props,) {

  const open = useSignal(false);
  const { layoutSelected } = useUI();

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-brand-secondary-50 flex flex-col h-full divide-y overflow-y-hidden w-full">
            <div class="flex justify-between items-center py-3 bg-brand-terciary-1 px-4">
              <h1 class=" flex gap-1">
                <Icon id="FilterButtonMob" size={24} />
                <span class="small-regular text-neutral-900">Filtrar por</span>
              </h1>
              <button onClick={() => open.value = false}>
                <Icon id="XMark" size={24} strokeWidth={2} />
              </button>
            </div>
            <div class="flex-grow overflow-auto p-4">
              <FilstersMobile filters={filters} sortOptions={sortOptions} urlPath={urlPath}/>
            </div>
          </div>
        </>
      }
    >
      <div class="flex md:hidden gap-[10px] text-left mt-[32px] mb-6">
        {device === "mobile" || device === "tablet" ?
          <div class="flex items-center justify-between w-full">
            <span class="body-bold">{pageName && pageName} </span>
            <Button
              class={displayFilter ? "btn-ghost" : "btn-ghost sm:hidden min-h-0 max-h-5"} 
              onClick={() => {
                open.value = true;
              }}
            >
              <Icon id="FilterButtonMob" width={20} height={20} />
              <span class="small-regular">Filtrar</span>
            </Button>
          </div>
          :
          <>
            <span class="body-bold">{pageName && pageName} </span>
            ({records && records <= 1 ? `${records} Produto` : `${records} Produtos`})
          </>
        }
      </div>
      <div class="flex flex-col justify-between p-0 md:p-4 sm:p-0 sm:gap-4 sm:flex-row sm:h-[53px] mb-6 md:mb-8">
        <div class="w-full flex flex-row items-center justify-betwee sm:gap-4 sm:border-none justify-between">

          <h2 class="hidden md:block">
            ({productQnt && productQnt <= 1 ? `${productQnt} Produto` : `${productQnt} Produtos`})
          </h2>

          <div class="w-full md:w-4/5 flex items-center justify-between md:justify-end md:gap-10">
            {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}

            {device === "mobile" || device === "tablet" ?
              null
              :
              <Button
                class={displayFilter ? "btn-ghost" : "btn-ghost sm:hidden"}
                onClick={() => {
                  open.value = true;
                }}
              >
                <Icon id="FilterButtonMob" width={24} height={24} />
                <span class="small-regular">Filtrar por</span>
              </Button>
            }

            <div>
              <Button
                class={`${layoutSelected.value === "grid" ? "bg-brand-secondary-900 text-brand-terciary-base hover:bg-brand-secondary-900" : ""} border-0 shadow-none p-2 min-h-10 max-h-10 w-auto md:min-w-24`}
                onClick={() => {
                  layoutSelected.value = "grid"
                }}
              >
                <Icon id={layoutSelected.value === "grid" ? "ViewGridSelected" : "ViewGrid"} width={24} height={24} />
                <span class="block">Grade</span>
              </Button>

              <Button
                class={`${layoutSelected.value === "list" ? "bg-brand-secondary-900 text-brand-terciary-base hover:bg-brand-secondary-900" : ""} border-0 shadow-none p-2 min-h-10 max-h-10 w-auto md:min-w-24`}
                onClick={() => {
                  layoutSelected.value = "list"
                }}
              >
                <Icon id={layoutSelected.value === "list" ? "ViewListSelected" : "ViewList"} width={24} height={24} />
                <span class="block">Lista</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
