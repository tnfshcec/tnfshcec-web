<script lang="ts">
  import { page } from "$app/stores";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import PostCard from "$lib/components/homepage/PostCard.svelte";
  import * as m from "$paraglide/messages";

  export let data;

  $: tags = $page.url.searchParams.get("tags")?.split(",");
</script>

<CenteredPage>
  <div class="whitespace-pre-wrap text-xl">
    {m.post_list_description()}
  </div>

  <div class="flex flex-col gap-4 py-4">
    {#each data.posts as post (post.slug)}
      {#if !tags || tags.some((tag) => post.tags?.includes(tag))}
        <PostCard displayTags {post} />
      {/if}
    {/each}
  </div>
</CenteredPage>
