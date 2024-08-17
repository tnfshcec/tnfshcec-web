import remarkFootnotes from "remark-footnotes";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import { visit } from "unist-util-visit";
import { escapeSvelte } from "mdsvex";
import { codeToHtml } from "shiki";
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
    if (node.properties.src?.startsWith("./")) {
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
        transformers: [transformerNotationDiff(), transformerMetaHighlight()]
      });

      // match attribute-like strings, and feed them into props
      // for example: `src="adfjkl;" hello yourmom='sorry'`
      // regex is unly sorry _please do it if there's a better way ;)_
      const attrMatch = meta?.matchAll(/(?:\w+)(?:="[^"]*"|='[^']*')?(?:\s|$)/g) ?? [];

      let attr = [...attrMatch].join("");
      if (lang) attr += ` lang="${lang}"`;

      // warp the html with custom component `codeblock` (see MdsvexLayout.svelte)
      return `<Components.codeblock ${attr}>{@html \`${escapeSvelte(html)}\` }</Components.codeblock>`;
    }
  },
  remarkPlugins: [remarkSpoiler, remarkAlerts, [remarkFootnotes, { inlineNotes: true }]],
  rehypePlugins: [
    rehypeImage,
    rehypeSlug,
    [
      rehypeExternalLinks,
      {
        rel: ["nofollow", "noopener", "noreferrer", "external"],
        target: "_blank"
      }
    ]
  ]
};
