import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import ProductShelf, {
  Props as ProductShelfProps,
} from "$store/components/product/ProductShelf.tsx";

import { useUser } from "apps/vtex/hooks/useUser.ts";

export interface Props {
  titleComponent: string;
  bluredImage?: {
    mobile: {
      src: ImageWidget;
      alt: string;
    };

    desktop: {
      src: ImageWidget;
      alt: string;
    };
  };
  shelfProps: ProductShelfProps;
}

function HiddenContentLogin({
  titleComponent,
  bluredImage,
  shelfProps,
}: Props) {
  const { user } = useUser();
  const isUserLoggedIn = Boolean(user.value?.email);
  console.log('aqui - isUserLoggedIn', isUserLoggedIn)

  return (
    <section class="max-w-[1280px] my-[48px] mx-[auto] max-[768px]:mx-[16px] max-[768px]:my-[24px]">
      <h5 class="text-[20px] ml-[20px] brand-primary-1 max-[768px]:hidden">
        {titleComponent}
      </h5>
      <div class="">
        {isUserLoggedIn
          ? (
            <>
              <ProductShelf {...shelfProps} />
            </>
          )
          : (
            <>
              {bluredImage && (
                <a href="/login">
                  <Picture>
                    <Source
                      media="(max-width: 768px)"
                      src={bluredImage.mobile.src}
                      width={328}
                      height={312}
                    />
                    <Source
                      media="(min-width: 768px)"
                      src={bluredImage.desktop.src}
                      width={1320}
                      height={491}
                    />
                    <img
                      class="w-full"
                      src={bluredImage.mobile.src}
                      alt={bluredImage.mobile.alt}
                      decoding="async"
                      loading="lazy"
                    />
                  </Picture>
                </a>
              )}
            </>
          )}
      </div>
    </section>
  );
}

export default HiddenContentLogin;
