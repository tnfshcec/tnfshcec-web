<script lang="ts">
  import PostEditInput from "$lib/components/postEditInput.svelte";
  import EasyMde from "$lib/components/EasyMde.svelte";
  import { localeDateFromString } from "$lib/utils/date.js";
  import { fadeIn, fadeOut } from "$lib/utils/transitions.js";
  import { Accordion, AccordionItem, getToastStore } from "@skeletonlabs/skeleton";
  import { base } from "$app/paths";
  import Pin from "~icons/mdi/pin";
  import LeftCircleOutline from "~icons/mdi/chevron-left-circle-outline";

  export let data;

  const toastStore = getToastStore();

  let { md, data: postData } = data;
  $: localeDate = localeDateFromString(postData.date ?? "");

  let editUrl = postData.url;
</script>

<div class="flex flex-col gap-4 md:py-4 xl:flex-row">
  {#if postData.image}
    <div
      class="fixed top-0 w-full h-2/3 -z-50 bg-cover"
      style="background-image: url({postData.image}); mask-image: linear-gradient(to bottom, white, 70%, transparent 95%);"
      in:fadeIn
      out:fadeOut
    />
  {/if}
  <div class="flex-1" />
  <div class="flex-1 order-last" />

  <div
    class="flex-none self-center p-4 card w-full space-y-4 max-w-screen-md md:shadow-lg"
    in:fadeIn
    out:fadeOut
  >
    <header class="card-header relative">
      <span class="block text-surface-600-300-token">
        {#if postData.pinned}
          <Pin class="inline -mt-1 text-primary-400-500-token" />
        {/if}
        {postData.author || ""}
        {postData.author && localeDate ? "/" : ""}
        {localeDate || ""}
      </span>
      <h1 class="h1">
        <a
          href="{base}/post/{postData.url}"
          class="btn-icon btn-icon-sm hover:variant-soft md:btn-icon-base"
        >
          <LeftCircleOutline width="100%" height="100%" class="text-surface-600-300-token inline" />
        </a>
        {postData.title}
      </h1>

      <form class="absolute top-4 right-2 space-x-2" method="POST">
        <button class="btn variant-filled-primary" formaction="?/save">Save</button>
        <button class="btn variant-filled-warning" formaction="?/delete">DELETE</button>
      </form>
    </header>
    <Accordion>
      <AccordionItem>
        <svelte:fragment slot="summary">Post Metadata</svelte:fragment>
        <svelte:fragment slot="content">
          <div class="grid grid-cols-2 gap-6">
            <PostEditInput
              label="url"
              bind:value={editUrl}
              className="col-span-2"
              validate={(v) => Boolean(v)}
            />
            <PostEditInput id="title" bind:value={postData.title} />
            <PostEditInput id="author" bind:value={postData.author} />
            <PostEditInput id="date" type="date" bind:value={postData.date} />
            <PostEditInput id="image" bind:value={postData.image} />
            <PostEditInput id="pinned" bind:value={postData.pinned} type="checkbox" />
          </div>
        </svelte:fragment>
      </AccordionItem>
    </Accordion>
    <EasyMde bind:md />
  </div>
</div>
