<script lang="ts">
  import { Collapsible } from "bits-ui";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import TableOfContents from "$lib/components/TableOfContents";
  import ChevronDown from "~icons/mdi/chevron-down";
  import ChevronUp from "~icons/mdi/chevron-up";
  import List from "~icons/mdi/format-list-bulleted-type";
  import Pin from "~icons/mdi/pin";
  import Alert from "~icons/mdi/alert-outline";

  import { base } from "$app/paths";
  import { fly } from "svelte/transition";
  import { m}  from "$paraglide/messages";
  import { getLocale, localizeHref } from "$paraglide/runtime.js";
  import { localeDate } from "$lib/utils/date";

  let { data } = $props();

  // NOTE: `data.post` will change when url changes.
  let post = $derived(data.post);
  let metadata = $derived(post.metadata);
  let Content = $derived(post.content);
  let locDate = $derived(localeDate(metadata.date));

  let infoText: string | undefined = $state();
  $effect(() => {
    if (metadata.author && metadata.date) {
      infoText = `${m.post_posted_by({ user: metadata.author })} / ${locDate}`;
    } else if (metadata.author && !metadata.date) {
      infoText = m.post_posted_by({ user: metadata.author });
    } else if (!metadata.author && metadata.author) {
      infoText = locDate;
    } else if (metadata.pinned) {
      infoText = m.post_pinned();
    } else {
      infoText = undefined;
    }
  });

  // toc state for mobile view
  let tableOfContentsOpen = $state(false);
</script>

<!-- table of contents on mobile view -->
<Collapsible.Root class="sticky top-14 z-10" bind:open={tableOfContentsOpen}>
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

<CenteredPage title={metadata.title ?? ""} breadcrumb={["home", "postList"]}>
  <!-- table of contents, on the right -->
  {#snippet right()}
    <div class="sticky top-20 hidden w-max max-w-xs p-4 lg:block">
      <p class="font-bold">{m.post_table_of_contents()}</p>
      <TableOfContents selector="#post-content" />
    </div>
  {/snippet}

  <!-- post info, under the title -->
  {#snippet belowTitle()}
    <div class="icon-flex">
      {#if metadata.pinned}
        <Pin class="h-4 w-4 text-primary" />
      {/if}
      {#if infoText}
        <span>{infoText}</span>
      {/if}
    </div>
  {/snippet}

  <!-- image of post -->
  {#if metadata.image}
    <div class="p-4">
      <img
        src={metadata.image}
        alt={metadata.title}
        class="max-h-80 w-full rounded object-cover shadow-glow shadow-primary/20"
      />
    </div>
  {/if}

  <!-- language notice -->
  {#if metadata.lang && metadata.lang !== getLocale()}
    <div class="icon-flex rounded border border-primary p-4 font-bold">
      <Alert class="h-4 w-4" />
      {m.post_lang_notice()}
    </div>
  {/if}

  <!-- actual post content -->
  <article class="prose space-y-4" id="post-content">
    <Content />
  </article>

  {#if metadata.tags}
    <hr class="w-full text-text/20" />
    <div class="flex flex-wrap gap-2">
      {#each metadata.tags as tag}
        <a class="btn-accent" href={localizeHref(`${base}/post?tags={tag}`)}>
          #{tag}
        </a>
      {/each}
    </div>
  {/if}
</CenteredPage>
