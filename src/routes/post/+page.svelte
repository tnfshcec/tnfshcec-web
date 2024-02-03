<script lang="ts">
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import PostCard from "$lib/components/homepage/PostCard.svelte";
  import * as m from "$paraglide/messages";

  export let data;
</script>

<CenteredPage>
  <div class="whitespace-pre-wrap text-xl">
    {m.post_list_description()}
  </div>

  <div class="flex flex-col gap-4 py-4">
    {#each data.posts as post}
      <PostCard {post} />
    {/each}
  </div>
</CenteredPage>
