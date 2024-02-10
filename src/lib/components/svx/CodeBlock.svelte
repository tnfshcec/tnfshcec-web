<script lang="ts">
  import ContentCopy from "~icons/mdi/content-copy";
  import Check from "~icons/mdi/text-box-check";

  export let title: string = "";
  export let nocopy: boolean = false;

  let copyButton: HTMLButtonElement;
  let copied = false;
  let copiedTimeout: NodeJS.Timeout | undefined;

  function copy() {
    const preElement = copyButton.nextElementSibling;

    if (preElement instanceof HTMLElement) {
      navigator.clipboard.writeText(preElement.innerText);
      copied = true;

      clearTimeout(copiedTimeout);
      copiedTimeout = setTimeout(() => (copied = false), 1000);
    }
  }
</script>

<div class="relative rounded-sm bg-secondary">
  {#if title}
    <span class="mx-4 inline-block py-1">{title}</span>
  {/if}

  {#if !nocopy}
    <button
      class="absolute right-2 top-2 rounded-sm border-text/20 bg-secondary/50
             {title ? 'p-1' : 'border p-2'}"
      bind:this={copyButton}
      on:click={copy}
      aria-label="copy"
    >
      {#if !copied}
        <ContentCopy class="h-4 w-4" />
      {:else}
        <Check class="h-4 w-4" />
      {/if}
    </button>
  {/if}

  <slot />
</div>
