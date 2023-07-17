<script lang="ts">
  import { base } from "$app/paths";
  import { localeDate } from "../utils/date";

  export let post: App.PostData;

  let date = localeDate(post.date);
</script>

<a class="block p-2 w-full card card-hover variant-soft" href="{base}/{post.url}">
  <header class="card-header">
    <span class="block text-surface-600-300-token">
      {post.pinned ? "📌" : ""}
      {post.author || ""}
      {post.author && post.date ? "/" : ""}
      {date || ""}
    </span>
    <div class="block text-2xl font-bold">{post.title}</div>
  </header>
</a>
