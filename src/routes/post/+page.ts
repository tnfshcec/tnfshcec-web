import { getTags, listSortedPosts } from "$lib/utils/posts";
import * as m from "$paraglide/messages";
import type { MetaTagsProps } from "svelte-meta-tags";
import type { PageLoad } from "./$types";

export const load = (async () => {
  const pageMetaTags = {
    title: `${m.post_list()} | ${m.name()}`,
    description: m.description()
  } satisfies MetaTagsProps;

  return {
    posts: listSortedPosts(),
    tags: getTags(),
    pageMetaTags
  };
}) satisfies PageLoad;
