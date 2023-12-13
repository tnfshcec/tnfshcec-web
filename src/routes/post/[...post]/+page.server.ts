import { parsePost } from "$lib/server/posts";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const post = await parsePost(params.post).catch(() => {
    throw error(404, "post not found");
  });

  const { md, ...data } = post;

  return {
    md,
    data
  };
}) satisfies PageServerLoad;

// Load Post