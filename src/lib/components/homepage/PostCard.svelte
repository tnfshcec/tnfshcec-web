<!-- card for each post-->
<script lang="ts">
  import Pin from "~icons/mdi/pin";
  import { base } from "$app/paths";
  import { fly } from "svelte/transition";
  import { localeDate } from "$lib/utils/date";
  import { languageTag } from "$paraglide/runtime";

  export let post: App.PostData;
  export let displayTags = false;

  let date = localeDate(post.date, languageTag());
</script>

<a
  class="grid grid-cols-[auto_1fr] grid-rows-2 w-full gap-2 rounded bg-secondary px-4 py-6 transition-all hover:shadow-glow hover:shadow-secondary/80 motion-safe:hover:scale-[1.01]"
  href="{base}/post/{post.slug}"
  transition:fly={{ y: 10, duration: 250 }}
>
  <header class="text-lg font-bold">{post.title}</header>

  <div class="justify-end text-primary/80 row-span-2">
    <div>{post.author ?? ""}</div>
    <div>{date ?? ""}</div>
    {#if post.pinned}
      <Pin class="h-4 w-4 text-primary" />
    {/if}
  </div>

  {#if post.desc}
    <div class="text-text/80">{post.desc}</div>
  {/if}

  {#if displayTags && post.tags}
    <div class="flex gap-2 text-text/80">
      {#each post.tags as tag}
        <a class="transition-colors hover:text-text hover:underline" href="{base}/post?tags={tag}">
          #{tag}
        </a>
      {/each}
    </div>
  {/if}
</a>
