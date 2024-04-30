import type { Category, SiteNavigationElement } from "apps/commerce/types.ts";
import { useUI } from "$store/sdk/useUI.ts";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

import { signal, effect } from "@preact/signals";
import { createPortal } from 'preact/compat';

import  Drawer from "$store/components/ui/Drawer.tsx";
import { useState } from "preact/hooks";





type CategoryChildren = {
  Title: string,
  name: string,
  hasChildren: boolean,
  children: CategoryChildren[],
  url: string
}

const { displayMenu, displaySubMenu, displaySubMenuIndex } = useUI();
export interface Props {
  items: CategoryChildren[];
}

function SubMenuItem(
  { menu, parentIndex }: { menu: CategoryChildren; parentIndex: number },
) {
  return (
    <div class="collapse collapse-plus rounded-none border-none grid-rows-[48px_0fr] ">
      <input type="checkbox" />
      <div class="flex justify-between items-center absolute py-[14px] px-[24px] w-[100%] bg-neutral-50 small-regular text-neutral-900">
        {menu.name}
        <span class={`rotate-[90deg] w-[24px] block`}>
          <Icon id="ArrowAccordion" size={24} strokeWidth={2} />
        </span>
      </div>
      <div class="p-0 pb-0 collapse-content">
        <ul class="flex-grow flex flex-col divide-y divide-base-200 gap-[2px] bg-neutral-50">
          {menu.children?.map((node, idx) => (
            <li
              key={idx}
              class="border-none py-[14px] px-[24px] w-[100%] bg-brand-secondary-50"
            >
                  <a href={node.url.replace("https://portal.vtexcommercestable.com.br","").replace("https://casaevideonewio.vtexcommercestable.com.br","")} class="text-left w-[100%] block">
                    {node.name}
                  </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


function MenuItem(
  { item, index }: { item: CategoryChildren; index: number },
) {  

  const DEFAULT_NAVBAR_CLASS = "navbar-submenu"
  const [classDrawer, setClassDrawer] = useState("navbar-submenu")
  
  const handleCloseDrawer = () => {   
    
    setClassDrawer(`${DEFAULT_NAVBAR_CLASS} is-leave`)
    setTimeout(() => {
      displaySubMenu.value = false;
    }, 400)
  }

  const handleOpenDrawer = () => {
    displaySubMenuIndex.value = index;
    displaySubMenu.value = !displaySubMenu.value;
    setClassDrawer(`${DEFAULT_NAVBAR_CLASS} open`)
  }

  return (
    <div class="menu-content">
      <button
        class="open-sub-menu flex justify-between items-center text-left py-[14px] px-[24px] w-[100%] bg-neutral-50"
        onClick={handleOpenDrawer}
      >
        <span class="text-sm flex justify-between items-center text-left w-[100%]">
          {item.name}
            <Icon id="ArrowAccordion" size={24} strokeWidth={2} />
        </span>
      </button>

      {displaySubMenu.value && index === displaySubMenuIndex.value  && createPortal(<Drawer 
          open={displaySubMenu.value && index === displaySubMenuIndex.value} 
          onClose={handleCloseDrawer}
          class={classDrawer}
       >
            <div class="navbar-children grid grid-rows-[64px_max-content] h-full divide-y bg-brand-secondary-50 lg:max-w-[354px] w-full">
              <div class="flex justify-between items-center bg-brand-secondary-50 lg:max-w-[354px] w-full px-4 py-4 mb-4">
                <h1 class="">
                  <span class="font-medium text-2xl  inline-flex items-center">
                    <button
                      class="flex justify-between items-center text-left"
                      onClick={handleCloseDrawer}
                    >
                      <span class="text-sm flex justify-between items-center text-left w-[100%] gap-2">
                        <Icon id="ArrowBack" size={24} strokeWidth={2} />
                        {item.name}
                      </span>
                    </button>
                  </span>
                </h1>
                <Button
                  class="btn btn-ghost max-h-[24px] min-h-[24px] p-0"
                  onClick={handleCloseDrawer}
                >
                  <Icon id="CvlbCross" size={24} strokeWidth={2} />
                </Button>
              </div>
  
              <div class="subMenuChildren px-[7px] border-none gap-0.5 flex flex-col bg-brand-secondary-50">
                {item.children?.map((node, idx) => (
                  <>
                    {node.hasChildren
                      ? <SubMenuItem menu={node} parentIndex={index} key={idx} />
                      : (
                        <div class="py-[14px] px-6 w-full bg-neutral-50">
                          <span class="small-regular flex justify-between items-center text-left w-full text-neutral-900">
                            <a class={`w-full`} href={node.url.replace("https://portal.vtexcommercestable.com.br","").replace("https://casaevideonewio.vtexcommercestable.com.br","")}>{node.name}</a>
                          </span>
                        </div>
                      )}
                  </>
                ))}
          
              </div>
              <div class="static mt-auto bg-brand-secondary-50 mb-8 h-[118px]">
                  <FooterMenu />
                </div>

            </div>
      </Drawer>, document.body) }
    </div>
  );
}
const visibleAllDepartaments = signal(false);
const FooterMenu = () => {
  return <div class="flex flex-col justify-between items-center gap-[8px] py-[16px] px-[40px] self-end">
  <span class="text-center">Baixe o nosso novo app Casa&Vídeo</span>
  <div class="flex justify-between items-center gap-[8px]">
    <a href="https://casaevideo.onelink.me/QIjQ/m3ukjv5d">
      <Icon id="AppleStoreImg" width={133} height={44} strokeWidth={0} />
    </a>
    <a href="https://casaevideo.onelink.me/QIjQ/m3ukjv5d">
      <Icon id="GooglePlayImg" width={133} height={44} strokeWidth={0} />
    </a>
  </div>
</div>
}

function Menu({ items }: Props) {
  const departaments = visibleAllDepartaments.value ? items : items.slice(0, 9);

  const handleVisibleAllDepartaments = () => {
    visibleAllDepartaments.value = true
  }


  return (
    <div class="flex flex-col h-full px-[7px] py-[16px] overflow-auto bg-brand-secondary-50">
      <div class="flex flex-col h-full">
        <ul class="flex flex-col gap-[2px] pb-[16px] bg-brand-secondary-50">
          <li class="flex justify-between items-center text-left py-[10px] px-[24px] w-[100%] bg-neutral-50">
            <a
              class="flex items-center gap-[8px]"
              href="/account/#/orders"
            >
              <Icon id="MyOrders" size={24} strokeWidth={2} class="text-neutral-900" />
              <span class="text-sm flex justify-between items-center text-left w-full">
                Meus Pedidos
              </span>
            </a>
          </li>
          <li class="flex justify-between items-center text-left py-[10px] px-[24px] w-[100%] bg-neutral-50">
            <a
              class="flex items-center gap-[8px]"
              href="/cupom-de-desconto"
            >
              <Icon id="MyCoupons" size={24} strokeWidth={2} />
              <span class="text-sm flex justify-between items-center text-left w-[100%]">
                Pegue seu Cupom
              </span>
            </a>
          </li>
          <li class="flex justify-between items-center text-left py-[10px] px-[24px] w-[100%] bg-neutral-50">
            <a
              class="flex items-center gap-[8px]"
              href="https://api.whatsapp.com/send?1=pt_BR&phone=5521991043269"
            >
              <Icon id="BuyWhatsapp" size={24} strokeWidth={2} />
              <span class="text-sm flex justify-between items-center text-left w-[100%]">
                Faça sua compra pelo Whatsapp!
              </span>
            </a>
          </li>
          <li class="flex justify-between items-center text-left py-[10px] px-[24px] w-[100%] bg-neutral-50">
            <a
              class="flex items-center gap-[8px]"
              href="tel:+552140023535"
            >
              <Icon id="Televendas" size={24} strokeWidth={2} />
              <span class="text-sm flex justify-between items-center text-left w-[100%]">
                Televendas: (21) 4002-3535
              </span>
            </a>
          </li>
        </ul>

        <ul class="flex flex-col gap-[2px] bg-brand-secondary-50">
          {departaments.map((item, idx) => (
            <li class="border-none" key={idx}>
              {item.hasChildren
                ? (
                  <div>
                    <MenuItem item={item} index={idx} />
                  </div>
                )
                : (
                  <a
                    href={item.url.replace("https://portal.vtexcommercestable.com.br","").replace("https://casaevideonewio.vtexcommercestable.com.br","")}
                    class="block py-[14px] px-[24px] w-[100%] bg-neutral-50"
                  >
                    <span class="text-sm flex justify-between items-center text-left w-[100%]">
                      {item.name}
                    </span>
                  </a>
                )}
            </li>
          ))}
          {!visibleAllDepartaments.value && <li class="border-none">
                  <button onClick={handleVisibleAllDepartaments} class="flex items-center justify-between py-[14px] px-[24px] w-[100%] bg-neutral-50">
                    <span class="small-bold text-neutral-900">Veja todos os departamentos</span>
                    <Icon id="ArrowAccordion" size={24} strokeWidth={2} style={"transform: rotate(90deg)"}/>
                  </button>
          </li>}
        </ul>

        <ul class="flex flex-col pt-[16px] gap-[2px] bg-brand-secondary-50">
          {/* <li class="flex justify-between items-center text-left py-[10px] px-[24px] w-[100%] bg-neutral-50">
            <a
              class="flex items-center gap-[8px]"
              href="/wishlist"
            >
              <Icon id="HelpCentral" size={24} strokeWidth={2} />
              <span class="text-sm flex justify-between items-center text-left w-[100%]">
                Central de Atendimento
              </span>
            </a>
          </li> */}
          <li class="flex justify-between items-center text-left py-[10px] px-[24px] w-[100%] bg-neutral-50">
            <a
              class="flex items-center gap-[8px]"
              href="/cartaocasaevideo"
            >
              <Icon id="CreditCard" size={24} strokeWidth={2} />
              <span class="text-sm flex justify-between items-center text-left w-[100%]">
                Cartão Casa&Video
              </span>
            </a>
          </li>
          <li class="flex justify-between items-center text-left py-[10px] px-[24px] w-[100%] bg-neutral-50">
            <a
              class="flex items-center gap-[8px]"
              href="/nossas-lojas"
            >
              <Icon id="OurStores" size={24} strokeWidth={2} />
              <span class="text-sm flex justify-between items-center text-left w-[100%]">
                Nossas Lojas
              </span>
            </a>
          </li>
        </ul>
      </div>

              <FooterMenu />
    </div>
  );
}

export default Menu;
