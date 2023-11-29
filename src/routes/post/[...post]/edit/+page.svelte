<script lang="ts">
  import { createDialog, melt } from "@melt-ui/svelte";
  import { base } from "$app/paths";
  import { applyAction, deserialize } from "$app/forms";
  import { goto } from "$app/navigation";
  import { fade, fly } from "svelte/transition";
  import { writable } from "svelte/store";

  import Carta from "$lib/components/Carta.svelte";
  import PageTitle from "$lib/components/PageTitle.svelte";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import { editField } from "$lib/components/actions";
  import { localeDateFromString } from "$lib/utils/date";
  import { nextUpdate } from "$lib/utils/nextStoreUpdate";
  import { addToast } from "$lib/components/Toaster.svelte";

  import Pin from "~icons/mdi/pin";
  import Save from "~icons/mdi/content-save-edit";
  import Alert from "~icons/mdi/alert";

  import "carta-md/default.css"; /* Default theme */
  import "carta-md/light.css"; /* Markdown input theme */

  export let data;

  let { md, data: postData } = data;
  $: localeDate = localeDateFromString(postData.date ?? "");

  let editUrl = postData.url;

  let form: HTMLFormElement;

  const confirmedDelete = writable<boolean>(false);

  const {
    elements: { overlay, content, title, description, close, portalled },
    states: { open }
  } = createDialog({
    forceVisible: true,
    role: "alertdialog"
  });

  async function formAction(action: string) {
    const res = await fetch(action, {
      method: "POST",
      body: new FormData(form)
    });
    const result = deserialize(await res.text());
    applyAction(result);
  }

  async function savePost() {
    await formAction("?/save");

    addToast({ data: { title: "Post is Saved" } });
  }

  async function deletePost() {
    open.set(true);
    if (!(await nextUpdate(confirmedDelete))) return;

    await formAction("?/delete");

    addToast({ data: { title: "Post Deleted" } });

    goto(`${base}/post`);
  }
</script>

<CenteredPage>
  <div id="post-content" class="relative flex w-full max-w-screen-xl flex-col gap-4">
    <PageTitle current="postEdit" title={postData.title}>
      <div class="icon-flex">
        {#if postData.pinned}
          <Pin class="h-4 w-4 text-primary" />
        {/if}
        <span>
          {postData.pinned && !postData.author && !postData.date ? "Pinned" : ""}
          {postData.author ? `By ${postData.author}` : ""}
          {postData.author && postData.date ? "/" : ""}
          {localeDate}
        </span>
      </div>

      <div slot="title" class="flex flex-grow basis-0 flex-wrap justify-end gap-2">
        <button class="icon-flex icon btn-accent" on:click={savePost}>
          <Save class="h-4 w-4" />
          Save
        </button>
        <button class="icon-flex btn-text" on:click={deletePost}>
          <Alert class="h-4 w-4" />
          Delete
        </button>
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
          class="fixed left-1/2 top-1/2 z-top max-h-screen w-full max-w-lg -translate-x-1/2
            -translate-y-1/2 rounded border border-accent/60 bg-background p-6
            shadow-glow-sm shadow-accent/60"
          use:melt={$content}
          transition:fly={{ duration: 150, y: 10 }}
        >
          <h2 use:melt={$title} class="text-lg font-bold">DELETE POST</h2>
          <p use:melt={$description} class="leading-normal text-text/80">
            You're deleting this post, confirm with caution!<br />
            The post ain't coming back after this!
          </p>

          <div class="mt-6 flex justify-end gap-4">
            <button use:melt={$close} class="btn-text opacity-80">Cancel</button>
            <button
              use:melt={$close}
              class="btn-accent"
              on:m-click={() => ($confirmedDelete = true)}>Confirm</button
            >
          </div>
        </div>
      {/if}
    </div>

    <form id="post-edit" class="space-y-4" bind:this={form}>
      <section class="grid grid-cols-2 gap-6">
        <input
          use:editField={{ id: "url", label: "URL", className: "col-span-2" }}
          class="block w-full border-0 border-b border-text/60 bg-transparent px-2 transition-colors focus:border-accent focus:ring-0"
          bind:value={editUrl}
        />
        <input
          use:editField={{ id: "title", label: "Title" }}
          class="block w-full border-0 border-b border-text/60 bg-transparent px-2 transition-colors focus:border-accent focus:ring-0"
          bind:value={postData.title}
        />
        <input
          use:editField={{ id: "author", label: "Author" }}
          class="block w-full border-0 border-b border-text/60 bg-transparent px-2 transition-colors focus:border-accent focus:ring-0"
          bind:value={postData.author}
        />
        <input
          use:editField={{ id: "date", label: "Date" }}
          class="block w-full border-0 border-b border-text/60 bg-transparent px-2 transition-colors focus:border-accent focus:ring-0"
          type="date"
          bind:value={postData.date}
        />
        <input
          use:editField={{ id: "image", label: "Image" }}
          class="block w-full border-0 border-b border-text/60 bg-transparent px-2 transition-colors focus:border-accent focus:ring-0"
          bind:value={postData.image}
        />
        <input
          use:editField={{ id: "desc", label: "Description" }}
          class="block w-full border-0 border-b border-text/60 bg-transparent px-2 transition-colors focus:border-accent focus:ring-0"
          bind:value={postData.desc}
        />
        <input
          use:editField={{ id: "pinned", label: "Pinned" }}
          class="block h-4 w-4 rounded border-text/60 bg-transparent text-primary focus:ring-accent/60"
          type="checkbox"
          bind:checked={postData.pinned}
        />
      </section>

      <Carta bind:value={md} />
    </form>
  </div>
</CenteredPage>
