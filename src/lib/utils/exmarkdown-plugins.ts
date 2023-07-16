import type { Plugin } from "svelte-exmarkdown";
import { visit } from "unist-util-visit";
import rehypeRaw from "rehype-raw";

import CodeBlockBridge from "../components/CodeBlockBridge.svelte";

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
