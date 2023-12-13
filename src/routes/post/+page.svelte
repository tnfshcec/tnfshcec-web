<!-- news-page-->
<script lang="ts">
  import PageTitle from "$lib/components/PageTitle.svelte";
  import PostCard from "$lib/components/PostCard.svelte";

  export let data;
  const m = data.i18n.m;
</script>

<div class="w-full p-4">
  <div class="mx-auto flex max-w-screen-xl flex-col gap-4">
    <PageTitle current="postList" />

    <div class="whitespace-pre-wrap text-xl">
      {$m.post_postListDescription()}
    </div>

    <div class="flex flex-col gap-4 py-4">
      {#each data.posts as post}
        <PostCard {post} />
      {/each}
    </div>
  </div>
</div>