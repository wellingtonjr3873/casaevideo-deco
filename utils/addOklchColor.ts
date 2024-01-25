import { removeCharactersFromObjectKey } from "deco-sites/casaevideo/utils/removeCharacterFromObjectKey.ts";

export function addOklchColor(
  theme: Record<string, unknown>,
) {
  const themeColors: Record<string, unknown> = removeCharactersFromObjectKey(
    theme,
    "--",
  );

  Object.keys(themeColors).forEach((key) => {
    themeColors[key] = `oklch(var(--${key}))`;
  });

  return themeColors;
}
