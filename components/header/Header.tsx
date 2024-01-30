import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Searchbar from "$store/components/search/Searchbar.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { MenuButton } from "$store/islands/Header/Buttons.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";


interface Categories {
  items: {
    label: string;
    isSazonal: boolean;
    href: string;
  }[];
}
export interface Props {
  /** @title Search Bar */
  searchbar: Omit<SearchbarProps, "platform">;
  navItems: SiteNavigationElement[] | null;
  alerts: string[];
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  /** @title Logo */
  logo?: {
    mobile: {
      src: ImageWidget;
      alt: string;
    };

    desktop: {
      src: ImageWidget;
      alt: string;
    };
  };
  categories?: Categories;
}

function Header({
  searchbar,
  logo,
  categories = {
    items: [
      { href: "/", isSazonal: false, label: "Categoria" },
      { href: "/", isSazonal: false, label: "Categoria 1" },
      { href: "/", isSazonal: false, label: "Categoria 2" },
      { href: "/", isSazonal: false, label: "Categoria 3" },
      { href: "/", isSazonal: false, label: "Categoria 4" },
      { href: "/", isSazonal: false, label: "Categoria 5" },
      { href: "/", isSazonal: false, label: "Categoria 6" },
    ],
  },
  // navItems,
}: Props) {
  const platform = usePlatform();

  return (
    <>
      <header className="bg-brand-terciary-1 h-[168px]">
        <div className="h-[48px] flex items-center justify-center bg-complementary-2">
          <p>Destaque</p>
        </div>

        {/* desktop version */}

        <div class="hidden lg:flex flex-col max-w-[1280px] mx-auto pt-[20px] gap-[20px]">
          <div class="grid grid-cols-[140px_auto_280px] items-center w-full gap-[16px]">
            <figure>
              {logo && (
                <Picture>
                  <Source
                    media="(max-width: 768px)"
                    src={logo.mobile.src}
                    width={140}
                    height={24}
                  />
                  <Source
                    media="(min-width: 768px)"
                    src={logo.desktop.src}
                    width={240}
                    height={40}
                  />

                  <img src={logo?.desktop.src} />
                </Picture>
              )}
            </figure>
            <div class="w-full">
              <Searchbar {...searchbar} platform={platform} />
            </div>
            <div class="flex items-center gap-[8px]">
              {/* user */}
              <a
                class="flex items-center justify-center gap-[4px]"
                href="/login"
                aria-label="Log in"
              >
                <Icon
                  id="User"
                  size={32}
                  className="text-neutral-900 "
                />
                <div class="flex flex-col">
                  <span class="small-regular">Bem vindo!</span>
                  <span class="x-small-underline">Entre ou cadastre-se</span>
                </div>
                {/* meus pedidos */}
                <a>
                  <Icon id="MyOrders" size={32} class="text-neutral-900" />
                </a>
                {/* wishlist */}
                <a>
                  <Icon id="Wishlist" size={32} class="text-neutral-900" />
                </a>
              </a>

              {/* cart */}
              {platform === "vtex" && (
                <CartButtonVTEX>
                  <Icon
                    id="Cart"
                    size={32}
                    className="fill-brand-secondary-900"
                  />
                </CartButtonVTEX>
              )}
            </div>
          </div>

          <div class="flex w-full pb-[8px]">
            <nav class="w-full flex">
              <ul class="w-full flex items-center justify-between">
                <li class="flex items-center">
                  <MenuButton />
                  <Drawers
                    menu={{ items: [] }}
                    platform={platform}
                  />
                  <span class="small-bold hover:underline-offset-1">
                    Categorias
                  </span>
                </li>
                {categories?.items?.map((item) => {
                  return (
                    <li
                      class="hover:underline-offset-1 small-regular"
                      key={item.label}
                    >
                      <a href={item.href}>{item.label}</a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        {/* mobile version */}

        <div class="flex flex-col bg-brand-terciary-1 p-[16px] gap-[24px] lg:hidden">
          <div className="flex justify-between">
            <div class="flex gap-[8px] items-center content-start">
              <span>
                <MenuButton />
                <Drawers
                  menu={{ items: [] }}
                  platform={platform}
                />
              </span>
              {logo && (
                <Picture>
                  <Source
                    media="(max-width: 768px)"
                    src={logo.mobile.src}
                    width={140}
                    height={24}
                  />
                  <Source
                    media="(min-width: 768px)"
                    src={logo.desktop.src}
                    width={240}
                    height={40}
                  />

                  <img src={logo?.desktop.src} />
                </Picture>
              )}
              {/* <Image src={logo?.src} alt={logo?.alt} width={100} height={50} /> */}
            </div>

            <div className="flex items-center justify-end">
              <a
                class="flex items-center justify-center"
                href="/login"
                aria-label="Log in"
              >
                <Icon
                  id="User"
                  strokeWidth={0.4}
                  size={24}
                  className="text-neutral-900 fill-transparent"
                />
              </a>
              {platform === "vtex" && (
                <CartButtonVTEX>
                  <Icon
                    id="Cart"
                    className="fill-brand-secondary-900 h-[24px] w-[24px]"
                  />
                </CartButtonVTEX>
              )}
            </div>
          </div>
          <div>
            <Searchbar {...searchbar} platform={platform} />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
