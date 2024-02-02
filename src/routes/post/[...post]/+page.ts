import { error } from "@sveltejs/kit";
import { getPost } from "$lib/utils/posts";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
  const post = getPost(params.post);
  if (!post) {
    error(404, "not found");
  }

  return post;
}) satisfies PageLoad;
