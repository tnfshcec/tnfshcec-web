import { listSortedPosts } from "$lib/utils/posts";
import type { PageLoad } from "./$types";

export const load = (async () => {
  return {
    posts: listSortedPosts()
  };
}) satisfies PageLoad;
