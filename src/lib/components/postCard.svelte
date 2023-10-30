<script lang="ts">
  import Pin from "~icons/mdi/pin";

  import { base } from "$app/paths";
  import { localeDateFromString } from "$lib/utils/date";
  import { flyIn, flyOut } from "$lib/utils/transitions";

  export let post: App.PostData;

  let localeDate = localeDateFromString(post.date ?? "");
</script>

<a
  class="flex w-[512px] flex-col items-start gap-2 rounded-2xl bg-secondary px-4 py-6"
  href="{base}/post/{post.url}"
>
  <header>
    <div class="text-xl text-primary/80">
      {#if post.pinned}
        <Pin class="inline h-5 w-5 text-primary" />
      {/if}
      {post.author ?? ""}
      {post.author && post.date ? "/" : ""}
      {localeDate}
    </div>
    <div class="text-3xl font-bold">{post.title}</div>
  </header>
  {#if post.desc}
    <div class="text-2xl text-primary">{post.desc}</div>
  {/if}
</a>
