<script lang="ts" context="module">
  export type SectionAction = {
    name: string;
    action: string;
  };
</script>

<script lang="ts">
  import { enhance } from "$app/forms";

  import { fadeIn, fadeOut } from "$lib/utils/transitions";

  export let title: string;
  export let action: SectionAction | undefined = undefined;
</script>

<section class="relative" in:fadeIn out:fadeOut>
  <h1 class="mb-3 h1" id={title.replaceAll(" ", "-")}># {title}</h1>

  <slot />

  {#if action}
    <form class="absolute right-2 top-2" method="POST" action={action.action} use:enhance>
      <button class="btn variant-filled-primary">
        {action.name}
      </button>
    </form>
  {/if}
</section>
