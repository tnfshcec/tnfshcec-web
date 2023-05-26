import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { watch } from "./vite-plugin-watch";

export default defineConfig({
  plugins: [
    watch({
      pattern: "cec/**/*",
      command: "npm run build:posts"
    }),
    sveltekit()
  ]
});
