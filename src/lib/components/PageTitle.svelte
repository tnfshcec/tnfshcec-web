<script lang="ts">
  import { base } from "$app/paths";
  import ChevronRight from "~icons/mdi/chevron-right";

  type Page = "homepage" | "postList" | "post";
  type PageNavigation = {
    [key in Page]: {
      url: string;
      title: string;
      path: readonly Page[];
    };
  };

  const navigate = {
    homepage: { url: "", title: "首頁", path: [] },
    postList: { url: "post", title: "最新消息", path: ["homepage"] },
    post: { url: "post", title: "", path: ["homepage", "postList"] }
  } as const satisfies PageNavigation;

  export let current: Page;
  export let title: string = navigate[current].title;
</script>

<div class="flex flex-col justify-center">
  <div class="flex items-center">
    {#each navigate[current].path as page}
      <div class="transition-colors hover:text-accent">
        <a href="{base}/{navigate[page].url}">
          {navigate[page].title}
        </a>
        <ChevronRight class="inline h-4 w-4" />
      </div>
    {/each}
  </div>
  <h1 class="text-3xl font-bold">{title}</h1>
</div>
