import remarkFootnotes from "remark-footnotes";
import remarkFlexibleContainers from "remark-flexible-containers";
import rehypeExternalLinks from "rehype-external-links";
import { visit } from "unist-util-visit";

const remarkSpoiler = () => (tree) =>
  visit(tree, "text", (node) => {
    const regex = /\|\|(.{1,}?)\|\|/g;
    const match = node.value.match(regex);
    if (match) {
      node.type = "html";
      node.value = node.value.replace(regex, (_match, g1) => `<span class="spoiler">${g1}</span>`);
    }
  });

/** @type {(string: string) => string} */
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

/** @type import("mdsvex").MdsvexOptions */
export default {
  extensions: [".svx", ".md"],
  remarkPlugins: [
    remarkSpoiler,
    [remarkFootnotes, { inlineNotes: true }],
    [remarkFlexibleContainers, { title: (type, title) => title ?? capitalizeFirstLetter(type) }]
  ],
  rehypePlugins: [
    [
      rehypeExternalLinks,
      {
        rel: ["nofollow", "noopener", "noreferrer", "external"],
        target: "_blank"
      }
    ]
  ]
};
