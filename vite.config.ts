import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, searchForWorkspaceRoot } from "vite";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())]
    }
  },
  plugins: [
    sveltekit(),
    paraglideVitePlugin({
      project: "./tnfshcec.inlang",
      outdir: "./src/lib/paraglide"
    }),
    Icons({
      compiler: "svelte"
    })
  ]
});
