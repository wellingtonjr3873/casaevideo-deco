import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy alt
 */
export interface Props {
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
  href?: string;
}

export default function Banner({ srcMobile, srcDesktop, alt, href, bannerWidthDesk, bannerHeightDesk, bannerHeightMob, bannerWidthMob }: Props) {

  return (
    <>
      <div class={`flex w-full container max-w-[1280px]`}>
        <a href={href} class={`overflow-hidden w-full rounded-lg`}>
          <Picture>
            <Source
              media="(max-width: 767px)"
              src={srcMobile}
              width={bannerWidthMob}
              height={bannerHeightMob}
              fetchPriority="high"
              loading={"eager"}
            />
            <Source
              media="(min-width: 768px)"
              src={srcDesktop ? srcDesktop : srcMobile}
              width={bannerWidthDesk}
              height={bannerHeightDesk}
              fetchPriority="high"
              loading={"eager"}
            />
            <img
              class="w-full"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={srcMobile}
              alt={alt}
              decoding="sync"
              loading="eager"
              preload={"true"}
            />
          </Picture>
        </a>
      </div>
    </>
  );
}
