import { error, json } from "@sveltejs/kit";
import { base } from "$app/paths";
import { listPosts, savePost } from "$lib/server/posts";
import { isoDateString } from "$lib/utils/date";
import type { RequestHandler } from "./$types";

export const POST = (async ({ locals }) => {
  const session = await locals.getSession();
  if (session?.user.role != "admin") throw error(401, "NO U");

  const path = `new-post${(await maxPostN()) + 1 || ""}`;

  const data: App.PostData = {
    title: "New Post",
    author: session.user.name ?? undefined,
    date: isoDateString(new Date()),
    url: path
  };
  const md = "";

  const content = await savePost(path, data, md);

  return json({
    message: `Post '${path}' is saved with data received.`,
    postUrl: `${base}/post/${path}`,
    postContent: content
  });
}) satisfies RequestHandler;

async function maxPostN() {
  const names = await listPosts("new-post*.md");
  const postRegex = /^new-post([0-9]*)$/;

  let maxN = -1;

  for (const name of names) {
    const groups = postRegex.exec(name) ?? [];
    const n = parseInt(groups[1] || "0");
    console.log(name, n);
    maxN = Math.max(maxN, n);
  }

  return maxN;
}
