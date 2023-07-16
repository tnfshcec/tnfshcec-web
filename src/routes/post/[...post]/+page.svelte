<script lang="ts">
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";

  import { fadeIn, fadeOut, flyIn, flyOut } from "$lib/utils/transitions";
  import { rawPlugin, codeBlockPlugin } from "$lib/utils/exmarkdown-plugins";
  import { localeDate } from "$lib/utils/date.js";
  import { TableOfContents } from "@skeletonlabs/skeleton";

  export let data;
  let {
    md,
    data: { title, author, pinned }
  } = data;

  let date = localeDate(data.data.date);
</script>

<div class="flex flex-col items-center gap-4 md:py-4 xl:flex-row">
  <div class="flex-1" in:fadeIn out:fadeOut />

  <div class="flex-1 order-last" in:fadeIn out:fadeOut>
    <TableOfContents target="#post-content" spacing="space-y-4 sticky top-0" />
  </div>

  <div
    id="post-content"
    class="flex-none p-4 card w-full max-w-screen-md md:shadow-lg"
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
      <Markdown {md} plugins={[gfmPlugin, rawPlugin, codeBlockPlugin]} />
    </section>
  </div>
</div>
