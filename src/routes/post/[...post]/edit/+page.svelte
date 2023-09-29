<script lang="ts">
  import { getModalStore, getToastStore, type SvelteEvent } from "@skeletonlabs/skeleton";
  import { base } from "$app/paths";
  import { applyAction, deserialize, enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";

  import { localeDateFromString } from "$lib/utils/date.js";
  import { fadeIn, fadeOut } from "$lib/utils/transitions.js";
  import PostEditInput from "$lib/components/postEditInput.svelte";
  import EasyMde from "$lib/components/EasyMde.svelte";
  import PostMetadataExpand from "$lib/components/PostMetadataExpand.svelte";
  import Pin from "~icons/mdi/pin";
  import LeftCircleOutline from "~icons/mdi/chevron-left-circle-outline";
  import { goto } from "$app/navigation";

  export let data;

  const toastStore = getToastStore();
  const modalStore = getModalStore();

  let { md, data: postData } = data;
  $: localeDate = localeDateFromString(postData.date ?? "");

  let editUrl = postData.url;

  async function handleSubmit(e: SvelteEvent<SubmitEvent, HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const submitter = e.submitter as HTMLButtonElement;

    const isDeleting = submitter.formAction.endsWith("/delete");

    if (isDeleting) {
      const r = await new Promise<boolean>((resolve) => {
        modalStore.trigger({
          type: "confirm",
          title: "DELETE",
          body: "You are deleting the post!",
          response: resolve
        });
      });
      if (!r) return;
    }

    const res = await fetch(submitter.formAction, {
      method: "POST",
      body: formData
    });
    const result = deserialize(await res.text());

    applyAction(result);

    const message = isDeleting ? "Post deleted." : "Post is saved.";
    const background = isDeleting ? "variant-filled-warning" : "variant-filled-primary";
    toastStore.trigger({
      message,
      hideDismiss: true,
      background
    });

    if (isDeleting) {
      goto(`${base}/post`);
    }
  }
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
        <a href="{base}/post/{postData.url}" class="btn-icon btn-icon-sm hover:variant-soft">
          <LeftCircleOutline width="100%" height="100%" class="text-surface-600-300-token inline" />
        </a>
        <span>{postData.title}</span>
      </h1>

      <div class="absolute top-4 right-2 space-x-2">
        <button class="btn variant-filled-primary" form="post-edit" formaction="?/save">
          Save
        </button>
        <button class="btn variant-filled-warning" form="post-edit" formaction="?/delete">
          DELETE
        </button>
      </div>
    </header>
    <form id="post-edit" method="POST" on:submit|preventDefault={handleSubmit}>
      <PostMetadataExpand>
        <svelte:fragment slot="summary">Post Metadata</svelte:fragment>
        <svelte:fragment slot="content">
          <div class="grid grid-cols-2 gap-6">
            <PostEditInput
              id="url"
              bind:value={editUrl}
              className="col-span-2"
              validate={(v) => Boolean(v)}
            />
            <PostEditInput id="title" bind:value={postData.title} />
            <PostEditInput id="author" bind:value={postData.author} />
            <PostEditInput id="date" type="date" bind:value={postData.date} />
            <PostEditInput id="image" bind:value={postData.image} />
            <PostEditInput id="desc" label="Description" bind:value={postData.desc} />
            <PostEditInput id="pinned" type="checkbox" bind:value={postData.pinned} />
          </div>
        </svelte:fragment>
      </PostMetadataExpand>
      <EasyMde bind:md />
    </form>
  </div>
</div>
