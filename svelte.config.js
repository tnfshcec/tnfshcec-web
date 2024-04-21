import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";

import sequence from "svelte-sequential-preprocessor";
import { preprocessMeltUI } from "@melt-ui/pp";

const dev = process.argv.includes("dev");
const base = dev ? "" : process.env.BASE_PATH ?? "";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...mdsvexConfig.extensions],

  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: sequence([mdsvex(mdsvexConfig), vitePreprocess(), preprocessMeltUI()]),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    paths: {
      base,
      relative: false
    },
    alias: {
      $paraglide: "./src/lib/paraglide"
    },
    prerender: {
      handleMissingId: "warn",
      origin: process.env.ORIGIN
    }
  }
};

export default config;
