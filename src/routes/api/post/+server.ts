import { error, json } from "@sveltejs/kit";
import { deletePost, savePost, parsePost } from "$lib/server/posts";
import type { RequestHandler } from "./$types";
import { base } from "$app/paths";

// TODO: use tRPC at some point

export const GET = (async ({ url }) => {
  const path = url.searchParams.get("path");
  if (path === null) throw error(400, "Required fields not found");

  const post = await parsePost(path).catch((e) => {
    if (e.code === "ENOENT") throw error(404, "post not found");
    throw e;
  });

  const { md, ...data } = post;

  return json({
    md,
    data
  });
}) satisfies RequestHandler;

export const POST = (async ({ request, url, locals }) => {
  const session = await locals.getSession();
  if (session?.user?.role != "admin") throw error(401, "NO U");

  const path = url.searchParams.get("path");
  if (path === null) throw error(400, "Required fields not found");

  const { data, md } = await request.json().catch(() => {
    throw error(400);
  });

  if (data === undefined || md === undefined) throw error(400, "Required fields not found");

  const content = await savePost(path, data, md);

  return json({
    message: `Post '${path}' is saved with data received.`,
    postUrl: `${base}/post/${path}`,
    postContent: content
  });
}) satisfies RequestHandler;

export const DELETE = (async ({ url, locals }) => {
  const session = await locals.getSession();
  if (session?.user?.role != "admin") throw error(401, "NO U");

  const path = url.searchParams.get("path");
  if (path === null) throw error(400, "Required fields not found");

  await deletePost(path);
  return json({
    message: `Post '${path}' is now deleted.`
  });
}) satisfies RequestHandler;

export const prerender = false;
