<script lang="ts">
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
  import {
    TableOfContents,
    drawerStore,
    modalStore,
    popup,
    toastStore,
    type PopupSettings
  } from "@skeletonlabs/skeleton";
  import MenuOpen from "~icons/mdi/menu-open";
  import PlaylistEdit from "~icons/mdi/playlist-edit";
  import Pin from "~icons/mdi/pin";

  import { fadeIn, fadeOut, flyIn, flyOut } from "$lib/utils/transitions";
  import { rawPlugin, codeBlockPlugin, componentsPlugin } from "$lib/utils/exmarkdown-plugins";
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";
  import { localeDateFromString } from "$lib/utils/date.js";

  export let data;
  let {
    md,
    data: { title, author, date, image, pinned, url }
  } = data;
  let localeDate = localeDateFromString(date ?? "");

  let adminPopup: PopupSettings = {
    event: "click",
    target: "admin-popup",
    placement: "bottom"
  };

  function tocDrawer() {
    drawerStore.open({ id: "post-toc", width: "auto", regionDrawer: "p-4" });
  }

  async function deletePost() {
    modalStore.trigger({
      type: "confirm",
      title: "YOU'RE DELETING THE POST",
      body: "proceed?",
      response: async (r: boolean) => {
        if (r) {
          const res = await fetch(`${base}/api/post?path=${url}`, {
            method: "DELETE"
          });
          if (res.ok) {
            toastStore.trigger({
              message: "DELETE SUCCESSFUL. You will no longer see the post.",
              classes: "rounded-full",
              hideDismiss: true
            });
            await goto(base || "/");
          } else {
            toastStore.trigger({
              message: "Delete failed. Try doing it again later.",
              background: "variant-filled-error",
              classes: "rounded-full",
              hideDismiss: true
            });
          }
        }
      }
    });
  }
</script>

<div class="flex flex-col py-4 xl:gap-4 xl:flex-row">
  <div
    class="fixed top-0 w-full h-2/3 -z-50 bg-cover variant-glass"
    style="background-image: url({image}); mask-image: linear-gradient(to bottom, white, 70%, transparent 95%);"
    in:fadeIn
    out:fadeOut
  />
  <div class="flex-1" in:fadeIn out:fadeOut />

  <div class="flex-1 order-last" in:fadeIn out:fadeOut>
    <!-- TODO: text might have contrast issue with background -->
    <TableOfContents
      target="#post-content"
      spacing="space-y-4 p-2 sticky top-4 hidden rounded-xl backdrop-blur bg-surface-50/50 dark:bg-surface-900/50 xl:block"
    />
  </div>

  <div
    id="post-content"
    class="flex-none self-center p-4 card w-full space-y-4 max-w-screen-md shadow-lg"
    in:flyIn={{ y: 100 }}
    out:flyOut={{ y: -100 }}
  >
    <header class="card-header relative">
      <span class="block text-surface-600-300-token">
        {#if pinned}
          <Pin class="inline -mt-1 text-primary-500-400-token" />
        {/if}
        {author || ""}
        {author && localeDate ? "/" : ""}
        {localeDate || ""}
      </span>
      <h1 class="h1">
        <button
          class="btn-icon btn-icon-sm hover:variant-soft md:btn-icon-base xl:hidden"
          on:click={tocDrawer}
        >
          <MenuOpen width="100%" height="100%" class="text-surface-600-300-token inline" />
        </button>
        {title}
      </h1>

      {#if data.session?.user?.role === "admin"}
        <button
          class="btn-icon btn-icon-sm variant-soft-surface absolute top-4 right-2 p-1"
          use:popup={adminPopup}
        >
          <PlaylistEdit width="100%" height="100%" class="text-surface-600-300-token" />
        </button>

        <div data-popup="admin-popup">
          <div class="btn-group-vertical variant-ghost-primary">
            <a href="{base}/post/{url}/edit">Edit</a>
            <button class="!text-error-300-600-token" on:click={deletePost}>Delete</button>
          </div>
        </div>
      {/if}
    </header>
    <section class="p-4 space-y-4 !max-w-none prose">
      <Markdown {md} plugins={[gfmPlugin, rawPlugin, codeBlockPlugin, componentsPlugin]} />
    </section>
  </div>
</div>
