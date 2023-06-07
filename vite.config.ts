import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { watch } from "./vite-plugin-watch";

const dev = process.argv.includes("dev");

export default defineConfig({
  plugins: [
    watch({
      pattern: "cec/**/*",
      command: (file) => `npm run build:posts ${file ? `-- ${file}` : ""}`,
      onInit: dev
    }),
    sveltekit()
  ]
});
