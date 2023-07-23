import { error } from "@sveltejs/kit";
import { deletePost } from "$lib/server/posts";
import type { RequestHandler } from "./$types";

export const POST = (async ({ request, params, locals }) => {
  const session = await locals.getSession();
  if (session?.user.role != "admin") throw error(401, "NO U");

  const { confirm } = await request.json();
  if (!confirm) throw error(400, "Confirm the deletion thanks :)");

  await deletePost(`cec/${params.post}.md`);
  return new Response("The post should have been deleted. This is not yet implemented tho :)");
}) satisfies RequestHandler;

export const prerender = false;
