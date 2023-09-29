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

<div class="flex flex-col py-4 xl:flex-row xl:gap-4">
  {#if image}
    <div
      class="variant-glass fixed top-0 -z-50 h-2/3 w-full bg-cover"
      style="background-image: url({image}); mask-image: linear-gradient(to bottom, white, 70%, transparent 95%);"
      in:fadeIn
      out:fadeOut
    />
  {/if}
  <div class="flex-1" in:fadeIn out:fadeOut />

  <div class="order-last flex-1" in:fadeIn out:fadeOut>
    <!-- TODO: text might have contrast issue with background -->
    <TableOfContents
      class="sticky top-4 hidden w-full max-w-xs rounded-xl bg-surface-50/50 px-4 py-2 backdrop-blur dark:bg-surface-900/50 xl:block"
    />
  </div>

  <div
    id="post-content"
    class="card w-full max-w-screen-md flex-none space-y-4 self-center p-4 shadow-lg"
    in:flyIn={{ y: 100 }}
    out:flyOut={{ y: -100 }}
  >
    <header class="card-header relative">
      <span class="text-surface-600-300-token block">
        {#if pinned}
          <Pin class="text-primary-500-400-token -mt-1 inline" />
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
          class="variant-soft-surface btn-icon btn-icon-sm absolute right-2 top-4 p-1"
          href="{base}/post/{url}/edit"
        >
          <PlaylistEdit width="100%" height="100%" class="text-surface-600-300-token" />
        </a>
      {/if}
    </header>
    <section
      class="prose !max-w-none space-y-4 p-4"
      use:tocCrawler={{ scrollTarget: "#page", queryElements: "h2,h3" }}
    >
      <Markdown
        {md}
        plugins={[gfmPlugin, rawPlugin, slugPlugin, codeBlockPlugin, componentsPlugin]}
      />
    </section>
  </div>
</div>
