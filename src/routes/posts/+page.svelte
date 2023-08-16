<script lang="ts">
  import PostCard from "$lib/components/postCard.svelte";

  export let data;
</script>

<div class="mx-auto px-10 py-4 w-full max-w-screen-xl">
  <h1 class="h1"># 列表</h1>
  {#each data.posts as post}
    <PostCard {post} />
  {/each}
</div>
