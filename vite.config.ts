import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { watch } from "./vite-plugin-watch";

export default defineConfig({
  plugins: [
    watch({
      pattern: "cec/**/*",
      command: (file) => `npm run build:posts ${file ? `-- ${file}` : ""}`
    }),
    sveltekit()
  ]
});
