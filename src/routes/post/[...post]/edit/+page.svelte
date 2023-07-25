<script lang="ts">
  import PostEditInput from "$lib/components/postEditInput.svelte";
  import { localeDate } from "$lib/utils/date.js";
  import { fadeIn, fadeOut } from "$lib/utils/transitions.js";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import type EasyMDE from "easymde";
  import { onDestroy, onMount } from "svelte";

  export let data;

  let {
    md,
    data: { title, author, pinned }
  } = data;

  let date = localeDate(data.data.date);
  let dateInputActive = false;

  let textarea: HTMLTextAreaElement;
  let easymde: EasyMDE | undefined;

  onMount(async () => {
    const EasyMDE = await import("easymde").then((m) => m.default);
    await import("easymde/dist/easymde.min.css");

    easymde = new EasyMDE({
      element: textarea,
      initialValue: md,
      hideIcons: ["fullscreen", "side-by-side"],
      spellChecker: false,
      previewClass: ["editor-preview", "prose"]
    });
  });

  onDestroy(() => {
    if (easymde) easymde.cleanup();
  });
</script>

<div class="flex flex-col gap-4 md:py-4 xl:flex-row">
  <div class="flex-1" />
  <div class="flex-1 order-last" />

  <div
    class="flex-none self-center p-4 card w-full space-y-4 max-w-screen-md md:shadow-lg"
    in:fadeIn
    out:fadeOut
  >
    <header class="card-header relative">
      <span class="block text-surface-600-300-token">
        {pinned ? "📌" : ""}
        {#if author}
          <PostEditInput value={author || ""} inline />
        {/if}
        {author && date ? "/" : ""}
        {#if date}
          <PostEditInput
            inline
            value={(dateInputActive ? data.data.date : date) || ""}
            bind:isActive={dateInputActive}
          />
        {/if}
      </span>
      <h1 class="h1">
        <PostEditInput value={title} inline />
      </h1>
    </header>
    <Accordion>
      <AccordionItem>
        <svelte:fragment slot="summary">Post Metadata</svelte:fragment>
        <svelte:fragment slot="content">
          <div class="grid grid-cols-2 gap-6">
            <PostEditInput label="title" value={title ?? ""} className="px-2" />
            <PostEditInput label="author" value={author ?? ""} className="px-2" />
            <PostEditInput label="date" value={date ?? ""} type="date" className="px-2" />
            <PostEditInput label="pinned" value={pinned} type="checkbox" className="px-2" />
          </div>
        </svelte:fragment>
      </AccordionItem>
    </Accordion>
    <textarea bind:this={textarea} />
  </div>
</div>
