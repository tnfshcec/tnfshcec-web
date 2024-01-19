import { listSortedPosts } from "$lib/utils/listPosts";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  return {
    posts: listSortedPosts()
  };
}) satisfies PageServerLoad;
