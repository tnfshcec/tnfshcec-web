<script lang="ts">
  import PageTitle from "$lib/components/PageTitle.svelte";
  import PostCard from "$lib/components/PostCard.svelte";

  export let data;
</script>

<div class="w-full p-4">
  <div class="mx-auto flex max-w-screen-xl flex-col gap-4">
    <PageTitle current="postList" />

    <div class="text-xl">
      在電梯遇到了一個女生<br />
      她對我笑了一下<br />
      按下了第8層<br />
      呵 真會暗示<br />
      她8層有點喜歡我吧<br />
      但我是不會暈的 (ゝ∀･)⌒☆
    </div>

    <div class="flex flex-col gap-4 py-4">
      {#each data.posts as post}
        <PostCard {post} />
      {/each}
    </div>
  </div>
</div>
