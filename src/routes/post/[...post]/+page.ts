import { error } from "@sveltejs/kit";
import { getPost } from "$lib/utils/posts";
import type { PageData } from "./$types";

export const load = (async ({ params }) => {
  const post = getPost(params.post);
  if (!post) {
    error(404, "not found");
  }

  return {
    data: post.metadata,
    content: post.default
  };
}) satisfies PageData;
