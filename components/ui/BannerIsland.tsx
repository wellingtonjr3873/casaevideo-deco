import { Picture, Source } from "./Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "$store/sdk/useId.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  title?: string;
  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  banners: Banner[];
}

const RADIUS_MOBILE = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
};

const RADIUS_DESKTOP = {
  "none": "sm:rounded-none",
  "sm": "sm:rounded-sm",
  "md": "sm:rounded-md",
  "lg": "sm:rounded-lg",
  "xl": "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  "full": "sm:rounded-full",
};

const DEFAULT_PROPS: Props = {
  title: "Summer bags",
  banners: [
    {
      alt: "a",
      href: "a",
      srcMobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/82727553-f670-4e7c-b9c2-9452aed1955f",
      srcDesktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/7b3a9d75-57a5-43cf-a3c5-f689a997f24e",
    },
    {
      alt: "a",
      href: "a",
      srcMobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/c5c6bdf6-5555-488c-8b14-719e4158dea6",
      srcDesktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/3e2b7824-d75c-4704-8d32-621bfc9b20cf",
    },
  ],
  borderRadius: {
    mobile: "3xl",
    desktop: "3xl",
  },
};

export default function BannnerIsland(props: Props) {
  const {
    title,
    borderRadius,
    banners = [],
  } = { ...DEFAULT_PROPS, ...props };
  
  const id = useId();

  return (
    <div class="container w-full px-4 mx-auto max-w-[1280px] md:px-6 xl-b:px-0">
      {title &&
        (
          <div class="py-6 md:py-0 md:pb-[8px] flex items-center mt-6">
            <h2 class="h5-bold w-full">
              {title}
            </h2>
          </div>
        )}
        <div className="flex overflow-x-scroll md:overflow-x-hidden">
          <ul class="flex w-full gap-2 md:gap-4 md:justify-between md:w-full ">
            {banners.map(({ href, srcMobile, srcDesktop, alt }) => (
              <li
                class="w-1/2"
              >
                <a
                  href={href}
                  class={`overflow-hidden`}
                >
                  <Picture>
                    <Source
                      media="(max-width: 767px)"
                      src={srcMobile}
                      width={150}
                      height={180}
                      fetchPriority="low"
                    />
                    <Source
                      media="(min-width: 768px)"
                      src={srcDesktop ? srcDesktop : srcMobile}
                      width={272}
                      height={327}
                      fetchPriority="low"
                    />
                    <img
                      class={`w-full min-w-[150px] h-[calc(40vw*(180/150))] md:h-[calc(22.6vw*(327/272))] md:max-h-[370px] ${
                        RADIUS_MOBILE[borderRadius.mobile ?? "none"]
                      } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]}`}
                      sizes="(max-width: 640px) 150px, 100vw"
                      src={srcMobile}
                      alt={alt}
                      decoding="async"
                      loading="lazy"
                    />
                  </Picture>
                </a>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}
