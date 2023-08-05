<script lang="ts">
  import PostEditInput from "$lib/components/postEditInput.svelte";
  import EasyMde from "$lib/components/EasyMde.svelte";
  import { localeDate } from "$lib/utils/date.js";
  import { fadeIn, fadeOut } from "$lib/utils/transitions.js";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";

  export let data;

  let { md, data: postData } = data;
  $: date = localeDate(postData.date);

  const originalUrl = postData.url;

  async function savePost() {
    const data = Object.fromEntries(Object.entries(postData).filter(([_k, v]) => v !== ""));
    console.log("saving with data: ", data);

    await fetch(`${base}/api/post?path=${postData.url}`, {
      method: "POST",
      body: JSON.stringify({ data, md })
    });

    if (postData.url !== originalUrl) {
      await fetch(`${base}/api/post?path=${originalUrl}`, {
        method: "DELETE"
      });
      await goto(`${base}/post/${postData.url}/edit`);
    }
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
        <input
          class="bg-transparent rounded-container-token hover:bg-primary-hover-token"
          type="text"
          placeholder="title"
          bind:value={postData.title}
        />
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
            <PostEditInput
              label="url"
              bind:value={postData.url}
              className="col-span-2"
              validate={(v) => Boolean(v)}
            />
            <PostEditInput id="title" bind:value={postData.title} />
            <PostEditInput id="author" bind:value={postData.author} />
            <!-- TODO: type="date" -->
            <PostEditInput id="date" bind:value={postData.date} />
            <PostEditInput id="pinned" bind:value={postData.pinned} type="checkbox" />
          </div>
        </svelte:fragment>
      </AccordionItem>
    </Accordion>
    <EasyMde bind:md />
  </div>
</div>
