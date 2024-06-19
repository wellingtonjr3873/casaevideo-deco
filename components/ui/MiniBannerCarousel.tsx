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

/**
 * @titleBy alt
 */
export interface MiniBanner {
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

  /** @description Imagem Desktop */
  desktop: ImageWidget;
  /** @description Imagem Mobile */
  mobile: ImageWidget;
  /** @description Texto ALT da imagem */
  alt: string;
  /** @description Link da imagem */
  href: string;
}

export interface Props {
  arrows?: boolean;
  miniBannerImages?: MiniBanner[];
}

const IMAGES_PROPS = {};

function getCurrentDateTime() {
  const now = new Date();

  return now.toISOString();
}

function BannerItem(
  { image, lcp, id }: { image: MiniBanner; lcp?: boolean; id: string },
) {
  const {
    alt,
    mobile,
    desktop,
  } = image;

  return (
    <a
      id={id}
      href={image.href ?? "#"}
      class="relative h-[auto] overflow-y-hidden w-full max-[768px]:h-[auto]"
    >
      <picture>
        <source
          media="(max-width: 767px)"
          srcset={mobile}
          width={79}
          height={50}
        />
        <source
          media="(min-width: 768px)"
          srcset={desktop}
          width={79}
          height={50}
        />
        <img
          class="object-cover"
          loading={lcp ? "eager" : "lazy"}
          decoding={lcp ? "sync" : "async"}
          src={mobile}
          alt={alt}
        />
      </picture>
    </a>
  );
}

function Dots({ miniBannerImages }: Props) {
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
        {miniBannerImages?.map((image, index) => {
          const dateEndtAt = getCurrentDateTime() >= image.dateStartAt &&
            getCurrentDateTime() <= image.dateEndAt;

          return (
            <>
              {dateEndtAt &&
                (
                  <li class="carousel-item h-[11px] max-[768px]:h-[6px]">
                    <Slider.Dot index={index}>
                      <div class="">
                        <div
                          class="h-[11px] w-[11px] max-[768px]:w-[6px] max-[768px]:h-[6px] border-[2px] max-[768px]:border-[1px] border-[#ED1B2F] rounded-full group-disabled:bg-[#ED1B2F]"                          
                        />
                      </div>
                    </Slider.Dot>
                  </li>
                )}
            </>
          );
        })}
      </ul>
    </>
  );
}

function Buttons() {

  return (
    <>
      <div class="absolute left-0 top-[50%] translate-x-[0] translate-y-[-50%] max-[768px]:hidden xl-b:left-[-40px] flex">
        <Slider.PrevButton class="">
          <Icon
            class="text-base-100"
            size={41}
            id="SliderArrowLeft"
            strokeWidth={0}
          />
        </Slider.PrevButton>
      </div>
      <div class="absolute right-0 top-[50%] translate-x-[0] translate-y-[-50%] max-[768px]:hidden xl-b:right-[-40px] flex">
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

function MiniBannerCarousel(props: Props) {
  const id = useId();
  const { miniBannerImages, spacesCss = "max-[768px]:px-0 md:px-6 xl-b:px-0 my-[8px] mx-[auto] max-[768px]:pl-3", arrows = true } = { ...IMAGES_PROPS, ...props };

  return (
    <>
      <div
        id={id}
        class={`relative max-[768px]:h-[auto] ${spacesCss} container w-full px-4 mx-auto max-w-[1280px] md:px-6 xl-b:px-0`}
      >
        <Slider class="carousel flex flex-row items-center justify-around carousel-center w-full col-span-full row-span-full gap-5 max-w-[1280px] pl-">
          {miniBannerImages?.map((image, index) => {
            const params = { promotion_name: image.alt };
            const dateEndtAt = getCurrentDateTime() >= image.dateStartAt &&
              getCurrentDateTime() <= image.dateEndAt;

            return (
              dateEndtAt &&
              (
                <>
                  {
                    image.preload && (
                      <Head>
                        <link rel="preload" href={image.mobile} as="image" media="(max-width: 767px)" />
                        <link rel="preload" href={image.desktop} as="image" media="(min-width: 768px)" />
                      </Head>
                    )
                  }
                  <Slider.Item index={index} class="carousel-item">
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
              )
            );
          })}
        </Slider>

        {arrows &&
          <Buttons />
        }

        <SliderJS rootId={id} infinite />
      </div>
    </>
  );
}

export default MiniBannerCarousel;
