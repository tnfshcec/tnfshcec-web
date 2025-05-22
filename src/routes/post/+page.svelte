<script lang="ts">
  import { browser } from "$app/environment";
  import { base } from "$app/paths";
  import { page } from "$app/state";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import PostCard from "$lib/components/homepage/PostCard.svelte";
  import { m } from "$paraglide/messages";
  import { localizeHref } from "$paraglide/runtime.js";

  let { data } = $props();

  /** current filtering tags */
  let currentTags: string[] = $derived.by(() => {
    if (!browser) return [];
    const tagsParam = page.url.searchParams.get("tags") ?? "";
    return tagsParam.split(",").filter((t) => t); // remove empty strings with filter()
  });

  /**
   * Toggles the tags in currentTags
   *
   * For example:
   * `tagA,tagB` with `tabC` becomes `tagA,tagB,tagC`
   * `tagA,tagB,tagC` with `tagB` becomes `tagA,tagC`
   */
  function toggleTag(tag: string): string[] {
    const index = currentTags.indexOf(tag);

    return index === -1
      ? [...currentTags, tag] // add in the tag
      : currentTags.toSpliced(index, 1); // remove the tag
  }

  function getToggledHref(tag: string): string {
    const newTags = toggleTag(tag);

    return newTags.length === 0
      ? "/post" // return without params
      : `/post?tags=${newTags.join(",")}`;
  }
</script>

<CenteredPage title={m.post_list()} breadcrumb={["home"]}>
  <div class="whitespace-pre-wrap text-xl">
    {m.post_list_description()}
  </div>

  <!-- tags buttons for mobile -->
  <div class="flex w-full flex-wrap gap-2 lg:hidden">
    {#each data.tags as tag}
      <a
        class="btn-accent whitespace-nowrap
          {currentTags.includes(tag) ? '' : 'border-accent/40 text-accent/60'}"
        href={localizeHref(base + getToggledHref(tag))}
      >
        #{tag}
      </a>
    {/each}
  </div>

  <div class="flex flex-col gap-4 py-4">
    {#each data.posts as post (post.slug)}
      {#if currentTags.length === 0 || currentTags.every((tag) => post.tags?.includes(tag))}
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
            <a
              class="btn-accent whitespace-nowrap
                  {currentTags.includes(tag) ? '' : 'border-accent/40 text-accent/60'}"
              href={localizeHref(base + getToggledHref(tag))}
            >
              #{tag}
            </a>
          {/each}
        </div>
      </div>
    {/if}
  {/snippet}
</CenteredPage>
