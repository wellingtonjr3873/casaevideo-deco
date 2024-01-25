import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Searchbar from "$store/components/search/Searchbar.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";

export interface Props {
  alerts: string[];
  /** @title Search Bar */
  searchbar: Omit<SearchbarProps, "platform">;
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
  alerts,
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
        {/* mobile version */}

        <div class="flex flex-col bg-brand-terciary-1 p-[16px] gap-[24px]">
          <div className="flex justify-between">
            <div class="flex gap-[8px] items-center content-start">
              <span className="py-[6px] pr-[4px] pl-[0]">
                <Icon
                  id="hamburguer"
                  className="text-neutral-900"
                  width="17"
                  height="12"
                  strokeWidth={1.5}
                />
              </span>
              <Picture>
                <Source
                  media="(max-width: 768px)"
                  src={logo?.mobile.src || ""}
                  width={140}
                  height={24}
                />
                <Source
                  media="(min-width: 768px)"
                  src={logo?.desktop.src || ""}
                  width={240}
                  height={40}
                />

                <img src={logo?.desktop.src} />
              </Picture>
              {/* <Image src={logo?.src} alt={logo?.alt} width={100} height={50} /> */}
            </div>

            <div className="flex items-center justify-end">
              <a
                class="flex items-center justify-center w-[24px] h-[24px]"
                href="/login"
                aria-label="Log in"
              >
                <Icon
                  id="User"
                  strokeWidth={0.4}
                  width="16"
                  height="18"
                  className="text-neutral-900 fill-transparent"
                />
              </a>
              {platform === "vtex" && <CartButtonVTEX />}
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
