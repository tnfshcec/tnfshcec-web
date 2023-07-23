<script lang="ts">
  import { fadeIn, fadeOut } from "$lib/utils/transitions.js";
  import type EasyMDE from "easymde";
  import { onDestroy, onMount } from "svelte";

  export let data;

  let textarea: HTMLTextAreaElement;
  let easymde: EasyMDE | undefined;

  onMount(async () => {
    const EasyMDE = await import("easymde").then((m) => m.default);
    await import("easymde/dist/easymde.min.css");

    easymde = new EasyMDE({
      element: textarea,
      initialValue: data.md,
      hideIcons: ["fullscreen", "side-by-side"],
      spellChecker: false,
      previewClass: ["editor-preview", "prose"]
    });
  });

  onDestroy(() => {
    if (easymde) easymde.cleanup();
  });
</script>

<div class="flex flex-col gap-4 md:py-4 xl:flex-row">
  <div class="flex-1" />
  <div class="flex-1 order-last" />

  <div
    class="flex-none self-center p-4 card w-full max-w-screen-md md:shadow-lg"
    in:fadeIn
    out:fadeOut
  >
    <textarea bind:this={textarea} />
  </div>
</div>
