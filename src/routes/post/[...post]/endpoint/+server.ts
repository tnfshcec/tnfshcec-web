import { error, json } from "@sveltejs/kit";
import { deletePost, savePost, parsePost } from "$lib/server/posts";
import type { RequestHandler } from "./$types";

export const GET = (async ({ params }) => {
  const post = await parsePost(`cec/${params.post}.md`).catch((e) => {
    if (e.code === "ENOENT") throw error(404, "post not found");
    throw e;
  });

  const { md, ...data } = post;

  return json({
    md,
    data
  });
}) satisfies RequestHandler;

export const POST = (async ({ request, params }) => {
  const { data, md } = await request.json().catch(() => {
    throw error(400);
  });

  if (!data || !md) throw error(400, "Required fields not found");

  const content = await savePost(`cec/${params.post}.md`, data, md);

  return json({
    message: `Post '${params.post}' is saved with data received.`,
    postContent: content
  });
}) satisfies RequestHandler;

export const DELETE = (async ({ params, locals }) => {
  const session = await locals.getSession();
  if (session?.user.role != "admin") throw error(401, "NO U");

  await deletePost(`cec/${params.post}.md`);
  return json({
    message: `Post '${params.post}' should have been deleted. This is not yet implemented tho :)`
  });
}) satisfies RequestHandler;

export const prerender = false;
