import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { AppContext } from "$store/apps/site.ts";
import type { SectionProps } from "deco/types.ts";
import Form from "deco-sites/casaevideo/islands/Form.tsx";

export interface Banner {
  srcDesktop: ImageWidget;
  /**
* @description Largura original do banner Desktop
*/
  widthDesk: number;
  /**
 * @description Altura original do banner Desktop
 */
  heightDesk: number;
  srcMobile: ImageWidget;
  /**
 * @description Largura original do banner Mobile
 */
  widthMob: number;
  /**
 * @description Altura original do banner Mobile
 */
  heightMob: number;
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
  /**
 * @description Nome da campanha do Form
 */
  campaing?: string;
  /**
 * @description Id da tabela do masterdata
 */
  tabelaMd: string;
  /**
* @description Banner Topo
*/
  bannerTop: Banner;
  /**
* @description Banner meio
*/
  bannerMid: Banner;
  /**
* @description Banner inferior
*/
  bannerBottom: Banner;
}

function LeadForm({
  campaing,
  tabelaMd,
  bannerTop,
  bannerMid,
  bannerBottom,
  device,
}: SectionProps<typeof loader>) {

  return (
    <section class="container w-full px-0 mx-auto max-w-[1280px] md:px-6 xl-b:px-0">
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
                width={bannerTop.widthDesk ?? ""}
                height={bannerTop.heightDesk ?? ""}
                fetchPriority="low"
              />
              <Source
                media="(min-width: 768px)"
                src={bannerTop.srcDesktop}
                width={bannerTop.widthMob ?? ""}
                height={bannerTop.heightMob ?? ""}
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
          <div style={{ background: `no-repeat url(${device == "mobile" ? bannerMid.srcMobile : bannerMid.srcDesktop})` }} class="min-h-[600px] relative mb-[340px] md:mb-0 md:px-0">
            <Form campaing={campaing} tabelaMd={tabelaMd} />
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
                width={bannerBottom.widthDesk}
                height={bannerBottom.heightDesk}
                fetchPriority="low"
              />
              <Source
                media="(min-width: 768px)"
                src={bannerBottom.srcDesktop}
                width={bannerBottom.widthMob}
                height={bannerBottom.heightMob}
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