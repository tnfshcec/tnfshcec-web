import { listSortedPosts } from "$lib/utils/posts";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  return {
    posts: listSortedPosts()
  };
}) satisfies PageServerLoad;
