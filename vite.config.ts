import { sveltekit } from "@sveltejs/kit/vite";
import { paraglide } from "@inlang/paraglide-js-adapter-vite";
import { defineConfig } from "vite";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [
    sveltekit(),
    paraglide({
      project: "./tnfshcec.inlang",
      outdir: "./src/lib/paraglide"
    }),
    Icons({
      compiler: "svelte"
    }),
  ]
});
