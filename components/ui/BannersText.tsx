import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "deco-sites/casaevideo/components/ui/Picture.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  /**
* @Title Texto Banner
* @format html
*/
  text?: string;
  /**
* @Title Banner Mobile
*/
  bannerWidthMob: number;
  bannerHeightMob: number;
  srcMobile: ImageWidget;
  /**
 * @Title Banner Desktop
 */
  bannerWidthDesk: number;
  bannerHeightDesk: number;
  srcDesktop?: ImageWidget;
  /**
   * @Title Alt da imagem
   */
  alt: string;
  /**
   * @Title Link do Banner
   */
  href: string;
}

export interface Props {
  title?: string;
  banners: Banner[];
}

const DEFAULT_PROPS: Props = {
  banners: [
    {
      "alt": "Para ficar conectada",
      "href": "/2355?map=productClusterIds&order=OrderByTopSaleDESC",
      "srcMobile": "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3429/4b96c6a5-b318-4edf-babb-e8504d5bc0ed",
      "srcDesktop": "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3429/fd4209f1-3391-45a1-9795-985eb6d99058",
      "bannerWidthMob": 184,
      "bannerHeightMob": 203,
      "bannerWidthDesk": 304,
      "bannerHeightDesk": 335
    },
    {
      "alt": "Para renovar a casa",
      "href": "/2356?map=productClusterIds&order=OrderByTopSaleDESC",
      "srcMobile": "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3429/eea0b05b-989f-4e4b-88d7-6463a07e71a8",
      "srcDesktop": "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3429/d5d159b5-9e7a-42ff-ab28-b52886a7609a",
      "bannerWidthMob": 184,
      "bannerHeightMob": 203,
      "bannerWidthDesk": 304,
      "bannerHeightDesk": 335
    },
    {
      "alt": "Para manter o visual",
      "href": "/beleza",
      "srcMobile": "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3429/29e70b45-1ec0-42d6-b65c-aedeb1d0287c",
      "srcDesktop": "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3429/a62a3ba9-4d1d-4ebf-81e1-5b30a23350ab",
      "bannerWidthMob": 184,
      "bannerHeightMob": 203,
      "bannerWidthDesk": 304,
      "bannerHeightDesk": 335
    },
    {
      "alt": "Para a hora do treino",
      "href": "/esporte-e-lazer/ginastica-e-musculacao",
      "srcMobile": "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3429/283d113b-01cb-4ce4-a844-68d0c8b3ceea",
      "srcDesktop": "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3429/0028693f-0f4a-47cc-a629-f89cae8766f7",
      "bannerWidthMob": 184,
      "bannerHeightMob": 203,
      "bannerWidthDesk": 304,
      "bannerHeightDesk": 335
    }
  ]
};

export default function BannersText(props: Props) {
  const {
    title,
    banners = [],
  } = { ...DEFAULT_PROPS, ...props };

  return (
    <div class="container w-full px-4 mx-auto max-w-[1280px] md:px-6 xl-b:px-0">
      {title &&
        (
          <div class="py-6 md:py-0 md:pb-[8px] flex items-center mt-6">
            <h2 class="h5-bold w-full">
              {title}DSADSADASDAS
            </h2>
          </div>
        )}
      <div class="grid grid-cols-2 gap-2 md:grid-cols-4 py-2">
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
            text,
          },
        ) => (
          <div class="flex flex-col">
            <a
              href={href}
            >
              <Picture>
                <Source
                  media="(max-width: 767px)"
                  src={srcMobile}
                  width={bannerWidthMob}
                  height={bannerHeightMob}
                  fetchPriority="low"
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
            {text && <div
              class="w-full container px-2 py-3 flex flex-col lg:py-3 lg:px-2 text-xs md:text-base"
              dangerouslySetInnerHTML={{ __html: text }}
            />}
          </div>
        ))}
      </div>
    </div>
  );
}
