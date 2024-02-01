import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ImageObject, ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */

interface DotsProps {
  images: ImageObject[];
  aspectRatio: string
}


function Dots({
  images, 
  aspectRatio
}: DotsProps) {
  const id = useId();

  return (
    <div id={id} class="relative">
      <div class="w-full px-10">
        <Slider
          class="carousel carousel-center sm:carousel-end col-span-full row-start-2 row-end-5 gap-4 w-full flex justify-start align-center"
        >
          {images.map((img, index) => (
            <Slider.Item
              index={index} 
              class="carousel-item w-14 flex justify-center align-center"
            >
              <Slider.Dot index={index}>
                <Image
                  style={{ aspectRatio }}
                  class="group-disabled:border-brand-primary-700 group-disabled:border-2 border rounded border-neutral-400"
                  width={57}
                  height={57}
                  src={img.url!}
                  alt={img.alternateName}
                />
              </Slider.Dot>
            </Slider.Item>
          ))}
        </Slider>
      </div>

      <Slider.PrevButton
        class="no-animation absolute left-2 top-1/2 disabled:text-neutral-600 text-brand-primary-700"
        disabled
      >
        <Icon size={24} id="ChevronLeft" strokeWidth={3} />
      </Slider.PrevButton>

      <Slider.NextButton
        class="no-animation absolute right-2 top-1/2 disabled:text-neutral-600 text-brand-primary-700"
        disabled={images.length < 2}
      >
        <Icon size={24} id="ChevronRight" strokeWidth={3} />
      </Slider.NextButton>


      <SliderJS rootId={id} />
    </div>
  )
}

export default function GallerySlider(props: Props) {
  const id = useId();

  if (props.page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } },
    layout: { width, height },
  } = props;
  const aspectRatio = `${width} / ${height}`;

  return (
    <div id={id} class="flex flex-col">
      {/* Image Slider */}
      <div class="relative">
        <Slider class="carousel carousel-center gap-6 w-full">
          {images.map((img, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full"
            >
              <Image
                class="w-full"
                sizes="(max-width: 640px) 100vw, 40vw"
                style={{ aspectRatio }}
                src={img.url!}
                alt={img.alternateName}
                width={width}
                height={height}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </Slider.Item>
          ))}
        </Slider>

        <Slider.PrevButton
          class="no-animation absolute left-2 top-1/2 btn btn-circle btn-outline"
          disabled
        >
          <Icon size={24} id="ChevronLeft" strokeWidth={3} />
        </Slider.PrevButton>

        <Slider.NextButton
          class="no-animation absolute right-2 top-1/2 btn btn-circle btn-outline"
          disabled={images.length < 2}
        >
          <Icon size={24} id="ChevronRight" strokeWidth={3} />
        </Slider.NextButton>

        <div class="absolute top-2 right-2 bg-base-100 rounded-full">
          <ProductImageZoom
            images={images}
            width={700}
            height={Math.trunc(700 * height / width)}
          />
        </div>
      </div>

      <Dots images={images} aspectRatio={aspectRatio} />

      <SliderJS rootId={id} />
    </div>
  );
}
