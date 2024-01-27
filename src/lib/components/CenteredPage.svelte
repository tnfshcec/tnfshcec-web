<script lang="ts">
  import PageTitle, { type Page } from "./PageTitle.svelte";

  export let current: Page;
  export let title: string | undefined;
</script>

<div class="flex w-full p-4">
  <div class="flex-1">
    <slot name="left" />
  </div>

  <div class="relative flex w-full min-w-0 max-w-screen-xl flex-col gap-4">
    <PageTitle {current} {title}>
      <slot name="title" />
    </PageTitle>
    <slot />
  </div>

  <div class="order-last flex-1">
    <slot name="right" />
  </div>
</div>
