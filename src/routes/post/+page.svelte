<!-- news-page-->
<script lang="ts">
  import PageTitle from "$lib/components/PageTitle.svelte";
  import PostCard from "$lib/components/PostCard.svelte";
  import { useI18nStores } from "$lib/stores/i18n.js";

  export let data;
  const { m } = useI18nStores();
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

