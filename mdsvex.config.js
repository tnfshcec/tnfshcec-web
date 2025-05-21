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
  const urls = new Map();
  const url_count = new Map();

  /** source: https://github.com/pngwn/MDsveX/discussions/246#discussioncomment-732230 */
  function transformUrl(url) {
    // work if is relative path (starting with .)
    if (url?.startsWith(".")) {
      // create the identifier by replacing unsupported characters with _
      let id = url.replace(/[^\p{ID_Continue}]/gu, "_");

      const count = url_count.get(id);
      const dupe = urls.get(url);

      if (count && !dupe) {
        url_count.set(id, count + 1);
        id = `${id}_${count}`;
      } else if (!dupe) {
        url_count.set(id, 1);
      } // if there is dupe we can just reuse the id

      urls.set(url, id);

      return `{${id}}`;
    }

    return url;
  }
  visit(tree, "element", (node, index, parent) => {
    if (node.tagName != "p" || !node.children?.some((child) => child?.tagName === "Components.img")) return;

    let lastIndex = index;

    // find <p>s that contain <img>s
    for (let child of node.children) {
      if (child.tagName === "Components.img") {
        // handle relatvie urls if needed
        child.properties.src = transformUrl(child.properties.src);

        // insert this <img> after this <p> (move it out!)
        parent.children.splice(lastIndex + 1, 0, child);
        lastIndex = lastIndex + 1;
      } else if (lastIndex === index || parent.children[lastIndex].tagName === "Components.img") {
        // when we haven't added anything OR when last added image
        // insert a new <p> (because we will delete the original <p>)
        parent.children.splice(lastIndex + 1, 0, {
          type: "element",
          tagName: "p",
          properties: {},
          children: [child]
        });
        lastIndex = lastIndex + 1;
      } else if (parent.children[lastIndex].tagName === "p") {
        // when last added <p>
        // we should just add child to it
        parent.children[lastIndex].children.push(child);
      } else {
        throw new Error("Parse error in rehypeImage. Bad lastIndex.");
      }
    }

    // since we copied all the elements, we should be safe to delete the original <p>
    parent.children.splice(index, 1);
  });
  visit(tree, "raw", (node) => {
    // transform regular element src as well
    // INFO: this does not limit to images, which is probably the intended behavior
    node.value = node.value.replaceAll(
      /src=(?:"(\.\/[^"]*)"|'(\.\/[^']*)')/g,
      (_, g1, g2) => `src=${transformUrl(g1 ?? g2)}`
    );
  });

  let imports = "";
  for (let [url, id] of urls) {
    imports += `import ${id} from "${url}";\n`;
  }

  visit(tree, "raw", (node) => {
    if (node.value.includes("<script>")) {
      node.value = node.value.replace("<script>", `<script>\n${imports}`);
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
