import { parsePost } from "$lib/server/posts";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const post = await parsePost(params.post).catch((e) => {
    if (e.code === "ENOENT") throw error(404, "post not found");
    throw e;
  });

  const { md, ...data } = post;

  return {
    md,
    data
  };
}) satisfies PageServerLoad;
