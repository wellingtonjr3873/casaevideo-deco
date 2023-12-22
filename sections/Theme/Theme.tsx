/**
 * Theme generator inspired by Daisy UI:
 * Copyright (c) 2020 Pouya Saadeghi
 * License: MIT (https://github.com/saadeghi/daisyui/blob/37bca23444bc9e4d304362c14b7088f9a08f1c74/LICENSE)
 * https://github.com/saadeghi/daisyui/blob/37bca23444bc9e4d304362c14b7088f9a08f1c74/src/docs/src/routes/theme-generator.svelte
 */
import SiteTheme, { Font } from "apps/website/components/Theme.tsx";
import Color from "npm:colorjs.io";

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

export interface ThemeColors {
  /** @format color */
  "brand-primary-1"?: string;
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

  /** @format color */
  "brand-terciary-1"?: string;

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
  /** @format color */
  "complementary-1"?: string;
  /** @format color */
  "complementary-2"?: string;
  /** @format color */
  "complementary-3"?: string;
  /** @format color */
  "complementary-4"?: string;
}

// export interface ComplementaryColors {
//   /** @format color */
//   "base-200"?: string;
//   /** @format color */
//   "base-300"?: string;
//   /** @format color */
//   "base-content"?: string;
//   /** @format color */
//   "primary-content"?: string;
//   /** @format color */
//   "secondary-content"?: string;
//   /**
//    * @title Accent Content
//    * @format color */
//   "tertiary-content"?: string;
//   /** @format color */
//   "neutral-content"?: string;
//   /** @format color */
//   "success-content"?: string;
//   /** @format color */
//   "warning-content"?: string;
//   /** @format color */
//   "error-content"?: string;
//   /** @format color */
//   "info-content"?: string;
// }

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

export interface Props {
  brandColorsPrimary: BrandColorsPrimary;
  brandColorsSecondary: BrandColorsSecondary;
  brandColorsTerciary: BrandColorsTerciary;
  statusColors: StatusColors;
  complementaryColors?: ComplementaryColors;
  neutralColors?: NeutralColors;
  font?: Font;
  colorScheme: "light" | "dark";
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
}

type Theme =
  & ComplementaryColors
  & BrandColorsPrimary
  & BrandColorsSecondary
  & BrandColorsTerciary
  & StatusColors
  & NeutralColors;

const darken = (color: string, percentage: number) =>
  new Color(color).darken(percentage);

const isDark = (c: Color) =>
  c.contrast("black", "WCAG21") < c.contrast("white", "WCAG21");

const contrasted = (color: string, percentage = 0.8) => {
  const c = new Color(color);

  return isDark(c) ? c.mix("white", percentage) : c.mix("black", percentage);
};

