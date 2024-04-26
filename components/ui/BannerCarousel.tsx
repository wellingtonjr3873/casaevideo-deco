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
// import { Picture, Source } from "apps/website/components/Picture.tsx";
import { Head } from "$fresh/runtime.ts";

import { Picture, Source } from "apps/website/components/Picture.tsx";
import { Props as BannerStopWatchProps } from "$store/components/ui/BannerStopwatch.tsx";
import BannerStopWatch from "$store/islands/BannerStopWatch.tsx";
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

  /**
   * @description Marque esta opção quando este banner for a maior imagem na tela para otimizações de imagem
  */
  preload?: boolean;
    /**
   * @format boolean
   * @title É um banner tipo cronometro?
   * @default false
   */
  isStopwatch?: BannerStopWatchProps;
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
  arrows?: boolean;
  bannerImages?: Banner[];
  /**
   * @title Intervalo AutoPlay
   * @description Tempo (em segundos) para iniciar a reprodução automática do carrossel.
   */
  interval?: number;
}

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
    isStopwatch,
    dateEndAt,
  } = image;

  return (
    <a
      id={id}
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class="relative h-[280px] overflow-y-hidden w-full max-[768px]:h-[auto]"
    >
      {isStopwatch && <BannerStopWatch {...isStopwatch} endDateAt={dateEndAt} />}
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          src={mobile}
          width={320}
          height={280}
        />
        <Source
          media="(min-width: 768px)"
          src={desktop}
          width={1280}
          height={280}
        />
        <img
          class="object-cover w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          decoding={lcp ? "sync" : "async"}
          src={mobile}
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

  const filteredImages = bannerImages?.filter(image => {
    const now = getCurrentDateTime();
    return now >= image.dateStartAt && now <= image.dateEndAt;
  });
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
        {filteredImages?.map((image, index) => {
        const dateEndtAt = getCurrentDateTime() >= image.dateStartAt &&
        getCurrentDateTime() <= image.dateEndAt;
            

          return (
            <li class="carousel-item h-[11px] max-[768px]:h-[6px]">
              <Slider.Dot index={index}>
                <div class="">
                  <div
                    class="h-[11px] w-[11px] max-[768px]:w-[6px] max-[768px]:h-[6px] border-[2px] max-[768px]:border-[1px] border-[#ED1B2F] rounded-full group-disabled:bg-[#ED1B2F]"
                    style={{ animationDuration: `${interval}s` }}
                  />
                </div>
              </Slider.Dot>
            </li>
          )
        })}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
      <div class="absolute left-0 top-[50%] translate-x-[0] translate-y-[-50%] max-[768px]:hidden xl-b:left-[-20px]">
        <Slider.PrevButton class="">
          <Icon
            class="text-base-100"
            size={41}
            id="SliderArrowLeft"
            strokeWidth={0}
          />
        </Slider.PrevButton>
      </div>
      <div class="absolute right-0 top-[50%] translate-x-[0] translate-y-[-50%] max-[768px]:hidden xl-b:right-[-20px]">
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


  const { bannerImages, preload, interval, arrows, spacesCss } = { ...props };

  const currentDateTime = getCurrentDateTime();
  const filteredImages = bannerImages?.filter(image =>
    currentDateTime >= image.dateStartAt && currentDateTime <= image.dateEndAt
  );
  
  return (
    <>
      <div
        id={id}
        class="grid grid-cols-[42px_1fr_42px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px] max-w-[1280px] my-[48px] mx-[auto] relative max-[768px]:h-[auto] md:px-6 xl-b:px-0 mt-0"
      >
        <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
          {filteredImages?.map((image, index) => {
            const params = { promotion_name: image.alt };
            return (
              <>
                {
                  image.preload && (
                    <Head>
                      <link rel="preload" href={image.mobile} as="image" media="(max-width: 767px)" />
                      <link rel="preload" href={image.desktop} as="image" media="(min-width: 768px)" />
                    </Head>
                  )
                }
                <Slider.Item index={index} class="carousel-item w-full rounded-lg overflow-hidden">
                  <BannerItem
                    image={image}
                    //LCP Refactor: antes pegava-se index 0 oque acarretava em erros, pois os banners cadastrados no painel que usam exibição/tempo continuam no map de imagens e isso faz com que essa logica de preload não se aplique a imagem LCP, pois o banner LCP poderá ter index 1 visto que o banner de index 0 expirou e não é mais exibido na tela.
                    lcp={image.preload}
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
              </>

            );
          })}
        </Slider>

        {arrows &&
          <Buttons />
        }

        <Dots bannerImages={filteredImages} interval={interval} />

        <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
      </div>
    </>
  );
}


export default BannerCarousel;