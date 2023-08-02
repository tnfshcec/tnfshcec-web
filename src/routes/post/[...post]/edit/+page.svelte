<script lang="ts">
  import PostEditInput from "$lib/components/postEditInput.svelte";
  import { localeDate } from "$lib/utils/date.js";
  import { fadeIn, fadeOut } from "$lib/utils/transitions.js";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import { onDestroy, onMount } from "svelte";
  import type EasyMDE from "easymde";
  import "easymde/dist/easymde.min.css";
  import { base } from "$app/paths";

  export let data;

  let { md, data: postData } = data;
  $: date = localeDate(postData.date);

  let textarea: HTMLTextAreaElement;
  let easymde: EasyMDE | undefined;

  onMount(async () => {
    const EasyMDE = await import("easymde").then((m) => m.default);

    easymde = new EasyMDE({
      element: textarea,
      initialValue: md,
      hideIcons: ["fullscreen", "side-by-side"],
      spellChecker: false,
      previewClass: ["editor-preview", "prose"]
    });
    // TODO: render custom components on preview
  });

  onDestroy(() => {
    if (easymde) easymde.cleanup();
  });

  async function savePost() {
    const data = Object.fromEntries(Object.entries(postData).filter(([_k, v]) => v !== ""));
    console.log("saving with data: ", data);

    await fetch(`${base}/${postData.url}/endpoint`, {
      method: "POST",
      body: JSON.stringify({ data, md })
    });
  }
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
        {postData.pinned ? "📌" : ""}
        {postData.author || ""}
        {postData.author && date ? "/" : ""}
        {date || ""}
      </span>
      <h1 class="h1">
        <PostEditInput bind:value={postData.title} label="title" inline />
      </h1>

      <button class="btn variant-filled-primary absolute top-4 right-2" on:click={savePost}>
        Save
      </button>
    </header>
    <Accordion>
      <AccordionItem>
        <svelte:fragment slot="summary">Post Metadata</svelte:fragment>
        <svelte:fragment slot="content">
          <div class="grid grid-cols-2 gap-6">
            <PostEditInput label="title" bind:value={postData.title} className="px-2" />
            <PostEditInput label="author" bind:value={postData.author} className="px-2" />
            <!-- TODO: type="date" -->
            <PostEditInput label="date" bind:value={postData.date} className="px-2" />
            <PostEditInput
              label="pinned"
              bind:value={postData.pinned}
              type="checkbox"
              className="px-2"
            />
          </div>
        </svelte:fragment>
      </AccordionItem>
    </Accordion>
    <textarea class="hidden" bind:this={textarea} />
  </div>
</div>
