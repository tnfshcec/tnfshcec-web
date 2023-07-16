<script lang="ts">
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";

  import { fadeIn, fadeOut, flyIn, flyOut } from "$lib/utils/transitions";
  import { rawPlugin, codeBlockPlugin } from "$lib/utils/exmarkdown-plugins";
  import { localeDate } from "$lib/utils/date.js";
  import { TableOfContents, drawerStore } from "@skeletonlabs/skeleton";

  export let data;
  let {
    md,
    data: { title, author, pinned }
  } = data;

  let date = localeDate(data.data.date);

  function tocDrawer() {
    drawerStore.open({ id: "post-toc", width: "auto", regionDrawer: "p-4" });
  }
</script>

<div class="flex flex-col gap-4 md:py-4 xl:flex-row">
  <div class="flex-1" in:fadeIn out:fadeOut />

  <div class="flex-1 order-last" in:fadeIn out:fadeOut>
    <TableOfContents target="#post-content" spacing="space-y-4 sticky top-0 hidden xl:block" />
  </div>

  <div
    id="post-content"
    class="flex-none self-center p-4 card w-full max-w-screen-md md:shadow-lg"
    in:flyIn={{ y: 100 }}
    out:flyOut={{ y: -100 }}
  >
    <header class="card-header">
      <span class="block text-surface-600-300-token">
        {pinned ? "📌" : ""}
        {author || ""}
        {author && date ? "/" : ""}
        {date || ""}
      </span>
      <h1 class="h1">
        <button class="btn-icon btn-icon-sm hover:variant-soft" on:click={tocDrawer}>
          <svg
            viewBox="0 0 24 24"
            class="stroke-surface-600 dark:stroke-surface-300 w-7 h-7 inline mb-1 mx-1"
          >
            <path d="M20 7L4 7" stroke-width="1.5" stroke-linecap="round" />
            <path d="M15 12L4 12" stroke-width="1.5" stroke-linecap="round" />
            <path d="M9 17H4" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>
        {title}
      </h1>
    </header>
    <section class="p-4 space-y-4 !max-w-none prose">
      <Markdown {md} plugins={[gfmPlugin, rawPlugin, codeBlockPlugin]} />
    </section>
  </div>
</div>
