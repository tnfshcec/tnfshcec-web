<script lang="ts" context="module">
  export type SectionAction = {
    name: string;
    action: (e: Event) => void;
  };
</script>

<script lang="ts">
  import { fadeIn, fadeOut } from "$lib/utils/transitions";

  export let title: string;
  export let action: SectionAction | undefined = undefined;
</script>

<section class="relative" in:fadeIn out:fadeOut>
  <h1 class="mb-3 h1" id={title.replaceAll(" ", "-")}># {title}</h1>

  <slot />

  {#if action}
    <button class="absolute right-2 top-2 btn variant-filled-primary" on:click={action.action}>
      {action.name}
    </button>
  {/if}
</section>
