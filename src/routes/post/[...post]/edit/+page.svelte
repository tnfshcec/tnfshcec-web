<script lang="ts">
  import PostEditInput from "$lib/components/postEditInput.svelte";
  import EasyMde from "$lib/components/EasyMde.svelte";
  import { localeDateFromString } from "$lib/utils/date.js";
  import { fadeIn, fadeOut } from "$lib/utils/transitions.js";
  import { Accordion, AccordionItem, toastStore } from "@skeletonlabs/skeleton";
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";

  export let data;

  let { md, data: postData } = data;
  $: localeDate = localeDateFromString(postData.date ?? "");

  let editUrl = postData.url;

  async function savePost() {
    const currentUrl = postData.url;
    postData.url = editUrl;

    const fmData = Object.fromEntries(Object.entries(postData).filter(([_k, v]) => v !== ""));
    console.log("saving with data: ", fmData);

    const res = await fetch(`${base}/api/post?path=${editUrl}`, {
      method: "POST",
      body: JSON.stringify({ data: fmData, md })
    });

    if (res.ok) {
      toastStore.trigger({
        message: "Edit saved.",
        classes: "!rounded-full",
        hideDismiss: true
      });
    } else {
      toastStore.trigger({
        message: "Save action was not successful. Try doing it again later.",
        background: "variant-filled-error",
        classes: "!rounded-full",
        hideDismiss: true
      });
    }

    if (currentUrl !== editUrl) {
      await fetch(`${base}/api/post?path=${currentUrl}`, {
        method: "DELETE"
      });
      await goto(`${base}/post/${editUrl}/edit`);
    }
  }
</script>

<div class="flex flex-col gap-4 md:py-4 xl:flex-row">
  <div
    class="fixed top-0 w-full h-2/3 -z-50 bg-cover"
    style="background-image: url({postData.image}); mask-image: linear-gradient(to bottom, white, 70%, transparent 95%);"
    in:fadeIn
    out:fadeOut
  />
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
        {postData.author && localeDate ? "/" : ""}
        {localeDate || ""}
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
