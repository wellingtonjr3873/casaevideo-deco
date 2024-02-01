import {
  SendEventOnClick,
  SendEventOnView,
} from "deco-sites/casaevideo/islands/Analytics.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  /**
   * @title Data inicial do banner
   * @format datetime
   */
  dateStartAt: string;
  /**
   * @title Data final do banner
   * @format datetime
   */
  dateEndAt: string;

  /** @description Imagem Desktop */
  desktop: ImageWidget;
  /** @description Imagem Mobile */
  mobile: ImageWidget;
  /** @description Texto ALT da imagem */
  alt: string;

  action?: {
    /** @description Link da imagem */
    href: string;
    /** @description Texto imagem title */
    title: string;
    /** @description Texto imagem subtitle */
    subTitle: string;
    /** @description Texto do botão */
    label: string;
  };
}

export interface Props {
  bannerImages?: Banner[];
  /**
   * @description Marque esta opção quando este banner for a maior imagem na tela para otimizações de imagem
   */
  preload?: boolean;
  /**
   * @title Intervalo AutoPlay
   * @description Tempo (em segundos) para iniciar a reprodução automática do carrossel.
   */
  interval?: number;
}

const IMAGES_PROPS = {
  bannerImages: [
    {
      dateStartAt: "2024-01-27T00:19:00.000Z",
      dateEndAt: "2024-02-20T00:19:00.000Z",
      alt: "/feminino",
      // action: {
      //   href: "https://www.deco.cx/",
      //   label: "deco.cx",
      //   title: "Demo Store",
      //   subTitle: "Visit our site and start building now:",
      // },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3429/44385bd1-23a7-4386-a5da-298dee508438",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3429/7e70cf9b-c19c-46d9-bb0e-b8321482aa49",
    },
    {
      dateStartAt: "2024-01-27T00:19:00.000Z",
      dateEndAt: "2024-02-20T00:19:00.000Z",
      alt: "/feminino",
      // action: {
      //   href: "https://www.deco.cx/",
      //   label: "deco.cx",
      //   title: "Demo Store",
      //   subTitle: "Visit our site and start building now:",
      // },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3429/44385bd1-23a7-4386-a5da-298dee508438",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3429/7e70cf9b-c19c-46d9-bb0e-b8321482aa49",
    },
    {
      dateStartAt: "2024-01-27T00:19:00.000Z",
      dateEndAt: "2024-02-20T00:19:00.000Z",
      alt: "/feminino",
      // action: {
      //   href: "https://www.deco.cx/",
      //   label: "deco.cx",
      //   title: "Demo Store",
      //   subTitle: "Visit our site and start building now:",
      // },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3429/44385bd1-23a7-4386-a5da-298dee508438",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3429/7e70cf9b-c19c-46d9-bb0e-b8321482aa49",
    },
    {
      dateStartAt: "2024-02-20T00:19:00.000Z",
      dateEndAt: "2024-02-29T00:19:00.000Z",
      alt: "/feminino",
      // action: {
      //   href: "https://www.deco.cx/",
      //   label: "deco.cx",
      //   title: "Demo Store",
      //   subTitle: "Visit our site and start building now:",
      // },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3429/44385bd1-23a7-4386-a5da-298dee508438",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3429/7e70cf9b-c19c-46d9-bb0e-b8321482aa49",
    },
  ],
  preload: true,
};

function getCurrentDateTime() {
  const now = new Date();

  return now.toISOString();
}

function BannerItem(
  { image, lcp, id }: { image: Banner; lcp?: boolean; id: string },
) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;

  return (
    <a
      id={id}
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class="relative h-[280px] overflow-y-hidden w-full max-[768px]:h-[auto]"
    >
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={320}
          height={280}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1280}
          height={280}
        />
        <img
          class="object-cover w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
      {action && (
        <div class="absolute h-min top-0 bottom-0 m-auto left-0 right-0 sm:right-auto sm:left-[12%] max-h-min max-w-[400px] flex flex-col gap-4 p-4 rounded glass">
          <span class="text-6xl font-medium text-base-100">
            {action.title}
          </span>
          <span class="font-medium text-xl text-base-100">
            {action.subTitle}
          </span>
          <Button class="glass">{action.label}</Button>
        </div>
      )}
    </a>
  );
}

function Dots({ bannerImages, interval = 0 }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4 h-[11px] absolute bottom-[-18px] left-1/2 max-[768px]:transform -translate-x-1/2">
        {bannerImages?.map((image, index) => {
          const dateEndtAt = getCurrentDateTime() >= image.dateStartAt &&
            getCurrentDateTime() <= image.dateEndAt;
          return (
            <li class="carousel-item h-[11px] max-[768px]:h-[6px]">
              {dateEndtAt &&
                (
                  <Slider.Dot index={index}>
                    <div class="">
                      <div
                        class="h-[11px] w-[11px] max-[768px]:w-[6px] max-[768px]:h-[6px] border border-[2px] max-[768px]:border-[1px] border-[#ED1B2F] rounded-full group-disabled:bg-[#ED1B2F]"
                        style={{ animationDuration: `${interval}s` }}
                      />
                    </div>
                  </Slider.Dot>
                )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
      <div class="absolute left-[-20px] top-[50%] translate-x-[0] translate-y-[-50%] max-[768px]:hidden">
        <Slider.PrevButton class="">
          <Icon
            class="text-base-100"
            size={41}
            id="SliderArrowLeft"
            strokeWidth={0}
          />
        </Slider.PrevButton>
      </div>
      <div class="absolute right-[-20px] top-[50%] translate-x-[0] translate-y-[-50%] max-[768px]:hidden">
        <Slider.NextButton class="">
          <Icon
            class="text-base-100"
            size={41}
            id="SliderArrowRight"
            strokeWidth={0}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCarousel(props: Props) {
  const id = useId();
  const { bannerImages, preload, interval } = { ...IMAGES_PROPS, ...props };

  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px] max-w-[1280px] my-[48px] mx-[auto] relative max-[768px]:h-[auto]"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6 max-[768px]:px-4">
        {bannerImages?.map((image, index) => {
          const params = { promotion_name: image.alt };
          const dateEndtAt = getCurrentDateTime() >= image.dateStartAt &&
            getCurrentDateTime() <= image.dateEndAt;

          return (
            dateEndtAt &&
            (
              <Slider.Item index={index} class="carousel-item w-full">
                <BannerItem
                  image={image}
                  lcp={index === 0 && preload}
                  id={`${id}::${index}`}
                />
                <SendEventOnClick
                  id={`${id}::${index}`}
                  event={{ name: "select_promotion", params }}
                />
                <SendEventOnView
                  id={`${id}::${index}`}
                  event={{ name: "view_promotion", params }}
                />
              </Slider.Item>
            )
          );
        })}
      </Slider>

      <Buttons />

      <Dots bannerImages={bannerImages} interval={interval} />

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default BannerCarousel;
