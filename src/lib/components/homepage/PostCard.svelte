<!-- card for each post-->
<script lang="ts">
  import Pin from "~icons/mdi/pin";
  import { base } from "$app/paths";
  import { fly } from "svelte/transition";
  import { localeDate } from "$lib/utils/date";
  import { goto } from "$app/navigation";
  import { localizeHref } from "$paraglide/runtime";

  interface Props {
    post: App.PostData;
    displayTags?: boolean;
  }

  let { post, displayTags = false }: Props = $props();

  let date = localeDate(post.date);

  function gotoTag(event: MouseEvent, tag: string) {
    event.preventDefault();
    goto(`${base}/post?tags=${tag}`);
  }
</script>

<a
  class="grid w-full grid-cols-[1fr_fit-content(40%)] gap-2 rounded bg-secondary px-4 py-6 transition-all hover:shadow-glow hover:shadow-secondary/80 motion-safe:hover:scale-[1.01]"
  href={localizeHref(`${base}/post/${post.slug}`)}
  transition:fly={{ y: 10, duration: 250 }}
>
  <header class="icon-flex text-lg font-bold">
    {#if post.pinned}
      <Pin class="h-5 w-5 text-primary" />
    {/if}
    {post.title}
  </header>

  <div class="row-span-2 text-end text-text/60">
    <div>{post.author ?? ""}</div>
    <div>{date ?? ""}</div>
  </div>

  <div>
    <span class="font-bold italic text-text">{post.unlisted ? "（設定隱藏）" : ""}</span>
    {post.desc ?? ""}
  </div>

  {#if displayTags && post.tags}
    <div class="col-span-full flex gap-2 overflow-clip text-text/80" id="tags-container">
      {#each post.tags as tag}
        <button
          class="flex-shrink-0 transition-colors hover:text-text hover:underline"
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
