import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Category {
  label: string;
  title?: string;
  href?: string;
  image?: ImageWidget;
  buttonText?: string;
}

export interface Props {
  list?: Category[];
}

function UtilLinks(props: Props) {
  const id = useId();
  const {
    list = [
      {
        "label": "Parcele em até 10x",
        "title": "Parcele em até 10x",
        "buttonText": "Ver regras",
        "href": "#",
        "image": "https://casaevideonewio.vteximg.com.br/arquivos/icon-card.png"
      },   
      {
        "label": "Retire na loja",
        "title": "Retire na loja",
        "buttonText": "Ver regras",
        "href": "#",
        "image": "https://casaevideonewio.vteximg.com.br/arquivos/icon-retire.png"
      },   
      {
        "label": "Entrega em até 24 horas*",
        "title": "Entrega em até 24 horas*",
        "buttonText": "Ver regras",
        "href": "#",
        "image": "https://casaevideonewio.vteximg.com.br/arquivos/icon-entrega.png"
      },   
      {
        "label": "Parcele em até 10x",
        "title": "Parcele em até 10x",
        "buttonText": "Como podemos ajudar?",
        "href": "#",
        "image": "https://casaevideonewio.vteximg.com.br/arquivos/icon-chat.png"
      }
    ],
  } = props;

  return (
    <div
      id={id}
      class="lg:flex lg:justify-center p-[24px] lg:py-10 lg:gap-[117px] max-[600px]:gap-[22px] max-[600px]:grid max-[600px]:grid-cols-2"
    >
      {list.map((
        { label, title, href, image, buttonText }
      ) => (
        <a
          href={href}
          class="flex items-center gap-[8px] max-[600px]:flex-wrap"
        >
          {image &&
            (
              <figure class="max-w-[44px] max-h-[44px] lg:h-auto max-[600px]:max-w-[32px] max-[600px]:max-h-[32px] rounded-[6px]">
                <Image
                  class="card w-full rounded-[6px]"
                  src={image}
                  alt={title || label}
                  width={44}
                  height={44}
                  loading="lazy"
                />
              </figure>
            )
          }

          <div class="flex flex-col items-start">
            <span class="text-base-content text-center max-[600px]:text-[12px]">
              {title}
            </span>
            <span class="text-base-content text-center underline max-[600px]:text-[12px]">
              {buttonText}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}

export default UtilLinks;
