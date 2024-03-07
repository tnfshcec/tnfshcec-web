<script lang="ts">
  import { Collapsible } from "bits-ui";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import TableOfContents from "$lib/components/TableOfContents";
  import ChevronDown from "~icons/mdi/chevron-down";
  import ChevronUp from "~icons/mdi/chevron-up";
  import List from "~icons/mdi/format-list-bulleted-type";
  import Pin from "~icons/mdi/pin";

  import { base } from "$app/paths";
  import { fly } from "svelte/transition";
  import * as m from "$paraglide/messages";
  import { languageTag } from "$paraglide/runtime.js";
  import { localeDate } from "$lib/utils/date";

  // for shiki twoslash (cool typescript lsp things)
  // import "./twoslash-style.css";

  export let data;

  let {
    metadata: { title, author, date, image, tags, pinned },
    content
  } = data;
  let locDate = localeDate(date, languageTag());

  let tableOfContentsOpen = false;
</script>

<!-- table of contents on mobile view -->
<Collapsible.Root class="sticky top-20 z-10" bind:open={tableOfContentsOpen}>
  <Collapsible.Trigger
    class="icon-flex z-20 w-full border border-secondary bg-background px-4 py-1 lg:hidden"
  >
    <List class="h-4 w-4" />
    <span>{m.post_table_of_contents()}</span>
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

<CenteredPage>
  <!-- table of contents, on the right -->
  <div class="sticky top-20 hidden w-max max-w-xs p-4 lg:block" slot="right">
    <p class="font-bold">{m.post_table_of_contents()}</p>
    <TableOfContents selector="#post-content" />
  </div>

  <!-- post info, under the title -->
  <div class="icon-flex" slot="title">
    {#if pinned}
      <Pin class="h-4 w-4 text-primary" />
    {/if}
    <span>
      {pinned && !author && !date ? m.post_pinned() : ""}
      {author ? m.post_posted_by({ user: author }) : ""}
      {author && date ? "/" : ""}
      {locDate}
    </span>
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
    <svelte:component this={content} />
  </article>

  {#if tags}
    <hr class="w-full text-text/20" />
    <div class="flex gap-2">
      {#each tags as tag}
        <a class="btn-accent" href="{base}/post?tags={tag}">
          #{tag}
        </a>
      {/each}
    </div>
  {/if}
</CenteredPage>
