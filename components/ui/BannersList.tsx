import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

interface Card {
    banner: ImageWidget;
    alt: string;
    label: string;
    href: string;
}

export interface Props {
    cards: Card[];
}

export default function BannersList({ cards }: Props) {

    return (
        <div class={`container lg:w-11/12 pl-4 w-full flex overflow-x-scroll pb-6 lg:pl-0 lg:overflow-x-hidden max-w-[1280px]`}>
            <ul class={`flex gap-4 items-center lg:w-full lg:justify-between`}>
                {cards.map(({ banner, label, href, alt }) => {
                    return (
                        <>
                            <li class={`min-w-[156px] last:mr-4 lg:last:mr-0`}>
                                <a href={href} class={`flex flex-col gap-4 items-center w-full`}>
                                    <Image src={banner} alt={alt} width={156} height={112} decoding="async" loading="lazy" preload />
                                    <h2 class={`font-bold text-sm underline`}>{label}</h2>
                                </a>
                            </li>
                        </>
                    )
                })}
            </ul>
        </div>
    )
}