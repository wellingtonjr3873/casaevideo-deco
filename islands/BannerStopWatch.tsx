import Component from "$store/components/ui/BannerStopwatch.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

export type Props = {
    endDateAt?: string
    /** @description Imagem Desktop */
    desktop: ImageWidget;
    /** @description Imagem Mobile */
    mobile: ImageWidget;
    position: "base-left" | "top-left" | "top-right" | "base-center" | "base-right",
    /** @format color */
    textColor?: string;
    /** @format color */
    backgroundColor?: string;
}

function Island(props: Props) {
  return <Component {...props} />;
}

export default Island;
