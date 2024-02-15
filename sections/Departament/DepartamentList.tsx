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
  return (<>
      <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
        <Slider.PrevButton class="btn btn-circle border-none shadow-none right-1/2 absolute top-[-30px]">
          <Icon
            class="text-base-100"
            size={33}
            id="SliderArrowLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
        <Slider.NextButton class="btn btn-circle border-none shadow-none left-1/2 absolute top-[-30px]">
          <Icon
            class="text-base-100"
            size={33}
            id="SliderArrowRight"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    
    </>
  );
}

function DepartamentList(props: Props) {
  const id = useId();
  const {
    list = [],
  } = props;

  return (
    <div class="w-full container pl-4 sm:pl-0 py-8 flex flex-col gap-2 lg:py-10 max-w-[1280px] md:px-6 xl-b:px-0">
      <div
        id={id}
        class="container grid grid-cols-[33px_1fr_33px] px-0"
      >
        <Slider class="carousel carousel-center sm:carousel-end  col-span-full   max-w-none  carousel-start gap-4 lg:gap-8 row-start-2 row-end-5 min-h-[100px]">
          {list.map((
            { tag, label, description, href, image },
            index,
          ) => (
            <Slider.Item
              index={index}
              class="flex flex-col gap-[16px] carousel-item first:pl-4 sm:first:pl-0 last:pr-4 sm:last:pr-0 lg:w-[100px] w-[72px]"
            >
              <a
                href={href}
                class="flex flex-col gap-[8px] lg:w-[100px]  max-[768px]:max-w-[72px]"
              >
                {image &&
                  (
                    <figure class="max-w-[100px] max-h-[100px] lg:h-auto max-[768px]:max-w-[72px] max-[768px]:max-h-[72px]">
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
                  (
                    <span class="text-base-content text-center small-regular">
                      {description}
                    </span>
                  )}
              </a>
            </Slider.Item>
          ))}
        </Slider>
          <ButtonsDepartamentSlider />
          <SliderJS rootId={id} />
      </div>
    </div>
  );
}

export default DepartamentList;
