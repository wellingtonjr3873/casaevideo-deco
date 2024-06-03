import { Head } from "$fresh/runtime.ts";
import type { JSX } from "preact";
import { forwardRef } from "preact/compat";
import * as Sentry from "@sentry/react";

export type Props =
  & Omit<
    JSX.IntrinsicElements["img"],
    "width" | "height" | "preload"
  >
  & {
    src: string;
    /** @description Improves Web Vitals (CLS|LCP) */
    width: number;
    /** @description Improves Web Vitals (CLS|LCP) */
    height?: number;
    /** @description Web Vitals (LCP). Adds a link[rel="preload"] tag in head. Use one preload per page for better performance */
    preload?: boolean;
    /** @description Improves Web Vitals (LCP). Use high for LCP image. Auto for other images */
    fetchPriority?: "high" | "low" | "auto";
  };

const Image = forwardRef<HTMLImageElement, Props>((props, ref) => {
  const { preload, loading = "lazy" } = props;

  if (!props.height) {
    console.warn(
      `Missing height. This image will NOT be optimized: ${props.src}`,
    );

    Sentry.withScope((scope) => {
      scope.setExtra('scrollLeft', props.src);
      Sentry.captureException("Missing height. This image will NOT be optimized")
    });
  }

  const linkProps = {
    imagesrcset: props.src,
    imagesizes: props.sizes,
    fetchpriority: props.fetchPriority,
    media: props.media,
  };

  return (
    <>
      {preload && (
        <Head>
          <link as="image" rel="preload" href={props.src} {...linkProps} />
        </Head>
      )}
      <img
        {...props}
        data-fresh-disable-lock={true}
        preload={undefined}
        src={props.src}
        loading={loading}
        ref={ref}
      />
    </>
  );
});

export default Image;
