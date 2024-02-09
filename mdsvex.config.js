import remarkFootnotes from "remark-footnotes";
import rehypeExternalLinks from "rehype-external-links";
import { visit } from "unist-util-visit";
import { escapeSvelte } from "mdsvex";
import { codeToHtml } from "shiki";
import { transformerTwoslash } from "@shikijs/twoslash";
import { transformerNotationDiff, transformerMetaHighlight } from "@shikijs/transformers";

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
        quote.type = "alert"; // set HAST node type
        quote.data = { hName: "alert", hProperties: { title } }; // set HTML tag & attributes

        // remove the [!ALERT] part from markdown (remove this linkReference)
        linkParent.children.splice(index, 1);
      }
    })
  );

/** @type import("mdsvex").MdsvexOptions */
export default {
  extensions: [".svx", ".md"],
  layout: "./src/lib/components/MdsvexLayout.svelte",
  highlight: {
    highlighter: async (code, lang, meta) => {
      const html = await codeToHtml(code, {
        lang,
        meta: { __raw: meta },
        theme: "one-dark-pro",
        transformers: [
          transformerTwoslash({ explicitTrigger: true }),
          transformerNotationDiff(),
          transformerMetaHighlight()
        ]
      });

      return `{@html \`${escapeSvelte(html)}\` }`;
    }
  },
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
