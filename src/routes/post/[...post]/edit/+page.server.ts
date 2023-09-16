import { parsePost } from "$lib/server/posts";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, locals }) => {
  const session = await locals.getSession();
  if (session?.user?.role != "admin") throw error(401, "NO U");

  const post = await parsePost(params.post).catch(() => {
    throw error(404, "post not found");
  });

  const { md, ...data } = post;

  return {
    md,
    data
  };
}) satisfies PageServerLoad;

export const prerender = false;
