import { parsePost } from "$lib/server/posts";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  // load post
  const post = await parsePost(params.post).catch(() => {
    error(404, "post not found");
  });

  const { md, ...data } = post;

  return {
    md,
    data
  };
}) satisfies PageServerLoad;
