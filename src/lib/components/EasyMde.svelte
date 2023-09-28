<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import "easymde/dist/easymde.min.css";

  export let md: string;

  let textarea: HTMLTextAreaElement;
  let easymde: EasyMDE | undefined;

  onMount(async () => {
    const EasyMDE = await import("easymde").then((m) => m.default);

    easymde = new EasyMDE({
      element: textarea,
      initialValue: md,
      hideIcons: ["fullscreen", "side-by-side"],
      spellChecker: false,
      forceSync: true,
      previewClass: ["editor-preview", "prose"]
    });
    // TODO: render custom components on preview

    easymde.codemirror.on("change", () => (md = (easymde as EasyMDE).value()));
  });

  onDestroy(() => {
    if (easymde) easymde.cleanup();
  });
</script>

<textarea name="md" bind:this={textarea} />
