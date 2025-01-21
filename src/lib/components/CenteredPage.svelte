<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot making the component unusable -->
<script lang="ts">
  import ChevronRight from "~icons/mdi/chevron-right";
  import * as m from "$paraglide/messages";
  import { base } from "$app/paths";

  const breadcrumbPages = {
    home: {
      name: m.home(),
      url: `${base}/`
    },
    postList: {
      name: m.post_list(),
      url: `${base}/post`
    }
  };

  export let breadcrumb: (keyof typeof breadcrumbPages)[] = [];
  export let title: string;
</script>

<div class="flex w-full p-4">
  <div class="flex-1">
    <slot name="left" />
  </div>

  <div
    class="relative flex w-full min-w-0 max-w-screen-md flex-col gap-4 break-words [&_*]:max-w-full"
  >
    <!-- page title -->
    <nav class="flex flex-col justify-center">
      <span>
        {#each breadcrumb as page}
          <span class="transition-colors hover:text-accent">
            <a href={breadcrumbPages[page].url}>
              {breadcrumbPages[page].name}
            </a>
            <ChevronRight class="inline h-4 w-4" />
          </span>
        {/each}
      </span>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">{title}</h1>
      </div>
      <slot name="title" />
    </nav>

    <slot />
  </div>

  <div class="order-last flex-1">
    <slot name="right" />
  </div>
</div>
