import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";
import { Props as MinicartProps } from "$store/components/minicart/ProductShelfMinicart.tsx";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));

export interface Props {
  menu: MenuProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
  minicartProps: MinicartProps;
}

const Aside = (
  { title, iconTitle, onClose, children, style }: {
    title: string;
    iconTitle: ComponentChildren;
    onClose?: () => void;
    children: ComponentChildren;
    style?: string;
  },
) => (
  <div class={`${style} grid h-full divide-y bg-brand-secondary-50 w-full lg:max-w-[410px]`}>
    <div class="flex justify-between items-center bg-brand-terciary-1 lg:max-w-[410px] w-full">
      <p class="px-4 py-3">
        <span class="small-regular items-center flex gap-2">
          {iconTitle && iconTitle}
          {title}
        </span>
      </p>
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

function Drawers({ menu, children, platform, minicartProps }: Props) {

  const { displayCart, displayCartAlready, displayMenu, displaySearchDrawer } = useUI();

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
          title={"Olá usuário"}
          style="w-full grid-rows-[48px_max-content]"
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
            title="Produtos Adicionados"
            onClose={() => displayCart.value = false}
            style="w-[85%] grid-rows-[48px] lg:max-w-[404px]"
          >
            {displayCart.value || displayCartAlready.value ? <Cart platform={platform} minicartProps={minicartProps} /> : <></>}
          </Aside>
        }
      >
        {children}
      </Drawer>
    </>
  );
}

export default Drawers;
