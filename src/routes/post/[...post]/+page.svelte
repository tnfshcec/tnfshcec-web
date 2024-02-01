<script lang="ts">
  import { Collapsible } from "bits-ui";
  import Carta from "$lib/components/Carta.svelte";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import TableOfContents from "$lib/components/TableOfContents";
  import ChevronDown from "~icons/mdi/chevron-down";
  import ChevronUp from "~icons/mdi/chevron-up";
  import List from "~icons/mdi/format-list-bulleted-type";
  import Pencil from "~icons/mdi/pencil-circle";
  import Pin from "~icons/mdi/pin";

  import * as m from "$paraglide/messages";
  import { localeDateFromString } from "$lib/utils/date";
  import { base } from "$app/paths";
  import { fly } from "svelte/transition";

  export let data;

  let {
    md,
    data: { title, author, date, image, pinned, url }
  } = data;
  let localeDate = localeDateFromString(date ?? "");

  let tableOfContentsOpen = false;
</script>

<!-- table of contents on mobile view -->
<Collapsible.Root class="sticky top-20 z-10" bind:open={tableOfContentsOpen}>
  <Collapsible.Trigger
    class="icon-flex z-20 w-full border border-secondary bg-background px-4 py-1 md:hidden"
  >
    <List class="h-4 w-4" />
    <span>{m.post_tableOfContents()}</span>
    {#if tableOfContentsOpen}
      <ChevronUp class="ml-auto h-4 w-4" />
    {:else}
      <ChevronDown class="ml-auto h-4 w-4" />
    {/if}
  </Collapsible.Trigger>

  <Collapsible.Content class="absolute left-0 right-0 top-full">
    <div
      class="rounded rounded-t-none border border-t-0 border-text/20 bg-background px-4 py-2"
      transition:fly={{ duration: 150, y: -10 }}
    >
      <TableOfContents selector="#post-content" on:click={() => (tableOfContentsOpen = false)} />
    </div>
  </Collapsible.Content>
</Collapsible.Root>

<CenteredPage current="post" {title}>
  <!-- table of contents, on the right -->
  <div class="sticky top-20 hidden w-max max-w-xs p-4 md:block" slot="right">
    <p class="font-bold">{m.post_tableOfContents()}</p>
    <TableOfContents selector="#post-content" />
  </div>

  <!-- post info, under the title -->
  <div class="icon-flex" slot="title">
    {#if pinned}
      <Pin class="h-4 w-4 text-primary" />
    {/if}
    <span>
      {pinned && !author && !date ? m.post_pinned() : ""}
      {author ? m.post_postedBy({ user: author }) : ""}
      {author && date ? "/" : ""}
      {localeDate}
    </span>
  </div>

  <!-- admin controls -->
  <div class="absolute right-4 top-8 flex flex-grow basis-0 flex-wrap gap-2">
    {#if data.session?.user?.role === "admin"}
      <a class="btn-accent icon-flex" href="{base}/post/{url}/edit">
        <Pencil class="h-4 w-4" />
        <span>{m.post_editPost()}</span>
      </a>
    {/if}
  </div>

  <!-- image of post -->
  {#if image}
    <div class="p-4">
      <img
        src={image}
        alt=""
        class="max-h-80 w-full rounded object-cover shadow-glow shadow-primary/20"
      />
    </div>
  {/if}

  <!-- actual post content -->
  <article class="prose space-y-4" id="post-content">
    <Carta value={md} type="viewer" />
  </article>
</CenteredPage>
