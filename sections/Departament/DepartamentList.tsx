import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Category {
  tag?: string;
  label: string;
  description?: string;
  href?: string;
  image?: ImageWidget;
  buttonText?: string;
}

export interface Props {
  list?: Category[];
}

function ButtonsDepartamentSlider() {
  return (
    <div class="absolute w-full h-full flex items-center justify-between max-[600px]:hidden max-h-[100px]">
      <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton class="btn btn-circle glass right-1/2">
          <Icon
            class="text-base-100"
            size={33}
            id="sliderArrowLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton class="btn btn-circle glass left-1/2">
          <Icon
            class="text-base-100"
            size={33}
            id="sliderArrowRight"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    </div>
  );
}

function DepartamentList(props: Props) {
  const id = useId();
  const {
    list = [
      {
        tag: "10% off",
        label: "Feminino",
        description: "Moda feminina direto de Milão",
        href: "/feminino",
        image:
          "https://ik.imagekit.io/decocx/tr:w-680,h-680/https:/ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/fdcb3c8f-d629-485e-bf70-8060bd8a9f65",
        buttonText: "Ver produtos",
      },
    ],
  } = props;

  return (
    <div
      id={id}
      class="container py-8 flex flex-col gap-8 lg:gap-10 text-base-content  lg:py-10 relative "
    >
      <Slider class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5 min-h-[100px]">
        {list.map((
          { tag, label, description, href, image },
          index,
        ) => (
          <Slider.Item
            index={index}
            class="flex flex-col gap-[16px] carousel-item first:pl-4 sm:first:pl-0 last:pr-4 sm:last:pr-0"
          >
            <a
              href={href}
              class="flex flex-col gap-[8px] lg:w-[100px] w-40 max-[600px]:max-w-[72px]"
            >
              {image &&
                (
                  <figure class="max-w-[100px] max-h-[100px] lg:h-auto max-[600px]:max-w-[72px] max-[600px]:max-h-[72px]">
                    <Image
                      class="card w-full"
                      src={image}
                      alt={description || label || tag}
                      width={100}
                      height={100}
                      loading="lazy"
                    />
                  </figure>
                )}
                {description && 
                  <span class="text-base-content text-center" >
                    {description}
                  </span>
                }
            </a>
          </Slider.Item>
        ))}
      </Slider>
      <ButtonsDepartamentSlider />
      <SliderJS rootId={id} />
    </div>
  );
}

export default DepartamentList;
