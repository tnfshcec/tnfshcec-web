import { defineMDSveXConfig as defineConfig } from "mdsvex";

const remarkFm =
  () =>
  /**
   * @param {import("unist").Node<import("unist").Data>} tree
   * @param {{ data: { fm?: Record<String, Unknown>}, filename?: string}} param1
   */
  (tree, { data, filename }) => {
    const postPath = filename
      ? filename.slice(filename.indexOf("/src/routes") + 12, filename.lastIndexOf("/"))
      : "Unknown";

    data.fm ??= {};
    data.fm.url = postPath;
  };

const config = defineConfig({
  extensions: [".svelte.md", ".md", ".svx"],

  smartypants: {
    dashes: "oldschool"
  },

  layout: "./src/lib/postLayout.svelte",

  remarkPlugins: [remarkFm],
  rehypePlugins: []
});

export default config;
