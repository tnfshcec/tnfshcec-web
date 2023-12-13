<script lang="ts">
  import { createDialog, melt } from "@melt-ui/svelte";

  // Components
  import Carta from "$lib/components/Carta.svelte";
  import PageTitle from "$lib/components/PageTitle.svelte";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import TableOfContents from "$lib/components/TableOfContents";
  import Pin from "~icons/mdi/pin";
  import List from "~icons/mdi/format-list-bulleted-type";
  import Pencil from "~icons/mdi/pencil-circle";

  // other
  import { rawPlugin, slugPlugin, componentsPlugin } from "$lib/utils/exmarkdown-plugins";
  import { localeDateFromString } from "$lib/utils/date";
  import { base } from "$app/paths";
  import { fade, fly } from "svelte/transition";

  export let data;

  // extract data
  let {
    md,
    data: { title, author, date, image, pinned, url }
  } = data;
  let localeDate = localeDateFromString(date ?? "");

  const {
    elements: { trigger, overlay, content, portalled },
    states: { open }
  } = createDialog({
    forceVisible: true
  });
</script>

<CenteredPage>
  <div class="sticky top-20 hidden w-max max-w-xs p-4 md:block" slot="right">
    <TableOfContents selector="#post-content" />
  </div>

  <div id="post-content" class="relative flex w-full min-w-0 max-w-screen-xl flex-col gap-4">
    <PageTitle current="post" {title}>
      <div class="icon-flex">
        {#if pinned}
          <Pin class="h-4 w-4 text-primary" />
        {/if}
        <span>
          {pinned && !author && !date ? "Pinned" : ""}
          {author ? `By ${author}` : ""}
          {author && date ? "/" : ""}
          {localeDate}
        </span>
      </div>

      <div slot="title" class="flex flex-grow basis-0 flex-wrap justify-end gap-2">
        <button class="btn-text icon-flex md:hidden" use:melt={$trigger}>
          <List class="h-4 w-4" />
          <span>Contents</span>
        </button>
        {#if data.session?.user?.role === "admin"}
          <a class="btn-accent icon-flex" href="{base}/post/{url}/edit">
            <Pencil class="h-4 w-4" />
            <span>Edit</span>
          </a>
        {/if}
      </div>
    </PageTitle>

    <div use:melt={$portalled}>
      {#if $open}
        <div
          use:melt={$overlay}
          class="fixed inset-0 z-top bg-background/60"
          transition:fade={{ duration: 150 }}
        />
        <div
          class="fixed right-0 top-0 z-top h-full w-full max-w-sm bg-background p-4 shadow-glow-sm shadow-text/60"
          use:melt={$content}
          transition:fly={{ duration: 150, x: 10 }}
        >
          <TableOfContents selector="#post-content" />
        </div>
      {/if}
    </div>

    {#if image}
      <div class="p-4">
        <img
          src={image}
          alt=""
          class="max-h-80 w-full rounded object-cover shadow-glow shadow-primary/20"
        />
      </div>
    {/if}

    <article class="prose space-y-4">
      <Carta value={md} type="viewer" />
    </article>
  </div>
</CenteredPage>
