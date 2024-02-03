import remarkFootnotes from "remark-footnotes";
import rehypeExternalLinks from "rehype-external-links";
import { visit } from "unist-util-visit";

const rehypeSpoiler = () => (tree) =>
  visit(tree, "text", (node) => {
    const regex = /\|\|(.{1,}?)\|\|/g;
    const match = node.value.match(regex);
    if (match) {
      node.type = "html";
      node.value = node.value.replace(regex, (_match, g1) => `<span class="spoiler">${g1}</span>`);
    }
  });

/** @type import("mdsvex").MdsvexOptions */
export default {
  extensions: [".svx", ".md"],
  remarkPlugins: [rehypeSpoiler, [remarkFootnotes, { inlineNotes: true }]],
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
