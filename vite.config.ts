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
      outdir: "./src/lib/paraglide",
      strategy: ["url", "cookie"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["en", "/en/:path(.*)?"],
            ["ja", "/ja/:path(.*)?"],
            ["zh-tw", "/:path(.*)?"],
          ],
        },
      ],
    }),
    Icons({
      compiler: "svelte"
    })
  ]
});
