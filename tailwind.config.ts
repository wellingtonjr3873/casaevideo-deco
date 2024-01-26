import daisyui from "daisyui";
import { DEFAULT_THEME } from "./styles/default_theme.ts";
import { addOklchColor } from "./utils/addOklchColor.ts";

export default {
  plugins: [daisyui],
  daisyui: {
    themes: [{
      light: DEFAULT_THEME,
    }],
    logs: false,
  },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    colors: {
      ...addOklchColor(DEFAULT_THEME),
      neutral: {
        900: "oklch(var(--neutral-900))",
      },
      black: "black",
    },
  },
};
