import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import GeoLocationPointBar from "../../islands/Header/GeoLocationPointBar/GeoLocationPointBar.tsx";
import { MenuButton } from "$store/islands/Header/Buttons.tsx";
import { AppContext } from "$store/apps/site.ts";
import type { SectionProps } from "deco/types.ts";
import Searchbar from "$store/islands/Header/Searchbar.tsx";

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
  // deno-lint-ignore no-explicit-any
  navItems: any;
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
  isMobile: boolean,
  /** *@hide */
  device: "mobile" | "desktop" | "tablet";
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
  navItems,
  isMobile,
  device
}: Props) {
  const platform = usePlatform();
  
  if(device === "mobile"){
    return(
      <>
        <header class="bg-brand-terciary-1 h-[169px]">
          <div class="h-12 flex items-center justify-center bg-complementary-2">
            <p class="body-bold text-neutral-50">Destaque</p>
          </div>
          <div class="flex flex-col bg-brand-terciary-1 p-4 gap-6 lg:hidden">
            <div className="flex justify-between">
              <div class="flex gap-2 items-center content-start">
                <span class="flex">
                  <MenuButton />
                  {isMobile && <Drawers
                      menu={{ items: navItems }}
                      platform={platform}
                    />}
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
                    class="text-neutral-900 fill-transparent"
                  />
                </a>
                {platform === "vtex" && (
                  <CartButtonVTEX>
                    <Icon
                      id="Cart"
                      size={24}
                      className="fill-brand-secondary-900"
                    />
                  </CartButtonVTEX>
                )}
              </div>
            </div>
            <div>
              {isMobile &&  <Searchbar  searchbar={{...searchbar, platform, isMobile}}  />}
            </div>
          </div>
          <div className="lg:hidden">
            <GeoLocationPointBar />
          </div>
        </header>
      </>
    )
  }
  return (
    <>
      <header id="header" class="bg-brand-terciary-1 h-[168px]">
        <div class="h-12 flex items-center justify-center bg-complementary-2">
          <p class="body-bold text-neutral-50">Destaque</p>
        </div>

        {/* desktop version */}

        <div  class="hidden lg:flex flex-col  md:px-6 max-w-[1280px] mx-auto pt-5 gap-5 xl-b:px-0">
          <div class="grid grid-cols-[140px_auto_280px] items-center w-full gap-4">
            <a href="/" title="Link de retorno para página inicial">
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
            </a>
            <div class="w-full">
              {!isMobile &&  <Searchbar  searchbar={{...searchbar, platform, isMobile}}  />}
            </div>
            <div class="flex items-center gap-2">
              {/* user */}
              <a
                class="flex items-center justify-center gap-1"
                href="/login"
                aria-label="Log in"
              >
                <Icon
                  id="User"
                  size={32}
                  class="text-neutral-900 "
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
                    class="fill-brand-secondary-900"
                  />
                </CartButtonVTEX>
              )}
            </div>
          </div>

          <div class="flex w-full pb-2">
            <nav class="w-full flex">
              <ul class="w-full flex items-center justify-between">
                <li class="flex items-center">

                  <span class="flex">

                    <MenuButton />
                    {!isMobile && <Drawers
                      menu={{ items: navItems }}
                      platform={platform}
                    />}

                  </span>
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
        <div className="hidden lg:flex">
          <GeoLocationPointBar />
        </div>
      </header>
    
    </>
  );
}

export default Header;
