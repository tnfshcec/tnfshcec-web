<script lang="ts" context="module">
  export type SectionAction = {
    name: string;
    action: (e: Event) => void;
  };
</script>

<script lang="ts">
  import { fadeIn, fadeOut, flyIn, flyOut } from "$lib/utils/transitions";

  export let title: string;
  export let action: SectionAction | undefined = undefined;
</script>

<section class="relative">
  <h1 class="mb-3 h1" id={title.replaceAll(" ", "-")} in:fadeIn out:fadeOut># {title}</h1>

  <div in:flyIn={{ x: 20 }} out:flyOut={{ x: -20 }}>
    <slot />
  </div>

  {#if action}
    <button
      class="absolute right-2 top-2 btn variant-filled-primary"
      on:click={action.action}
      in:fadeIn
      out:fadeOut
    >
      {action.name}
    </button>
  {/if}
</section>
