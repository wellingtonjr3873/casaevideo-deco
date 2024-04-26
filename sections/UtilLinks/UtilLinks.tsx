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
        "buttonText": "Mínimo de R$39,90*",
        "href": "#",
        "image":
          "https://casaevideonewio.vteximg.com.br/arquivos/icon-card.png",
      },
      {
        "label": "Retire na loja",
        "title": "Retire na loja",
        "buttonText": "Economize o frete",
        "href": "#",
        "image":
          "https://casaevideonewio.vteximg.com.br/arquivos/icon-retire.png",
      },
      {
        "label": "Entrega expressa",
        "title": "Entrega expressa",
        "buttonText": "Em até 24h*",
        "href": "#",
        "image":
          "https://casaevideonewio.vteximg.com.br/arquivos/icon-entrega.png",
      },
      {
        "label": "Chat Online",
        "title": "Chat Online",
        "buttonText": "Podemos ajudar?",
        "href": "#",
        "image":
          "https://casaevideonewio.vteximg.com.br/arquivos/icon-chat.png",
      },
    ],
  } = props;

  return (
    
    <div
      id={id}
      class="lg:flex lg:justify-between p-[24px] lg:p-12 lg:gap-[117px] max-[768px]:gap-[16px] max-[768px]:grid max-[768px]:grid-cols-2"
    >
      {list.map((
        { label, title, href, image, buttonText },
      ) => (
        <a
          href={href}
          class="flex items-center gap-[8px] max-[768px]:flex-wrap"
        >
          {image &&
            (
              <figure class="max-w-[44px] max-h-[44px] lg:h-auto max-[768px]:max-w-[32px] max-[768px]:max-h-[32px] rounded-[6px]">
                <Image
                  class="card w-full rounded-[6px]"
                  src={image}
                  alt={title || label}
                  width={44}
                  height={44}
                  loading="lazy"
                />
              </figure>
            )}

          <div class="flex flex-col items-start">
            <span class="text-base-content text-neutral-900 text-center max-[768px]:small-bold max-[768px]:text-[12px]">
              {title}
            </span>
            <span class="text-base-content text-neutral-900 text-[14px] text-center max-[768px]:text-[12px]">
              {buttonText}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}

export default UtilLinks;
