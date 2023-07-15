<script lang="ts">
  import Markdown from "svelte-exmarkdown";
  import type { Plugin } from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
  import { visit } from "unist-util-visit";
  import MdCodeBlock from "$lib/MdCodeBlock.svelte";

  import { flyIn, flyOut } from "$lib/utils/transitions";

  export let data;
  let {
    md,
    data: { title, author, date, pinned }
  } = data;

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
      CodeBlock: MdCodeBlock
    }
  };
</script>

<div class="grid md:grid-cols-[repeat(3,auto)]">
  <div
    class="p-4 self-center card w-full max-w-screen-md md:my-4 md:shadow-lg md:col-start-2"
    in:flyIn={{ y: 100 }}
    out:flyOut={{ y: -100 }}
  >
    <header class="card-header">
      <span class="block text-surface-600 dark:text-surface-300">
        {pinned ? "📌" : ""}
        {author || ""}
        {author && date ? "/" : ""}
        {date || ""}
      </span>
      <h1 class="h1">{title}</h1>
    </header>
    <section class="p-4 space-y-4 !max-w-none prose">
      <Markdown {md} plugins={[gfmPlugin, codeBlockPlugin]} />
    </section>
  </div>
</div>
