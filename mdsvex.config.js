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

const rehypeImage = () => (tree) => {
  visit(tree, "element", (node) => {
    if (node.tagName === "img" && node.properties.src.startsWith("./")) {
      // test if src is a relative path by checking "./"
      node.properties.src = `{new URL('${node.properties.src}', import.meta.url).href}`;
    }
  });
  visit(tree, "raw", (node) => {
    // replace `src="relative path"` with `src="static asset import"`
    node.value = node.value.replaceAll(
      /src=(?:"(\.\/[^"]*)"|'(\.\/[^']*)')/g,
      (_, g1, g2) => `src={new URL(\`${g1 ?? g2}\`, import.meta.url).href}`
    );
  });
};

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
          // transformerTwoslash({ explicitTrigger: true }),
          transformerNotationDiff(),
          transformerMetaHighlight()
        ]
      });

      // find `title="something cool"` (or without quotes)
      const title = (meta?.match(/\btitle=(?:[^"'\s]+\b|["'][^"']*["']\B)/) ?? [""])[0];
      const nocopy = meta?.match(/\bnocopy\b/) ? "nocopy" : "";

      const attr = `lang="${lang}" ${title} ${nocopy}`;

      // warp the html with custom component `codeblock` (see MdsvexLayout.svelte)
      return `<Components.codeblock ${attr}>{@html \`${escapeSvelte(html)}\` }</Components.codeblock>`;
    }
  },
  remarkPlugins: [remarkSpoiler, remarkAlerts, [remarkFootnotes, { inlineNotes: true }]],
  rehypePlugins: [
    [
      rehypeImage,
      rehypeExternalLinks,
      {
        rel: ["nofollow", "noopener", "noreferrer", "external"],
        target: "_blank"
      }
    ]
  ]
};
