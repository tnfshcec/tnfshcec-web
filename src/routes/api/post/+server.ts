import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { parsePost } from "$lib/server/posts";

export const GET = (async ({ url }) => {
  const param = url.searchParams.get("post");

  if (!param) {
    throw error(400, "post is required");
  }

  const post = await parsePost(`cec/${param}.md`).catch((e) => {
    if (e.code === "ENOENT") throw error(404, "post not found");
  });

  return json(post);
}) satisfies RequestHandler;