const toVariables = (
  t: Theme,
): [string, string][] => {
  const toValue = (color: string | ReturnType<typeof darken>) => {
    const [l, c, h] = new Color(color).oklch;

    return `${(l * 100).toFixed(0)}% ${c.toFixed(2)} ${(h || 0).toFixed(0)}deg`;
  };
  const colors = Object.entries({
    "--brand-primary-1": t["brand-primary-1"],
    "--brand-primary-900": t["brand-primary-900"],
    "--brand-primary-800": t["brand-primary-800"],
    "--brand-primary-700": t["brand-primary-700"],
    "--brand-primary-600": t["brand-primary-600"],
    "--brand-primary-500": t["brand-primary-500"],
    "--brand-primary-400": t["brand-primary-400"],
    "--brand-primary-300": t["brand-primary-300"],
    "--brand-primary-200": t["brand-primary-200"],
    "--brand-primary-100": t["brand-primary-100"],
    "--brand-primary-50": t["brand-primary-50"],
    "--brand-secondary-1": t["brand-secondary-1"],
    "--brand-secondary-900": t["brand-secondary-900"],
    "--brand-secondary-800": t["brand-secondary-800"],
    "--brand-secondary-700": t["brand-secondary-700"],
    "--brand-secondary-600": t["brand-secondary-600"],
    "--brand-secondary-500": t["brand-secondary-500"],
    "--brand-secondary-400": t["brand-secondary-400"],
    "--brand-secondary-300": t["brand-secondary-300"],
    "--brand-secondary-200": t["brand-secondary-200"],
    "--brand-secondary-100": t["brand-secondary-100"],
    "--brand-secondary-50": t["brand-secondary-50"],
    "--brand-terciary-1": t["brand-terciary-1"],
    "--neutral-900": t["neutral-900"],
    "--neutral-800": t["neutral-800"],
    "--neutral-700": t["neutral-700"],
    "--neutral-600": t["neutral-600"],
    "--neutral-500": t["neutral-500"],
    "--neutral-400": t["neutral-400"],
    "--neutral-300": t["neutral-300"],
    "--neutral-200": t["neutral-200"],
    "--neutral-100": t["neutral-100"],
    "--neutral-50": t["neutral-50"],
    "--neutral-1": t["neutral-1"],
    "--su": t["success"],
    "--success-light": t["success-light"],
    "--information": t["information"],
    "--information-light": t["information-light"],
    "--warning": t["warning"],
    "--warning-light": t["warning-light"],
    "--warning-dark": t["warning-dark"],
    "--er": t["error"],
    "--error-light": t["error-light"],
    "--complementary-1": t["complementary-1"],
    "--complementary-2": t["complementary-2"],
    "--complementary-3": t["complementary-3"],
    "--complementary-4": t["complementary-4"],
  }).map(([key, color]) => [key, toValue(color)] as [string, string]);

  const colorVariables = Object.entries(t).map(([key, color]) =>
    [key, toValue(color)] as [string, string]
  );
  return [...colors, ...colorVariables];
};

/**
 * This section merges the DESIGN_SYTEM variable with incoming props into a css sheet with variables, i.e.
 * this function transforms props into
 *
 * :root {
 *   --color-primary: #FFFFFF;
 *   --color-secondary: "#461616"
 * }
 */

const defaultColors = {
  "brand-primary-1": "#FFF",
  "brand-primary-900": "#FFF",
  "brand-primary-800": "#FFF",
  "brand-primary-700": "#FFF",
  "brand-primary-600": "#FFF",
  "brand-primary-500": "#FFF",
  "brand-primary-400": "#FFF",
  "brand-primary-300": "#FFF",
  "brand-primary-200": "#FFF",
  "brand-primary-100": "#FFF",
  "brand-primary-50": "#FFF",
  "brand-secondary-1": "#FFF",
  "brand-secondary-900": "#FFF",
  "brand-secondary-800": "#FFF",
  "brand-secondary-700": "#FFF",
  "brand-secondary-600": "#FFF",
  "brand-secondary-500": "#FFF",
  "brand-secondary-400": "#FFF",
  "brand-secondary-300": "#FFF",
  "brand-secondary-200": "#FFF",
  "brand-secondary-100": "#FFF",
  "brand-secondary-50": "#FFF",
  "brand-terciary-1": "#FFF",
  "neutral-900": "white",
  "neutral-800": "white",
  "neutral-700": "white",
  "neutral-600": "white",
  "neutral-500": "white",
  "neutral-400": "white",
  "neutral-300": "white",
  "neutral-200": "white",
  "neutral-100": "white",
  "neutral-50": "white",
  "neutral-1": "white",
  "success": "#FFF",
  "success-light": "#FFF",
  "information": "#FFF",
  "information-light": "#FFF",
  "warning": "#FFF",
  "warning-light": "#FFF",
  "warning-dark": "#FFF",
  "error": "#FFF",
  "error-light": "#FFF",
  "complementary-1": "#FFF",
  "complementary-2": "#FFF",
  "complementary-3": "#FFF",
  "complementary-4": "#FFF",
};
function Section({
  complementaryColors,
  font,
  statusColors,
  brandColorsPrimary,
  brandColorsSecondary,
  brandColorsTerciary,
  colorScheme,
}: Props) {
  const theme = {
    ...defaultColors,
    ...statusColors,
    ...complementaryColors,
    ...brandColorsPrimary,
    ...brandColorsSecondary,
    ...brandColorsTerciary,
  };
  const variables = [
    ...toVariables(theme),
    [
      "--font-family",
      font?.family ||
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
    ],
  ]
    .map(([name, value]) => ({ name, value }));

  console.log(variables, "variables");

  return (
    <SiteTheme
      fonts={font ? [font] : undefined}
      variables={variables}
      colorScheme={colorScheme}
    />
  );
}

