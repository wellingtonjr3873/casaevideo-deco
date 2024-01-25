import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

export interface Props {
  menu: MenuProps;
  searchbar: Omit<SearchbarProps, "platform">;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
}

const Aside = (
  { title, iconTitle, onClose, children }: {
    title: string;
    iconTitle: ComponentChildren;
    onClose?: () => void;
    children: ComponentChildren;
  },
) => (
  <div class="grid grid-rows-[auto_1fr] h-full divide-y bg-[#F3F3F3] max-w-[368px] w-[100%]">
    <div class="flex justify-between items-center bg-[#FFF100] max-w-[368px] w-[100%]">
      <h1 class="px-4 py-3">
        <span class="font-medium text-2xl flex inline-flex items-center">
          {iconTitle && iconTitle}
          {title}
        </span>
      </h1>
      {onClose && (
        <Button class="btn btn-ghost" onClick={onClose}>
          <Icon id="cvlbCross" size={24} strokeWidth={2} />
        </Button>
      )}
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, searchbar, children, platform }: Props) {
  const { displayCart, displayMenu, displaySearchDrawer } = useUI();

  return (
    <Drawer // left drawer
      open={displayMenu.value || displaySearchDrawer.value}
      onClose={() => {
        displayMenu.value = false;
        displaySearchDrawer.value = false;
      }}
      aside={
        <Aside
          onClose={() => {
            displayMenu.value = false;
            displaySearchDrawer.value = false;
          }}
          iconTitle={<Icon id="User2" size={24} strokeWidth={2} />}
          title={"Olá Usuário"}
        >
          {displayMenu.value && <Menu {...menu} />}
          {searchbar && displaySearchDrawer.value && (
            <div class="w-screen">
              <Searchbar {...searchbar} platform={platform} />
            </div>
          )}
        </Aside>
      }
    >
      <Drawer // right drawer
        class="drawer-end"
        open={displayCart.value !== false}
        onClose={() => displayCart.value = false}
        aside={
          <Aside
            title="Minha sacola"
            onClose={() => displayCart.value = false}
            iconTitle={null}
          >
            <Cart platform={platform} />
          </Aside>
        }
      >
        {children}
      </Drawer>
    </Drawer>
  );
}

export default Drawers;
