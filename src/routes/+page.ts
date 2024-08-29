import { listSortedPosts } from "$lib/utils/posts";
import * as m from "$paraglide/messages";
import type { MetaTagsProps } from "svelte-meta-tags";
import type { PageLoad } from "./$types";

export const load = (async () => {
  const pageMetaTags = {
    title: `${m.title()} - ${m.name()}`,
    description: m.description()
  } satisfies MetaTagsProps;

  return {
    posts: listSortedPosts(),
    pageMetaTags
  };
}) satisfies PageLoad;
