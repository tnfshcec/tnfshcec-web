import { listSortedPosts } from "$lib/server/posts";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  return {
    posts: await listSortedPosts()
  };
}) satisfies PageServerLoad;

// get post