export function Preview(props: Props) {
  return (
    <>
      <Section {...props} />
      <div class="grid grid-flow-row md:grid-flow-col">
        <div class="flex flex-col">
          <h2>Brand primary colors</h2>
          <div class="flex flex-row flex-wrap gap-[16px]">
            <div class="h-[50px] w-[150px] bg-brand-primary-1">
              <p>Brand primary 1</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-primary-900">
              <p>Brand primary 900</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-primary-800">
              <p>Brand primary 800</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-primary-700">
              <p>Brand primary 700</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-primary-600">
              <p>Brand primary 600</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-primary-500">
              <p>Brand primary 500</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-primary-400">
              <p>Brand primary 400</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-primary-300">
              <p>Brand primary 300</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-primary-200">
              <p>Brand primary 200</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-primary-100">
              <p>Brand primary 100</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-primary-50">
              <p>Brand primary 50</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <h2>Brand secondary colors</h2>
          <div class="flex flex-row flex-wrap gap-[16px]">
            <div class="h-[50px] w-[150px] bg-brand-secondary-1">
              <p>Brand secondary 1</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-secondary-900">
              <p>Brand secondary 900</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-secondary-800">
              <p>Brand secondary 800</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-secondary-700">
              <p>Brand secondary 700</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-secondary-600">
              <p>Brand secondary 600</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-secondary-500">
              <p>Brand secondary 500</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-secondary-400">
              <p>Brand secondary 400</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-secondary-300">
              <p>Brand secondary 300</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-secondary-200">
              <p>Brand secondary 200</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-secondary-100">
              <p>Brand secondary 100</p>
            </div>
            <div class="h-[50px] w-[150px] bg-brand-secondary-50">
              <p>Brand secondary 50</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <h2>Brand terciary colors</h2>
          <div class="flex flex-wrap flex-row gap-[16px]">
            <div class="h-[50px] w-[150px] bg-brand-terciary-1">
              <p>brand terciary 1</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <h2>Complementary colors</h2>
          <div class="flex flex-row flex-wrap gap-[16px]">
            <div class="h-[50px] w-[150px] bg-complementary-1">
              <p>Complementary-1</p>
            </div>
            <div class="h-[50px] w-[150px] bg-complementary-2">
              <p>Complementary-2</p>
            </div>
            <div class="h-[50px] w-[150px] bg-complementary-3">
              <p>Complementary-3</p>
            </div>
            <div class="h-[50px] w-[150px] bg-complementary-1">
              <p>Complementary-4</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <h2>Status colors</h2>
          <div class="flex flex-row flex-wrap gap-[16px]">
            <div class="h-[50px] w-[150px] bg-success-light">
              <p>Status color success-light</p>
            </div>
            <div class="h-[50px] w-[150px] bg-success">
              <p>Status color success</p>
            </div>

            <div class="h-[50px] w-[150px] bg-information-light">
              <p>Status color information-light</p>
            </div>
            <div class="h-[50px] w-[150px] bg-information">
              <p>Status color information</p>
            </div>
            <div class="h-[50px] w-[150px] bg-warning-light">
              <p>Status color warning-light</p>
            </div>
            <div class="h-[50px] w-[150px] bg-warning-light">
              <p>Status color warning</p>
            </div>
            <div class="h-[50px] w-[150px] bg-warning-dark">
              <p>Status color warning-dark</p>
            </div>
            <div class="h-[50px] w-[150px] bg-error">
              <p>Status color error</p>
            </div>
            <div class="h-[50px] w-[150px] bg-error-light">
              <p>Status color error-light</p>
            </div>
          </div>
        </div>
      </div>
      {props.font?.family && (
        <div class="text-center py-2">
          Font: {props.font.family}
        </div>
      )}
    </>
  );
}

export default Section;
