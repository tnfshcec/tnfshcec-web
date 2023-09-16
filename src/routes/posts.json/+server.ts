import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { listSortedPosts } from "$lib/server/posts";

export const GET = (async () => {
  return json(await listSortedPosts());
}) satisfies RequestHandler;
