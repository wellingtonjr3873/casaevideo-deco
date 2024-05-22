import { Section } from "deco/blocks/section.ts";
import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Sections{
  section: Section;
}
export interface Props {
    image: ImageWidget;
    alt?: string;
    text: HTMLWidget;
    ctaText?: string;
    sections: Sections[];
    ctaStyles?: {
      backgroundColor: string,
      color: string,
    }
    ctaPath?: string,
}

export default function NotFoundPage({ image, alt, text, sections, ctaText, ctaStyles = {
  backgroundColor: 'bg-neutral-1',
  color: 'text-neutral-50',
},
ctaPath = '/'}: Props) {

    return (
        <div class={`flex flex-col gap-4 justify-center items-center mt-10`}>
            <div class={`flex flex-col items-center justify-center px-4 gap-5 lg:flex-row`}>
                <Image
                    class=""
                    src={image}
                    alt={alt || "Página de busca não encontrada"}
                    width={270}
                    height={306}
                    loading="eager"
                />
                <div class={`flex flex-col items-center justify-center gap-4`}>
                  <div
                  class="flex flex-col text-center gap-3 notFoundText leading-none lg:text-left"
                  dangerouslySetInnerHTML={{ __html: text }}
                  />
                  <a href={ctaPath} class={`${Object.values(ctaStyles).map(item => item).join(" ")} px-4 py-2.5 flex items-center justify-center max-w-[320px] mx-auto rounded-md w-full`}>
                    <button>{ctaText || "Voltar para a home do site"}</button>
                  </a>
                </div>
            </div>
            {sections &&
              <div class={`w-full`}>
                  {sections.map((sections) => (
                    <sections.section.Component {...sections.section.props} />
                  ))}
              </div>
            }
        </div>
    )
}