<!-- card for each post-->
<script lang="ts">
  import Pin from "~icons/mdi/pin";
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { fly } from "svelte/transition";
  import { localeDate } from "$lib/utils/date";

  interface Props {
    post: App.PostData;
    displayTags?: boolean;
  }

  let { post, displayTags = false }: Props = $props();

  let date = localeDate(post.date);

  function gotoTag(event: MouseEvent, tag: string) {
    event.preventDefault();
    const url = page.url;
    url.searchParams.set("tags", tag);
    goto(url);
  }
</script>

<a
  class="bg-secondary hover:shadow-glow hover:shadow-secondary/80 grid w-full grid-cols-[1fr_fit-content(40%)] gap-2 rounded px-4 py-6 transition-all motion-safe:hover:scale-[1.01]"
  href="{base}/post/{post.slug}"
  transition:fly={{ y: 10, duration: 250 }}
>
  <header class="icon-flex text-lg font-bold">
    {#if post.pinned}
      <Pin class="text-primary h-5 w-5" />
    {/if}
    {post.title}
  </header>

  <div class="text-text/60 row-span-2 text-end">
    <div>{post.author ?? ""}</div>
    <div>{date ?? ""}</div>
  </div>

  <div>
    <span class="text-text font-bold italic">{post.unlisted ? "（設定隱藏）" : ""}</span>
    {post.desc ?? ""}
  </div>

  {#if displayTags && post.tags}
    <div class="text-text/80 col-span-full flex gap-2 overflow-clip" id="tags-container">
      {#each post.tags as tag}
        <button
          class="hover:text-text shrink-0 transition-colors hover:underline"
          onclick={(event) => gotoTag(event, tag)}
        >
          #{tag}
        </button>
      {/each}
    </div>
  {/if}
</a>

<style>
  #tags-container {
    mask-image: linear-gradient(to right, white, 95%, transparent);
  }
</style>
