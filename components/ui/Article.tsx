import Image from "apps/website/components/Image.tsx";
import type { ImageWidget, HTMLWidget } from "apps/admin/widgets.ts";

export interface Props{
    title: string;
    banner: ImageWidget;
    alt: string;
    content: HTMLWidget;
    labelCta: string;
    href: string;
}

export default function Article({title, banner, alt, content, labelCta, href}: Props){

    return(
        <div class={`container w-full lg:w-11/12 max-w-[1280px] p-4 flex flex-col gap-4 lg:px-0 lg:gap-6 lg:flex-row lg:items-center`}>
            <div class={`flex flex-col gap-4 lg:w-1/2`}>
                <h2 class={`text-2xl font-bold text-[#666]`}>{title}</h2>
                <Image class={`rounded-2xl`} src={banner} alt={alt} width={674} height={580} decoding="async" loading="lazy" preload />
            </div>
            <div class={`flex flex-col gap-4 lg:w-1/2`}>
                <div class="text-sm text-[#3f3f40]"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
                <a href={href} class={`font-bold text-xl bg-brand-primary-1 w-max py-2 px-4 rounded-md text-neutral-50`}>
                    <button>
                        {labelCta}
                    </button>
                </a>
            </div>
        </div>
    )
}