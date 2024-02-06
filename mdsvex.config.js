import remarkFootnotes from "remark-footnotes";
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

const alerts = ["!NOTE", "!TIP", "!IMPORTANT", "!WARNING", "!CAUTION"];
const remarkAlerts = () => (tree) =>
  visit(tree, "blockquote", (quote) =>
    visit(quote, "linkReference", (link, index, linkParent) => {
      const title = link.children[0].value;
      if (alerts.includes(title)) {
        console.log("found", title);
        quote.type = "alert";
        quote.data = { hName: "alert", hProperties: { title } };

        // remove the [!ALERT] part
        linkParent.children.splice(index, 1);
      }
    })
  );

/** @type {(string: string) => string} */
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

/** @type import("mdsvex").MdsvexOptions */
export default {
  extensions: [".svx", ".md"],
  layout: "./src/lib/components/MdsvexLayout.svelte",
  remarkPlugins: [remarkSpoiler, remarkAlerts, [remarkFootnotes, { inlineNotes: true }]],
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
