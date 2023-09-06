<script lang="ts">
  import Pin from "~icons/mdi/pin";

  import { base } from "$app/paths";
  import { localeDateFromString } from "$lib/utils/date";
  import { flyIn, flyOut } from "$lib/utils/transitions";

  export let post: App.PostData;

  let localeDate = localeDateFromString(post.date ?? "");
</script>

<a
  class="block my-3 p-2 w-full card card-hover variant-soft relative overflow-hidden"
  href="{base}/post/{post.url}"
  data-sveltekit-preload-data="hover"
  in:flyIn={{ x: 20 }}
  out:flyOut={{ x: -20 }}
>
  {#if post.image}
    <div
      class="absolute top-0 bottom-0 right-0 w-2/3 bg-cover -z-10"
      style="background-image: url({post.image}); mask-image: linear-gradient(to left, white, 70%, transparent 95%);"
    />
  {/if}

  <header class="card-header">
    <span class="block text-surface-600-300-token">
      {#if post.pinned}
        <Pin class="inline -mt-1 text-secondary-500-400-token" />
      {/if}
      {post.author || ""}
      {post.author && localeDate ? "/" : ""}
      {localeDate || ""}
    </span>
    <div class="block text-2xl font-bold">{post.title}</div>
  </header>
  <div class="mx-4 my-2 text-surface-600-300-token">
    {post.desc || ""}
  </div>
</a>
