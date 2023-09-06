import { join } from "path";
import type { Config } from "tailwindcss";

import typography from "@tailwindcss/typography";
import { skeleton } from "@skeletonlabs/tw-plugin";

import { rosePineMoonTheme } from "./rose-pine-moon";

const config = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    join(require.resolve("@skeletonlabs/skeleton"), "../**/*.{html,js,svelte,ts}")
  ],

  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            pre: false,
            code: false,
            "pre code": false
          }
        }
      }
    }
  },

  plugins: [
    typography,
    skeleton({
      themes: {
        custom: [rosePineMoonTheme]
      }
    })
  ]
} satisfies Config;

export default config;
