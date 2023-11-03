import type { Config } from "tailwindcss";

import typography from "@tailwindcss/typography";

const config = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    borderRadius: {
      none: "0",
      sm: "0.5rem",
      DEFAULT: "1rem",
      lg: "2rem",
      full: "9999px"
    },
    colors: {
      text: "rgb(var(--text) / <alpha-value>)",
      background: "rgb(var(--background) / <alpha-value>)",
      primary: "rgb(var(--primary) / <alpha-value>)",
      secondary: "rgb(var(--secondary) / <alpha-value>)",
      accent: "rgb(var(--accent) / <alpha-value>)"
    },
    fontSize: {
      base: "1rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "2rem",
      "3xl": "3rem",
      "4xl": "4rem"
    },
    extend: {
      boxShadow: {
        "glow-sm": "0 0 8px rgba(0, 0, 0, 0.25)",
        glow: "0 0 16px rgba(0, 0, 0, 0.25)"
      },
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
