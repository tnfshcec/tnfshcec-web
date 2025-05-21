import remarkGFM from "remark-gfm";
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
  visit(tree, "element", (node, index, parent) => {
    if (!node.children) return;

    // find <p>s that contain <img>s
    for (let [i, child] of node.children.entries()) {
      if (child.tagName !== "Components.img") return;

      if (child.properties.src?.startsWith("./")) {
        // update relative src url for vite to process
        child.properties.src = `{new URL('${child.properties.src}', import.meta.url).href}`;
      }

      // insert this <img> after this <p> (move it out!)
      parent.children.splice(index + 1, 0, child);

      // remove the original <img> inside <p>
      node.children.splice(i, 1);
    }

    if (node.children.length === 0) {
      parent.children.splice(index, 1);

      // tell visitor to go to next element (since we removed the current one)
      return index + 1;
    }
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
  remarkPlugins: [remarkSpoiler, remarkAlerts, remarkGFM],
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
