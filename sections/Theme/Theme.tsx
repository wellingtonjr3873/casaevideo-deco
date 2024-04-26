/**
 * Theme generator inspired by Daisy UI:
 * Copyright (c) 2020 Pouya Saadeghi
 * License: MIT (https://github.com/saadeghi/daisyui/blob/37bca23444bc9e4d304362c14b7088f9a08f1c74/LICENSE)
 * https://github.com/saadeghi/daisyui/blob/37bca23444bc9e4d304362c14b7088f9a08f1c74/src/docs/src/routes/theme-generator.svelte
 */
import SiteTheme from "apps/website/components/Theme.tsx";
import Color from "npm:colorjs.io";
import type {
  BrandColorsPrimary,
  BrandColorsSecondary,
  BrandColorsTerciary,
  Button,
  ComplementaryColors,
  Miscellaneous,
  Props,
  StatusColors,
  Theme,
} from "deco-sites/casaevideo/types/theme_types.ts";
import { DEFAULT_THEME } from "deco-sites/casaevideo/styles/default_theme.ts";
import { removeCharactersFromObjectKey } from "deco-sites/casaevideo/utils/removeCharacterFromObjectKey.ts";

const defaultColors = removeCharactersFromObjectKey(
  DEFAULT_THEME,
  "--",
) as unknown as Theme;

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
    try {
      const [l, c, h] = new Color(color)?.oklch;

      return `${(l * 100).toFixed(0)}% ${c.toFixed(2)} ${
        (h || 0).toFixed(0)
      }deg`;
    } catch {
      return "#FFFFFF";
    }
  };

  const colorsObject = Object.keys(defaultColors).reduce((obj, key) => {
    obj[`--${key}`] = t[key as keyof Theme] || "#FFFFFF";
    return obj;
  }, {} as Record<string, string>);

  const colors = Object.entries(colorsObject).map(([key, color]) => {
    if (typeof color !== "string") [key, toValue("#FFFFFF")];

    return [key, toValue(color)] as [string, string];
  });

  return [...colors, ...colors];
};

/**
 * This section merges the DESIGN_SYTEM variable with incoming props into a css sheet with variables, i.e.
 * this function transforms props into
 *
 * :root {
 *   --color-primary: #ffffffFFF;
 *   --color-secondary: "#461616"
 * }
 */

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
      "Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
    ],
  ]
    .map(([name, value]) => ({ name, value }));

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

export {
  BrandColorsPrimary,
  BrandColorsSecondary,
  BrandColorsTerciary,
  Button,
  ComplementaryColors,
  Miscellaneous,
  Props,
  StatusColors,
  Theme,
};

export default Section;
