import type { Config } from "tailwindcss";

import typography from "@tailwindcss/typography";

const config = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    colors: {
      text: "rgb(var(--text) / <alpha-value>)",
      background: "rgb(var(--background) / <alpha-value>)",
      primary: "rgb(var(--primary) / <alpha-value>)",
      secondary: "rgb(var(--secondary) / <alpha-value>)",
      accent: "rgb(var(--accent) / <alpha-value>)"
    },
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

  plugins: [typography]
} satisfies Config;

export default config;
