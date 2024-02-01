<script lang="ts">
  import { base } from "$app/paths";
  import { applyAction, deserialize } from "$app/forms";
  import { goto } from "$app/navigation";
  import { fade, fly } from "svelte/transition";
  import { localeDateFromString } from "$lib/utils/date";
  import { addToast } from "$lib/components/Toaster.svelte";
  import { editField } from "$lib/components/actions";
  import * as m from "$paraglide/messages";

  import { Dialog } from "bits-ui";
  import Carta from "$lib/components/Carta.svelte";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import Pin from "~icons/mdi/pin";
  import Save from "~icons/mdi/content-save-edit";
  import Alert from "~icons/mdi/alert";

  export let data;

  let { md, data: postData } = data;
  $: localeDate = localeDateFromString(postData.date ?? "");

  let editUrl = postData.url;

  let form: HTMLFormElement;

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

    addToast({ data: { title: m.post_saveMessage() } });
  }

  async function deletePost() {
    // INFO: the user has confirmed it!
    await formAction("?/delete");

    addToast({ data: { title: m.post_deleteMessage() } });

    goto(`${base}/post`);
  }

  let deleteDialogOpen = false;
</script>

<CenteredPage current="postEdit" title={postData.title}>
  <!-- post info, under the title -->
  <div slot="title" class="icon-flex">
    {#if postData.pinned}
      <Pin class="h-4 w-4 text-primary" />
    {/if}
    <span>
      {postData.pinned && !postData.author && !postData.date ? m.post_pinned() : ""}
      {postData.author ? m.post_postedBy({ user: postData.author }) : ""}
      {postData.author && postData.date ? "/" : ""}
      {localeDate}
    </span>
  </div>

  <!-- controls -->
  <div class="absolute right-4 top-8 flex flex-grow basis-0 flex-wrap gap-2">
    <button class="icon-flex icon btn-accent" on:click={savePost}>
      <Save class="h-4 w-4" />
      {m.post_savePost()}
    </button>
    <!-- do confirm delete -->
    <button class="icon-flex btn-text" on:click={() => (deleteDialogOpen = true)}>
      <Alert class="h-4 w-4" />
      {m.post_deletePost()}
    </button>
  </div>

  <Dialog.Root bind:open={deleteDialogOpen}>
    <Dialog.Portal>
      <Dialog.Overlay
        class="fixed inset-0 z-top bg-background/60"
        transition={fade}
        transitionConfig={{ duration: 150 }}
      />
      <Dialog.Content
        class="fixed left-1/2 top-1/2 z-top max-h-screen w-full max-w-lg
               -translate-x-1/2 -translate-y-1/2 rounded border border-accent/60 bg-background
               p-6 shadow-glow-sm shadow-accent/60"
        transition={fly}
        transitionConfig={{ duration: 150, y: 10 }}
      >
        <Dialog.Title class="text-lg font-bold">DELETE POST</Dialog.Title>
        <Dialog.Description class="whitespace-pre-wrap leading-normal text-text/80">
          {m.post_deleteConfirmation()}
        </Dialog.Description>
        <div class="mt-6 flex justify-end gap-4">
          <Dialog.Close class="btn-text opacity-80">
            {m.dialogCancel()}
          </Dialog.Close>
          <Dialog.Close class="btn-accent" on:click={() => deletePost()}>
            {m.dialogConfirm()}
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>

  <!-- fields inputs -->
  <form id="post-edit" class="space-y-4" bind:this={form}>
    <section class="grid grid-cols-2 gap-6">
      <input
        use:editField={{ id: "url", label: m.post_fieldUrl(), className: "col-span-2" }}
        class="block w-full border-0 border-b border-text/60 bg-transparent px-2 transition-colors focus:border-accent focus:ring-0"
        bind:value={editUrl}
      />
      <input
        use:editField={{ id: "title", label: m.post_fieldTitle() }}
        class="block w-full border-0 border-b border-text/60 bg-transparent px-2 transition-colors focus:border-accent focus:ring-0"
        bind:value={postData.title}
      />
      <input
        use:editField={{ id: "author", label: m.post_fieldAuthor() }}
        class="block w-full border-0 border-b border-text/60 bg-transparent px-2 transition-colors focus:border-accent focus:ring-0"
        bind:value={postData.author}
      />
      <input
        use:editField={{ id: "date", label: m.post_fieldDate() }}
        class="block w-full border-0 border-b border-text/60 bg-transparent px-2 transition-colors focus:border-accent focus:ring-0"
        type="date"
        bind:value={postData.date}
      />
      <input
        use:editField={{ id: "image", label: m.post_fieldImage() }}
        class="block w-full border-0 border-b border-text/60 bg-transparent px-2 transition-colors focus:border-accent focus:ring-0"
        bind:value={postData.image}
      />
      <input
        use:editField={{ id: "desc", label: m.post_fieldDescription() }}
        class="block w-full border-0 border-b border-text/60 bg-transparent px-2 transition-colors focus:border-accent focus:ring-0"
        bind:value={postData.desc}
      />
      <input
        use:editField={{ id: "pinned", label: m.post_fieldPinned() }}
        class="block h-4 w-4 rounded border-text/60 bg-transparent text-primary focus:ring-accent/60"
        type="checkbox"
        bind:checked={postData.pinned}
      />
    </section>

    <!-- markdown editor -->
    <Carta bind:value={md} />
  </form>
</CenteredPage>
