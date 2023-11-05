<script lang="ts">
  import { base } from "$app/paths";
  import { applyAction, deserialize } from "$app/forms";
  import { goto } from "$app/navigation";

  import EasyMde from "$lib/components/EasyMde.svelte";
  import PageTitle from "$lib/components/PageTitle.svelte";
  import { editField, withIcon } from "$lib/components/actions";
  import { localeDateFromString } from "$lib/utils/date";

  import Pin from "~icons/mdi/pin";
  import Save from "~icons/mdi/content-save-edit";
  import Alert from "~icons/mdi/alert";

  export let data;

  let { md, data: postData } = data;
  $: localeDate = localeDateFromString(postData.date ?? "");

  let editUrl = postData.url;

  async function handleSubmit(e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
    const formData = new FormData(e.currentTarget);
    const submitter = e.submitter as HTMLButtonElement;

    const isDeleting = submitter.formAction.endsWith("/delete");

    if (isDeleting) {
      const r = await new Promise<boolean>((resolve) => {
        // modalStore.trigger({
        //   type: "confirm",
        //   title: "DELETE",
        //   body: "You are deleting the post!",
        //   response: resolve
        // });
        resolve(true);
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
    // toastStore.trigger({
    //   message,
    //   hideDismiss: true,
    //   background
    // });

    // TODO: modal and toaster

    if (isDeleting) {
      goto(`${base}/post`);
    }
  }
</script>

<div class="flex w-full p-4">
  <!-- left space -->
  <div class="flex-1" />

  <!-- right space (TOC) -->
  <div class="order-last flex-1" />

  <div id="post-content" class="relative flex w-full max-w-screen-xl flex-col gap-4">
    <PageTitle current="post" title={postData.title}>
      <div use:withIcon>
        {#if postData.pinned}
          <Pin class="h-4 w-4 text-primary" />
        {/if}
        {postData.author ? `By ${postData.author}` : ""}
        {postData.author && postData.date ? "/" : ""}
        {localeDate}
      </div>
    </PageTitle>

    <div class="absolute right-4 top-10 flex gap-2">
      <button
        class="rounded border border-accent/80 p-2 text-accent transition-all hover:border-accent hover:shadow-glow hover:shadow-accent/40"
        form="post-edit"
        formaction="?/save"
        use:withIcon
      >
        <Save class="h-4 w-4" />
        Save
      </button>
      <button
        class="rounded border border-text/80 p-2 text-text transition-all hover:border-text hover:shadow-glow hover:shadow-text/40"
        form="post-edit"
        formaction="?/delete"
        use:withIcon
      >
        <Alert class="h-4 w-4" />
        Delete
      </button>
    </div>

    <form id="post-edit" class="space-y-4" method="POST" on:submit|preventDefault={handleSubmit}>
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

      <EasyMde bind:md />
    </form>
  </div>
</div>
