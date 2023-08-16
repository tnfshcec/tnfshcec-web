<script lang="ts">
  import { base } from "$app/paths";
  import { flyIn, flyOut } from "$lib/utils/transitions";

  export let post: App.PostData;
</script>

<a
  class="block my-3 p-2 w-full card card-hover variant-soft"
  href="{base}/post/{post.url}"
  data-sveltekit-preload-data="hover"
  in:flyIn={{ x: 20 }}
  out:flyOut={{ x: -20 }}
>
  <header class="card-header">
    <span class="block text-surface-600-300-token">
      {post.pinned ? "📌" : ""}
      {post.author || ""}
      {post.author && post.dateString ? "/" : ""}
      {post.dateString || ""}
    </span>
    <div class="block text-2xl font-bold">{post.title}</div>
  </header>
</a>
