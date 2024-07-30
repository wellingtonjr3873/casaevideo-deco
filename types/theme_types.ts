import { Font } from "apps/website/components/Theme.tsx";

export interface BrandColorsPrimary {
  /** @format color */
  "brand-primary-1": string;
  /** @format color */
  "brand-primary-900"?: string;
  /** @format color */
  "brand-primary-800"?: string;
  /** @format color */
  "brand-primary-700"?: string;
  /** @format color */
  "brand-primary-600"?: string;
  /** @format color */
  "brand-primary-500"?: string;
  /** @format color */
  "brand-primary-400"?: string;
  /** @format color */
  "brand-primary-300"?: string;
  /** @format color */
  "brand-primary-200"?: string;
  /** @format color */
  "brand-primary-100"?: string;
  /** @format color */
  "brand-primary-50"?: string;
}

export interface BrandColorsSecondary {
  /** @format color */
  "brand-secondary-1"?: string;
  /** @format color */
  "brand-secondary-900"?: string;
  /** @format color */
  "brand-secondary-800"?: string;
  /** @format color */
  "brand-secondary-700"?: string;
  /** @format color */
  "brand-secondary-600"?: string;
  /** @format color */
  "brand-secondary-500"?: string;
  /** @format color */
  "brand-secondary-400"?: string;
  /** @format color */
  "brand-secondary-300"?: string;
  /** @format color */
  "brand-secondary-200"?: string;
  /** @format color */
  "brand-secondary-100"?: string;
  /** @format color */
  "brand-secondary-50"?: string;
}

export interface BrandColorsTerciary {
  /** @format color */
  "brand-terciary-1"?: string;
  /** @format color */
  "brand-terciary-base"?: string;
}

export interface ComplementaryColors {
  /** @format color */
  "complementary-1"?: string;
  /** @format color */
  "complementary-2"?: string;
  /** @format color */
  "complementary-3"?: string;
  /** @format color */
  "complementary-4"?: string;
}

export interface StatusColors {
  /** @format color */
  "success"?: string;
  /** @format color */
  "success-light"?: string;
  /** @format color */
  "information"?: string;
  /** @format color */
  "information-light"?: string;
  /** @format color */
  "warning"?: string;
  /** @format color */
  "warning-light"?: string;
  /** @format color */
  "warning-dark"?: string;
  /** @format color */
  "error"?: string;
  /** @format color */
  "error-light"?: string;
}

export interface Button {
  /**
   * @default 1px
   * @title Border width
   */
  "--border-btn": "1px" | "2px" | "3px" | "4px" | "5px" | "6px" | "7px" | "8px";
  /**
   * @default 0.2rem
   * @title Radius
   * @description Button and similar elements
   */
  "--rounded-btn": "0" | "0.2rem" | "0.4rem" | "0.8rem" | "2rem";
  /**
   * @default 0.95
   * @title Scale on click
   */
  "--btn-focus-scale": "0.9" | "0.95" | "1" | "1.05" | "1.1";
  /**
   * @default 0.25s
   * @title Animation
   * @description Duration when you click
   */
  "--animation-btn": "0.1s" | "0.15s" | "0.2s" | "0.25s" | "0.3s" | "0.35s";
}

export interface Miscellaneous {
  /**
   * @default 1rem
   * @title Rounded box
   * @description border radius rounded-box utility class, used in card and other large boxes
   */
  "--rounded-box": string;
  /**
   * @default 1.9rem
   * @title Rounded badge
   * @description border radius rounded-badge utility class, used in badges and similar
   */
  "--rounded-badge": string;
  /**
   * @default 0.2s
   * @title Animation input
   * @description duration of animation for inputs like checkbox, toggle, radio, etc
   */
  "--animation-input": string;
  /**
   * @default 1px
   * @title Tab border
   * @description border width of tabs
   */
  "--tab-border": string;
  /**
   * @default 0.5rem
   * @title Tab radius
   * @description border radius of tabs
   */
  "--tab-radius": string;
}

export interface LocalColors {
  /** @format color */
  "color-header"?: string;
}

export interface Props {
  brandColorsPrimary?: BrandColorsPrimary;
  brandColorsSecondary?: BrandColorsSecondary;
  brandColorsTerciary?: BrandColorsTerciary;
  statusColors?: StatusColors;
  complementaryColors?: ComplementaryColors;
  neutralColors?: NeutralColors;
  localColors: LocalColors/
  font?: Font;
  colorScheme?: "light" | "dark";
}

interface NeutralColors {
  /** @format color */
  "neutral-900"?: string;
  /** @format color */
  "neutral-800"?: string;
  /** @format color */
  "neutral-700"?: string;
  /** @format color */
  "neutral-600"?: string;
  /** @format color */
  "neutral-500"?: string;
  /** @format color */
  "neutral-400"?: string;
  /** @format color */
  "neutral-300"?: string;
  /** @format color */
  "neutral-200"?: string;
  /** @format color */
  "neutral-100"?: string;
  /** @format color */
  "neutral-50"?: string;
  /** @format color */
  "neutral-1"?: string;
  /** @format color */
  "neutral-0"?: string;
  /** @format color */
  "neutral-dark"?: string;
}

export type Theme =
  & ComplementaryColors
  & BrandColorsPrimary
  & BrandColorsSecondary
  & BrandColorsTerciary
  & StatusColors
  & NeutralColors;
