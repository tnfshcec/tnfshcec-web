<script lang="ts">
  import Pin from "~icons/mdi/pin";

  import { base } from "$app/paths";
  import { localeDateFromString } from "$lib/utils/date";

  export let post: App.PostData;

  let localeDate = localeDateFromString(post.date ?? "");
</script>

<a
  class="flex w-full flex-col gap-2 rounded bg-secondary px-4 py-6 transition-all hover:shadow-glow hover:shadow-secondary/80 motion-safe:hover:scale-[1.01]"
  href="{base}/post/{post.url}"
>
  <header>
    <div class="text-primary/80 icon-flex">
      {#if post.pinned}
        <Pin class="h-4 w-4 text-primary" />
      {/if}
      {post.author ?? ""}
      {post.author && post.date ? "/" : ""}
      {localeDate}
    </div>
    <div class="text-lg font-bold">{post.title}</div>
  </header>
  {#if post.desc}
    <div class="text-primary">{post.desc}</div>
  {/if}
</a>
