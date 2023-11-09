<!-- https://www.melt-ui.com/docs/builders/toast -->
<script lang="ts" context="module">
  export type ToastData = {
    title: string;
    description?: string;
  };

  const {
    elements: { content, title, description, close },
    helpers,
    states: { toasts },
    actions: { portal }
  } = createToaster<ToastData>();

  export const addToast = helpers.addToast;
</script>

<script lang="ts">
  import { createToaster, melt } from "@melt-ui/svelte";
  import { fly } from "svelte/transition";
</script>

<div
  class="fixed bottom-0 left-1/2 z-top flex -translate-x-1/2 flex-col items-end gap-4"
  use:portal
>
  {#each $toasts as { id, data } (id)}
    <div
      use:melt={$content(id)}
      in:fly={{ duration: 150, y: "100%" }}
      out:fly={{ duration: 150, y: "100%" }}
      class="m-4 rounded bg-accent/80 px-4 py-2 text-background shadow-glow shadow-accent/60"
    >
      <h2 use:melt={$title(id)}>
        {data.title}
      </h2>
      {#if data.description}
        <div use:melt={$description(id)}>
          {data.description}
        </div>
      {/if}
    </div>
  {/each}
</div>
