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
      sm: "0.75rem",
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
      zIndex: {
        top: "9999"
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: false,
            pre: false,
            code: false,
            "pre code": false,
            "--tw-prose-body": "rgb(var(--text))",
            "--tw-prose-headings": "rgb(var(--text))",
            "--tw-prose-lead": "rgb(var(--text))",
            "--tw-prose-links": "rgb(var(--accent))",
            "--tw-prose-bold": "rgb(var(--text))",
            "--tw-prose-counters": "rgb(var(--primary))",
            "--tw-prose-bullets": "rgb(var(--primary))",
            "--tw-prose-hr": "rgb(var(--text) / 50%)",
            "--tw-prose-quotes": "rgb(var(--primary))",
            "--tw-prose-quote-borders": "rgb(var(--primary) / 50%)",
            "--tw-prose-captions": "rgb(var(--text))",
            "--tw-prose-kbd": "rgb(var(--text))",
            "--tw-prose-kbd-shadows": "rgb(var(--secondary))",
            "--tw-prose-th-borders": "rgb(var(--text) / 50%)",
            "--tw-prose-td-borders": "rgb(var(--text) / 50%)"
          }
        }
      }
    }
  },

  plugins: [typography]
} satisfies Config;

export default config;
