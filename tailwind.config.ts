import type { Config } from "tailwindcss";

import typography from "@tailwindcss/typography";

const config = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],

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

  colors: {
    text: "var(--text)",
    background: "var(--background)",
    primary: "var(--primary)",
    secondary: "var(--secondary)",
    accent: "var(--accent)"
  },

  plugins: [typography]
} satisfies Config;

export default config;
