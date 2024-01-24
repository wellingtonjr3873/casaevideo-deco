import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { BorderRadius, IslandBanner, Props } from "./types.ts";
import {
  DEFAULT_PROPS,
  DESKTOP_COLUMNS,
  MOBILE_COLUMNS,
  RADIUS_DESKTOP,
  RADIUS_MOBILE,
} from "./types.ts";

export default function IslandBanners({
  title = DEFAULT_PROPS.title,
  itemsPerLine = DEFAULT_PROPS.itemsPerLine,
  borderRadius = DEFAULT_PROPS.borderRadius,
  banners = DEFAULT_PROPS.banners,
}: Props) {
  return (
    <section class="container w-full px-4 md:px-0 mx-auto">
      {title &&
        (
          <div class="py-6 md:py-0 md:pb-[40px] flex items-center mt-6">
            <h2 class="text-xl leading-7 font-bold">
              {title}
            </h2>
          </div>
        )}
      <div
        class={`grid gap-4 md:gap-6 ${
          MOBILE_COLUMNS[itemsPerLine?.mobile ?? 2]
        } ${DESKTOP_COLUMNS[itemsPerLine?.desktop ?? 4]}`}
      >
        {banners.map(({ href, srcMobile, srcDesktop, alt }) => (
          <a
            href={href}
            class={`overflow-hidden ${
              RADIUS_MOBILE[borderRadius.mobile ?? "none"]
            } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
          >
            <Picture>
              <Source
                media="(max-width: 767px)"
                src={srcMobile}
                width={100}
                height={100}
              />
              <Source
                media="(min-width: 768px)"
                src={srcDesktop ? srcDesktop : srcMobile}
                width={272}
                height={327}
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

export type { BorderRadius, IslandBanner, Props };
