<script context="module" lang="ts">
  export type Page = "homepage" | "postList" | "post" | "postEdit";
  type PageNavigation = {
    [key in Page]: {
      url: string;
      title: string | undefined;
      path: readonly Page[];
    };
  };
</script>

<script lang="ts">
  import { base } from "$app/paths";
  import * as m from "$paraglide/messages";
  import ChevronRight from "~icons/mdi/chevron-right";

  const navigate = {
    homepage: { url: "", title: m.home(), path: [] },
    postList: { url: "post", title: m.post_list(), path: ["homepage"] },
    post: { url: "post", title: undefined, path: ["homepage", "postList"] },
    postEdit: { url: "post/", title: undefined, path: ["homepage", "postList", "post"] }
  } as const satisfies PageNavigation;

  export let current: Page;
  export let title: string | undefined = undefined;

  if (!title) title = navigate[current].title;
</script>

<header class="flex flex-col justify-center">
  <span>
    {#each navigate[current].path as page}
      <span class="transition-colors hover:text-accent">
        <a href="{base}/{navigate[page].url}">
          {navigate[page].title ?? title}
        </a>
        <ChevronRight class="inline h-4 w-4" />
      </span>
    {/each}
  </span>
  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold">{title}</h1>
  </div>

  <slot />
</header>
