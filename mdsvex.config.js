import { defineMDSveXConfig as defineConfig } from "mdsvex";
import rehypeAddClasses from "rehype-add-classes";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

const config = defineConfig({
  extensions: [".svelte.md", ".md", ".svx"],

  smartypants: {
    dashes: "oldschool"
  },

  layout: "./src/lib/postLayout.svelte",

  remarkPlugins: [],
  rehypePlugins: [
    [
      rehypeAddClasses,
      {
        h1: "h1 md-header",
        h2: "h2 md-header",
        h3: "h3 md-header",
        h4: "h4 md-header",
        h5: "h5 md-header",
        h6: "h6 md-header"
      }
    ],
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }]
  ]
});

export default config;
