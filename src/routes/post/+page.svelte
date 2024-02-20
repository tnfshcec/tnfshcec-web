<script lang="ts">
  import { browser } from "$app/environment";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import PostCard from "$lib/components/homepage/PostCard.svelte";
  import { allTags } from "$lib/utils/posts";
  import * as m from "$paraglide/messages";

  export let data;

  /** current filtering tags */
  let tags: string[] = [];

  $: if (browser) {
    const tagsParam = $page.url.searchParams.get("tags") ?? "";
    tags = tagsParam.split(",").filter((t) => t); // remove empty strings with filter()
  }

  /**
   * Toggles the tags in searchParams
   *
   * For example:
   * `tagA,tagB` with `tabC` becomes `tagA,tagB,tagC`
   * `tagA,tagB,tagC` with `tagB` becomes `tagA,tagC`
   */
  function getTagsParam(currentTags: string[], tag: string): string {
    const index = currentTags.indexOf(tag);

    return index === -1
      ? [...currentTags, tag].join(",") // add in the tag
      : currentTags.toSpliced(index, 1).join(","); // remove the tag
  }
</script>

<CenteredPage>
  <div class="whitespace-pre-wrap text-xl">
    {m.post_list_description()}
  </div>

  <!-- tags buttons for mobile -->
  <div class="flex w-full flex-wrap gap-2 lg:hidden">
    {#each allTags as tag}
      <a class="btn-accent whitespace-nowrap" href="?tags={tag}">#{tag}</a>
    {/each}
  </div>

  <div class="flex flex-col gap-4 py-4">
    {#each data.posts as post (post.slug)}
      {#if tags.length === 0 || tags.every((tag) => post.tags?.includes(tag))}
        <PostCard displayTags {post} />
      {/if}
    {/each}
  </div>

  <!-- tags buttons for desktop, on the right -->
  <div class="sticky top-20 hidden w-max max-w-xs space-y-2 p-4 lg:block" slot="right">
    <p class="font-bold">{m.post_filter_tags()}</p>
    <div class="flex flex-wrap gap-2">
      {#each allTags as tag}
        {@const tagsParam = getTagsParam(tags, tag)}
        <a
          class="btn-accent whitespace-nowrap
                {tags.includes(tag) ? '' : 'border-opacity-10 text-opacity-80'}"
          href="{base}/post{tagsParam === '' ? '' : '?tags=' + tagsParam}"
        >
          #{tag}
        </a>
      {/each}
    </div>
  </div>
</CenteredPage>
