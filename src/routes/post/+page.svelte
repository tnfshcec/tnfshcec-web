<script lang="ts">
  import { enhance } from "$app/forms";
  import PostCard from "$lib/components/postCard.svelte";
  import { fadeIn, fadeOut } from "$lib/utils/transitions.js";

  export let data;
</script>

<div class="mx-auto w-full max-w-screen-xl px-10 py-4">
  <div class="relative">
    <h1 class="h1" in:fadeIn out:fadeOut># 列表</h1>

    {#if data.session?.user?.role === "admin"}
      <form class="absolute right-1 top-1" method="POST" action="?/newpost" use:enhance>
        <button class="variant-filled-primary btn">New Post</button>
      </form>
    {/if}

    {#each data.posts as post}
      <PostCard {post} />
    {/each}
  </div>
</div>
