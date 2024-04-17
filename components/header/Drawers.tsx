import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));

export interface Props {
  menu: MenuProps;
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
  <div class="grid grid-rows-[48px_max-content] h-full divide-y max-w-sm w-full bg-brand-secondary-50">
    <div class="flex justify-between items-center bg-brand-terciary-1 max-w-sm w-full">
      <h1 class="px-4 py-3">
        <span class="small-regular items-center flex gap-2">
          {iconTitle && iconTitle}
          {title}
        </span>
      </h1>
      {onClose && (
        <Button class="btn btn-ghost" onClick={onClose}>
          <Icon id="CvlbCross" size={24} strokeWidth={2} />
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

function Drawers({ menu, children, platform }: Props) {
  const { displayCart, displayMenu, displaySearchDrawer } = useUI();


  console.log('teste', displayMenu, displaySearchDrawer )

  return (
    <>
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
          iconTitle={<Icon id="User" size={24} strokeWidth={2} />}
          title={"Olá Usuário"}
        >
          {displayMenu.value && <Menu {...menu} />}
        </Aside>
      }
    />
    
    <Drawer // right drawer
        class="drawer-end"
        open={displayCart.value !== false}
        onClose={() => displayCart.value = false}
        aside={
          <Aside
            iconTitle={<Icon id="Cart" size={24} strokeWidth={2} />}
            title="Minha sacola"
            onClose={() => displayCart.value = false}
          >
            <Cart platform={platform} />
          </Aside>
        }
      >
        {children}
      </Drawer>
    </>
  );
}

export default Drawers;
