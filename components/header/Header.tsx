import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Searchbar from "$store/components/search/Searchbar.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  /** @title Search Bar */
  searchbar: Omit<SearchbarProps, "platform">;
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
}

function Header({
  searchbar,
  logo,
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

        <div class="hidden lg:grid grid-cols-[140px_auto_280px] items-center max-w-[1280px] mx-auto">
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

        {/* mobile version */}

        <div class="flex flex-col bg-brand-terciary-1 p-[16px] gap-[24px] lg:hidden">
          <div className="flex justify-between">
            <div class="flex gap-[8px] items-center content-start">
              <span className="py-[6px] pr-[4px] pl-[0]">
                <Icon
                  id="Hamburguer"
                  className="text-neutral-900"
                  width="17"
                  height="12"
                  strokeWidth={1.5}
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
