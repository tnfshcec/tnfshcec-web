import type { Plugin } from "svelte-exmarkdown";
import { visit } from "unist-util-visit";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

import CodeBlockBridge from "../components/CodeBlockBridge.svelte";
import Weird from "../components/weird.svelte";

export const codeBlockPlugin: Plugin = {
  remarkPlugin: () => (tree) => {
    visit(tree, "code", (node) => {
      // Change type to remove additional <pre> element
      node.type = "CodeBlock";
      node.data = {
        hName: "CodeBlock",
        hProperties: {
          language: node.lang,
          code: node.value
        }
      };
    });
    return tree;
  },
  renderer: {
    codeblock: CodeBlockBridge
  }
};

export const rawPlugin: Plugin = {
  rehypePlugin: rehypeRaw
};

export const slugPlugin: Plugin = {
  rehypePlugin: rehypeSlug
};

export const componentsPlugin: Plugin = {
  renderer: {
    weird: Weird
  }
};
