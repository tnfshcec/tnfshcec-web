<script lang="ts">
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
  import { TableOfContents, getDrawerStore, tocCrawler } from "@skeletonlabs/skeleton";

  import MenuOpen from "~icons/mdi/menu-open";
  import PlaylistEdit from "~icons/mdi/playlist-edit";
  import Pin from "~icons/mdi/pin";

  import { fadeIn, fadeOut, flyIn, flyOut } from "$lib/utils/transitions";
  import {
    rawPlugin,
    slugPlugin,
    codeBlockPlugin,
    componentsPlugin
  } from "$lib/utils/exmarkdown-plugins";
  import { base } from "$app/paths";
  import { localeDateFromString } from "$lib/utils/date.js";

  export let data;

  const drawerStore = getDrawerStore();

  let {
    md,
    data: { title, author, date, image, pinned, url }
  } = data;
  let localeDate = localeDateFromString(date ?? "");

  function tocDrawer() {
    drawerStore.open({ id: "post-toc", width: "auto", regionDrawer: "p-4" });
  }
</script>

<div class="flex flex-col py-4 xl:gap-4 xl:flex-row">
  {#if image}
    <div
      class="fixed top-0 w-full h-2/3 -z-50 bg-cover variant-glass"
      style="background-image: url({image}); mask-image: linear-gradient(to bottom, white, 70%, transparent 95%);"
      in:fadeIn
      out:fadeOut
    />
  {/if}
  <div class="flex-1" in:fadeIn out:fadeOut />

  <div class="flex-1 order-last" in:fadeIn out:fadeOut>
    <!-- TODO: text might have contrast issue with background -->
    <TableOfContents
      class="w-full max-w-xs px-4 py-2 sticky top-4 hidden rounded-xl backdrop-blur bg-surface-50/50 dark:bg-surface-900/50 xl:block"
    />
  </div>

  <div
    id="post-content"
    class="flex-none self-center p-4 card w-full space-y-4 max-w-screen-md shadow-lg"
    in:flyIn={{ y: 100 }}
    out:flyOut={{ y: -100 }}
  >
    <header class="card-header relative">
      <span class="block text-surface-600-300-token">
        {#if pinned}
          <Pin class="inline -mt-1 text-primary-500-400-token" />
        {/if}
        {author || ""}
        {author && localeDate ? "/" : ""}
        {localeDate || ""}
      </span>
      <h1 class="h1">
        <button
          class="btn-icon btn-icon-sm hover:variant-soft md:btn-icon-base xl:hidden"
          on:click={tocDrawer}
        >
          <MenuOpen width="100%" height="100%" class="text-surface-600-300-token inline" />
        </button>
        {title}
      </h1>

      {#if data.session?.user?.role === "admin"}
        <a
          class="btn-icon btn-icon-sm variant-soft-surface absolute top-4 right-2 p-1"
          href="{base}/post/{url}/edit"
        >
          <PlaylistEdit width="100%" height="100%" class="text-surface-600-300-token" />
        </a>
      {/if}
    </header>
    <section
      class="p-4 space-y-4 !max-w-none prose"
      use:tocCrawler={{ scrollTarget: "#page", queryElements: "h2,h3" }}
    >
      <Markdown
        {md}
        plugins={[gfmPlugin, rawPlugin, slugPlugin, codeBlockPlugin, componentsPlugin]}
      />
    </section>
  </div>
</div>
