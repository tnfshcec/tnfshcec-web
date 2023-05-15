import path from "path";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import watchAndRun from "vite-plugin-watch-and-run";

export default defineConfig({
  plugins: [
    watchAndRun([
      {
        name: "buildPosts",
        watchKind: ["add", "change", "unlink", "addDir", "unlinkDir"],
        watch: path.resolve("cec/**/*"),
        run: "npm run build:posts"
      }
    ]),
    sveltekit()
  ]
});
