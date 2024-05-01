import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { AppContext } from "$store/apps/site.ts";
import type { SectionProps } from "deco/types.ts";
import Form from "deco-sites/casaevideo/islands/Form.tsx";

export interface Banner {
  srcDesktop: ImageWidget;
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
  bannerTop: Banner;
  bannerMid: Banner;
  bannerBottom: Banner;
} 

function LeadForm({
  bannerTop,
  bannerMid,
  bannerBottom,
  device,
}: SectionProps<typeof loader>) {
  console.log('aqui - device', device)

  return (
    <section class="container w-full px-4 mx-auto max-w-[1280px] md:px-6 xl-b:px-0">
      <div class={`grid gap-2 md:gap-2 mt-2`}>
        {bannerTop &&
          <a
            href={bannerTop.href}
            class={`overflow-hidden rounded-lg`}
          >
            <Picture>
              <Source
                media="(max-width: 767px)"
                src={bannerTop.srcMobile}
                width={333}
                height={333}
                fetchPriority="low"
              />
              <Source
                media="(min-width: 768px)"
                src={bannerTop.srcDesktop}
                width={333}
                height={333}
              />
              <img
                class="w-full"
                alt={bannerTop.alt}
                decoding="async"
                loading="lazy"
              />
            </Picture>
          </a>
        }

        {bannerMid &&
          <div style={{ background: `no-repeat url(${bannerMid.srcDesktop})` }} class="min-h-[600px] relative">
            <Form />
          </div>
        }

        {bannerBottom &&
          <a
            href={bannerBottom.href}
            class={`overflow-hidden rounded-lg`}
          >
            <Picture>
              <Source
                media="(max-width: 767px)"
                src={bannerBottom.srcMobile}
                width={333}
                height={333}
                fetchPriority="low"
              />
              <Source
                media="(min-width: 768px)"
                src={bannerBottom.srcDesktop}
                width={333}
                height={333}
              />
              <img
                class="w-full"
                alt={bannerBottom.alt}
                decoding="async"
                loading="lazy"
              />
            </Picture>
          </a>
        }
      </div>
    </section>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default LeadForm;