import { error, redirect } from "@sveltejs/kit";
import { base } from "$app/paths";
import { listPosts, savePost } from "$lib/server/posts";
import type { RequestHandler } from "./$types";

export const GET = (async ({ locals }) => {
  const session = await locals.getSession();
  if (session?.user?.role !== "admin") {
    throw error(401, "NO U");
  }

  const n = await maxPostN();

  const path = `new-post${n}`;
  const data: App.PostData = {
    url: path,
    title: "New Post",
    author: session.user.name || undefined,
    date: new Date().toISOString().substring(0, 10)
  };

  await savePost(path, data, "");

  throw redirect(303, `${base}/post/new-post${n}/edit`);
}) satisfies RequestHandler;

async function maxPostN() {
  const names = await listPosts();
  const postRegex = /^new-post([0-9]*)$/;

  let maxN = -1;

  for (const name of names.keys()) {
    const groups = postRegex.exec(name) ?? [];
    const n = parseInt(groups[1] || "0");
    maxN = Math.max(maxN, n);
  }

  return maxN;
}
