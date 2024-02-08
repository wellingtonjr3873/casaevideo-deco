import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  /**
   * @description Largura da imagem Desktop
   */
  bannerWidthDesk: number;
  /**
   * @description Largura da imagem Desktop
   */
  bannerHeightDesk: number;
  srcDesktop?: ImageWidget;
  /**
   * @description Largura da imagem Mobile
   */
  bannerWidthMob: number;
  /**
   * @description Largura da imagem Mobile
   */
  bannerHeightMob: number;
  srcMobile: ImageWidget;
  /**
   * @description Texto alt da imagem
   */
  alt: string;
  /**
   * @description Link de redirecionamento
   */
  href: string;
}

export interface Props {
  title?: string;
  /**
   * @description O padrão é 2
   */
  itemsPerLine: {
    /** @default 2 */
    mobile?: 1 | 2;
    /** @default 4 */
    desktop?: 1 | 2;
  };
  banners: Banner[];
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
};

const DEFAULT_PROPS: Props = {
  title: "",
  banners: [],
  itemsPerLine: {},
};

export default function BannersGrid(props: Props) {
  const {
    title,
    itemsPerLine,
    banners = [],
  } = { ...DEFAULT_PROPS, ...props };

  return (
    <section class="container w-full px-4 md:px-0 mx-auto">
      {title &&
        (
          <div class="py-6 md:py-0 md:pb-[40px] flex items-center mt-6">
            <h2 class="text-lg leading-5 font-semibold uppercase">
              {title}
            </h2>

            <div class="bg-[#e5e5ea] h-[1px] w-full ml-4"></div>
          </div>
        )}
      <div
        class={`grid gap-2 md:gap-2 mt-2 ${
          MOBILE_COLUMNS[itemsPerLine?.mobile ?? 2]
        } ${DESKTOP_COLUMNS[itemsPerLine?.desktop ?? 2]}`}
      >
        {banners.map((
          {
            href,
            srcMobile,
            srcDesktop,
            alt,
            bannerWidthDesk,
            bannerHeightDesk,
            bannerWidthMob,
            bannerHeightMob,
          },
        ) => (
          <a
            href={href}
            class={`overflow-hidden`}
          >
            <Picture>
              <Source
                media="(max-width: 767px)"
                src={srcMobile}
                width={bannerWidthMob}
                height={bannerHeightMob}
              />
              <Source
                media="(min-width: 768px)"
                src={srcDesktop ? srcDesktop : srcMobile}
                width={bannerWidthDesk}
                height={bannerHeightDesk}
              />
              <img
                class="w-full"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={srcMobile}
                alt={alt}
                decoding="async"
                loading="lazy"
              />
            </Picture>
          </a>
        ))}
      </div>
    </section>
  );
}
