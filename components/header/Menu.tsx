import type { SiteNavigationElement } from "apps/commerce/types.ts";
import { useUI } from "$store/sdk/useUI.ts";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
const { displayMenu, displaySubMenu, displaySubMenuIndex } = useUI();
export interface Props {
  items: SiteNavigationElement[];
}

function SubMenuItem(
  { menu, parentIndex }: { menu: SiteNavigationElement; parentIndex: number },
) {
  return (
    <div class="collapse collapse-plus rounded-none border-none">
      <input type="checkbox" />
      <div class="flex justify-between items-center absolute py-[14px] px-[24px] w-[100%] bg-[#FFF]">
        {menu.name}
        <span class={`rotate-[90deg] w-[24px] block`}>
          <Icon id="arrowAccordion" size={24} strokeWidth={2} />
        </span>
      </div>
      <div class="p-0 pb-0 collapse-content">
        <ul class="flex-grow flex flex-col divide-y divide-base-200 gap-[2px] bg-[#FFF]">
          {menu.children?.map((node, idx) => (
            <li
              key={idx}
              class="border-none py-[14px] px-[24px] w-[100%] bg-[#F3F3F3]"
            >
              {node.children
                ? <SubMenuItem menu={node} parentIndex={parentIndex} />
                : (
                  <a href={node.url} class="text-left w-[100%] block">
                    {node.name}
                  </a>
                )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MenuItem(
  { item, index }: { item: SiteNavigationElement; index: number },
) {
  return (
    <div class="menu-content">
      <button
        class="open-sub-menu flex justify-between items-center text-left py-[14px] px-[24px] w-[100%] bg-[#FFF]"
        onClick={() => {
          displaySubMenuIndex.value = index;
          displaySubMenu.value = !displaySubMenu.value;
        }}
      >
        <span class="text-sm flex justify-between items-center text-left w-[100%]">
          {item.name}
          <Icon id="arrowAccordion" size={24} strokeWidth={2} />
        </span>
      </button>

      <div
        class={`subMenu-content py-[14px] flex-grow flex flex-col divide-y divide-base-200 gap-[2px] bg-[#F3F3F3] ${displaySubMenu.value && index === displaySubMenuIndex.value
            ? "open"
            : "closed"
          }`}
      >
        <div class="flex justify-between items-center bg-[#F3F3F3] max-w-[368px] w-[100%] pb-[28px]">
          <h1 class="">
            <span class="font-medium text-2xl flex inline-flex items-center">
              <button
                class="flex justify-between items-center text-left gap-[9px]"
                onClick={() => {
                  displaySubMenu.value = false;
                }}
              >
                <span class="text-sm flex justify-between items-center text-left w-[100%]">
                  <Icon id="arrowBack" size={24} strokeWidth={2} />
                  {item.name}
                </span>
              </button>
            </span>
          </h1>
          <Button
            class="btn btn-ghost max-h-[24px] min-h-[24px]"
            onClick={() => {
              displayMenu.value = false;
              displaySubMenu.value = !displaySubMenu.value;
            }}
          >
            <Icon id="cvlbCross" size={24} strokeWidth={2} />
          </Button>
        </div>

        <div class="subMenuChildren px-[7px] border-none">
          {item.children?.map((node, idx) => (
            <>
              {node.children
                ? <SubMenuItem menu={node} parentIndex={index} key={idx} />
                : (
                  <div class="py-[14px] px-[24px] w-[100%] bg-[#FFF]">
                    <span class="text-sm flex justify-between items-center text-left w-[100%]">
                      <a href={node.url}>{node.name}</a>
                    </span>
                  </div>
                )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

function Menu({ items }: Props) {
  return (
    <div class="flex flex-col h-full px-[7px] py-[16px]">
      <div class="flex flex-col h-full">
        <ul class="flex flex-col gap-[2px] pb-[16px] bg-[#F3F3F3]">
          <li class="flex justify-between items-center text-left py-[10px] px-[24px] w-[100%] bg-[#FFF]">
            <a
              class="flex items-center gap-[8px]"
              href="/wishlist"
            >
              <Icon id="myOrders" size={24} strokeWidth={2} />
              <span class="text-sm flex justify-between items-center text-left w-[100%]">
                Meus Pedidos
              </span>
            </a>
          </li>
          <li class="flex justify-between items-center text-left py-[10px] px-[24px] w-[100%] bg-[#FFF]">
            <a
              class="flex items-center gap-[8px]"
              href="https://www.deco.cx"
            >
              <Icon id="myCoupons" size={24} strokeWidth={2} />
              <span class="text-sm flex justify-between items-center text-left w-[100%]">
                Pegue seu Cupom
              </span>
            </a>
          </li>
          <li class="flex justify-between items-center text-left py-[10px] px-[24px] w-[100%] bg-[#FFF]">
            <a
              class="flex items-center gap-[8px]"
              href="https://www.deco.cx"
            >
              <Icon id="buyWhatsapp" size={24} strokeWidth={2} />
              <span class="text-sm flex justify-between items-center text-left w-[100%]">
                Faça sua compra pelo Whatsapp!
              </span>
            </a>
          </li>
          <li class="flex justify-between items-center text-left py-[10px] px-[24px] w-[100%] bg-[#FFF]">
            <a
              class="flex items-center gap-[8px]"
              href="https://www.deco.cx"
            >
              <Icon id="televendas" size={24} strokeWidth={2} />
              <span class="text-sm flex justify-between items-center text-left w-[100%]">
                Televendas: (21) 4002-3535
              </span>
            </a>
          </li>
        </ul>

        <ul class="flex flex-col gap-[2px] bg-[#F3F3F3]">
          {items.map((item, idx) => (
            <li class="border-none" key={idx}>
              {item.children
                ? (
                  <div>
                    {
                      //@ts-ignore : <no-control>
                      item?.image?.url && (
                        <img
                          //@ts-ignore : <no-control>
                          src={item?.image?.url}
                          alt="ícone da imagem"
                        />
                      )}
                    <MenuItem item={item} index={idx} />
                  </div>
                )
                : (
                  <a
                    href={item.url}
                    class="block py-[14px] px-[24px] w-[100%] bg-[#FFF]"
                  >
                    <span class="text-sm flex justify-between items-center text-left w-[100%]">
                      {item.name}
                    </span>
                  </a>
                )}
            </li>
          ))}
        </ul>

        <ul class="flex flex-col pt-[16px] gap-[2px] bg-[#F3F3F3]">
          <li class="flex justify-between items-center text-left py-[10px] px-[24px] w-[100%] bg-[#FFF]">
            <a
              class="flex items-center gap-[8px]"
              href="/wishlist"
            >
              <Icon id="helpCentral" size={24} strokeWidth={2} />
              <span class="text-sm flex justify-between items-center text-left w-[100%]">
                Central de Atendimento
              </span>
            </a>
          </li>
          <li class="flex justify-between items-center text-left py-[10px] px-[24px] w-[100%] bg-[#FFF]">
            <a
              class="flex items-center gap-[8px]"
              href="https://www.deco.cx"
            >
              <Icon id="creditCard" size={24} strokeWidth={2} />
              <span class="text-sm flex justify-between items-center text-left w-[100%]">
                Cartão Casa&Vídeo
              </span>
            </a>
          </li>
          <li class="flex justify-between items-center text-left py-[10px] px-[24px] w-[100%] bg-[#FFF]">
            <a
              class="flex items-center gap-[8px]"
              href="https://www.deco.cx"
            >
              <Icon id="ourStores" size={24} strokeWidth={2} />
              <span class="text-sm flex justify-between items-center text-left w-[100%]">
                Nossas Lojas
              </span>
            </a>
          </li>
        </ul>
      </div>

      <div class="flex flex-col justify-between items-center gap-[8px] py-[16px] px-[40px]">
        <span class="text-center">Baixe o nosso novo app Casa&Vídeo</span>
        <div class="flex justify-between items-center gap-[8px]">
          <a href="/">
            <Icon id="appleStoreImg" width={133} height={44} strokeWidth={0} />
          </a>
          <a href="/">
            <Icon id="googlePlayImg" width={133} height={44} strokeWidth={0} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Menu;
