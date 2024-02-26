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
      black: "black",
    },
    extend: {
      colors: {
        neutral: {
          900: "oklch(var(--neutral-900))",
          50: "oklch(var(--neutral-50))",
          100: "oklch(var(--neutral-100))",
        },
        success: "oklch(var(--success))",
      },
      screens: {
        'xl-b': '1366px',
      },
    },
  },
};
