<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type EasyMDE from "easymde";

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

<textarea name="md" class="rounded-container-token w-full" bind:this={textarea} value={md} />

<style global>
  .CodeMirror {
    @apply !bg-transparent !text-inherit selection:!bg-inherit;
  }

  .CodeMirror,
  .editor-toolbar {
    @apply !border-text;
  }

  .editor-preview {
    @apply !bg-background;
  }

  .CodeMirror-cursor {
    @apply !border-text/80;
  }

  .editor-toolbar button {
    @apply !rounded-sm;
  }

  .editor-toolbar button.active,
  .editor-toolbar button:hover {
    @apply border-primary bg-primary/20;
  }

  .CodeMirror-selected {
    @apply !bg-primary/60;
  }

  .cm-comment {
    @apply font-mono;
  }
</style>
