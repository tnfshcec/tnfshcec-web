<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/state";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import PostCard from "$lib/components/homepage/PostCard.svelte";
  import * as m from "$paraglide/messages";

  let { data } = $props();

  /** current filtering tags */
  let tags: string[] = $state([]);

  $effect(() => {
      const tagsParam = page.url.searchParams.get("tags") ?? "";
      tags = tagsParam.split(",").filter((t) => t); // remove empty strings with filter()
  });

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

<CenteredPage title={m.post_list()} breadcrumb={["home"]}>
  <div class="whitespace-pre-wrap text-xl">
    {m.post_list_description()}
  </div>

  <!-- tags buttons for mobile -->
  <div class="flex w-full flex-wrap gap-2 lg:hidden">
    {#each data.tags as tag}
      {@const tagsParam = getTagsParam(tags, tag)}
      <a
        class="btn-accent whitespace-nowrap
          {tags.includes(tag) ? '' : 'border-accent/40 text-accent/60'}"
        href="{base}/post{tagsParam === '' ? '' : '?tags=' + tagsParam}"
      >
        #{tag}
      </a>
    {/each}
  </div>

  <div class="flex flex-col gap-4 py-4">
    {#each data.posts as post (post.slug)}
      {#if tags.length === 0 || tags.every((tag) => post.tags?.includes(tag))}
        <PostCard displayTags {post} />
      {/if}
    {/each}
  </div>

  {#snippet right()}
  
      <!-- tags buttons for desktop, on the right -->
      {#if data.tags.size > 0}
        <div class="sticky top-20 hidden w-max max-w-xs space-y-2 p-4 lg:block">
          <p class="font-bold">{m.post_filter_tags()}</p>
          <div class="flex flex-wrap gap-2">
            {#each data.tags as tag}
              {@const tagsParam = getTagsParam(tags, tag)}
              <a
                class="btn-accent whitespace-nowrap
                  {tags.includes(tag) ? '' : 'border-accent/40 text-accent/60'}"
                href="{base}/post{tagsParam === '' ? '' : '?tags=' + tagsParam}"
              >
                #{tag}
              </a>
            {/each}
          </div>
        </div>
      {/if}
    
  {/snippet}
</CenteredPage>
