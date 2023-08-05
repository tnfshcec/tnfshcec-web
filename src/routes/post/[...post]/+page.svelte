<script lang="ts">
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
  import {
    TableOfContents,
    modalStore,
    drawerStore,
    popup,
    type PopupSettings
  } from "@skeletonlabs/skeleton";

  import { fadeIn, fadeOut, flyIn, flyOut } from "$lib/utils/transitions";
  import { rawPlugin, codeBlockPlugin, componentsPlugin } from "$lib/utils/exmarkdown-plugins";
  import { localeDate } from "$lib/utils/date.js";
  import { base } from "$app/paths";

  export let data;
  let {
    md,
    data: { title, author, pinned, url }
  } = data;

  let date = localeDate(data.data.date);

  let adminPopup: PopupSettings = {
    event: "click",
    target: "admin-popup",
    placement: "bottom"
  };

  function tocDrawer() {
    drawerStore.open({ id: "post-toc", width: "auto", regionDrawer: "p-4" });
  }

  function deletePost() {
    modalStore.trigger({
      type: "confirm",
      title: "YOU'RE DELETING THE POST",
      body: "proceed?",
      response: async (r: boolean) => {
        if (r)
          await fetch(`${base}/api/post?path=${url}`, {
            method: "DELETE"
          });
      }
    });
  }
</script>

<div class="flex flex-col gap-4 md:py-4 xl:flex-row">
  <div class="flex-1" in:fadeIn out:fadeOut />

  <div class="flex-1 order-last" in:fadeIn out:fadeOut>
    <TableOfContents target="#post-content" spacing="space-y-4 sticky top-4 hidden xl:block" />
  </div>

  <div
    id="post-content"
    class="flex-none self-center p-4 card w-full space-y-4 max-w-screen-md md:shadow-lg"
    in:flyIn={{ y: 100 }}
    out:flyOut={{ y: -100 }}
  >
    <header class="card-header relative">
      <span class="block text-surface-600-300-token">
        {pinned ? "📌" : ""}
        {author || ""}
        {author && date ? "/" : ""}
        {date || ""}
      </span>
      <h1 class="h1">
        <button
          class="btn-icon btn-icon-sm hover:variant-soft md:btn-icon-base xl:hidden"
          on:click={tocDrawer}
        >
          <svg
            viewBox="0 0 24 24"
            class="stroke-surface-600 dark:stroke-surface-300 fill-none inline mb-1 mx-1"
          >
            <path d="M20 7L4 7" stroke-width="1.5" stroke-linecap="round" />
            <path d="M15 12L4 12" stroke-width="1.5" stroke-linecap="round" />
            <path d="M9 17H4" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>
        {title}
      </h1>

      {#if data.session?.user?.role === "admin"}
        <button
          class="btn-icon btn-icon-sm variant-soft-surface absolute top-4 right-2 p-1"
          use:popup={adminPopup}
        >
          <svg viewBox="0 0 24 24" class="stroke-surface-600 dark:stroke-surface-300 stroke-2">
            <path d="M10 16H3" stroke-width="1.5" stroke-linecap="round" />
            <path
              d="M14 15L17.5 18L21 15"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M20 11L3 11" stroke-width="1.5" stroke-linecap="round" />
            <path d="M3 6L13.5 6M20 6L17.75 6" stroke-width="1.5" stroke-linecap="round" />
          </svg>
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
