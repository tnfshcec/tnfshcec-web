import { defineMDSveXConfig as defineConfig } from "mdsvex";
import addClasses from "rehype-add-classes";

const config = defineConfig({
  extensions: [".svelte.md", ".md", ".svx"],

  smartypants: {
    dashes: "oldschool"
  },

  layout: "./src/lib/postLayout.svelte",

  remarkPlugins: [],
  rehypePlugins: [
    [
      addClasses,
      {
        h1: "h1",
        h2: "h2",
        h3: "h3",
        h4: "h4",
        h5: "h5",
        h6: "h6"
      }
    ]
  ]
});

export default config;
