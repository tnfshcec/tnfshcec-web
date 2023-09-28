<script lang="ts">
  import { enhance } from "$app/forms";
  import PostCard from "$lib/components/postCard.svelte";
  import { fadeIn, fadeOut } from "$lib/utils/transitions.js";

  export let data;
</script>

<div class="mx-auto px-10 py-4 w-full max-w-screen-xl">
  <div class="relative">
    <h1 class="h1" in:fadeIn out:fadeOut># 列表</h1>
    <form class="absolute right-1 top-1" method="POST" action="?/newpost" use:enhance>
      <button class="btn variant-filled-primary">New Post</button>
    </form>
    {#each data.posts as post}
      <PostCard {post} />
    {/each}
  </div>
</div>
