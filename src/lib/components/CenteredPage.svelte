<script lang="ts">
  import { page } from "$app/stores";
  import { getPageInfo } from "$lib/utils/pageInfo";
  import ChevronRight from "~icons/mdi/chevron-right";

  const info = getPageInfo($page.url.pathname);
</script>

<div class="flex w-full p-4">
  <div class="flex-1">
    <slot name="left" />
  </div>

  <div class="relative flex w-full min-w-0 max-w-screen-xl flex-col gap-4">
    <!-- page title -->
    <nav class="flex flex-col justify-center">
      <span>
        {#each info.path as page}
          <span class="transition-colors hover:text-accent">
            <a href={page}>
              {getPageInfo(page).pageTitle}
            </a>
            <ChevronRight class="inline h-4 w-4" />
          </span>
        {/each}
      </span>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">{info.pageTitle}</h1>
      </div>
      <slot name="title" />
    </nav>

    <slot />
  </div>

  <div class="order-last flex-1">
    <slot name="right" />
  </div>
</div>
