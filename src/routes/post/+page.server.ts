import { base } from "$app/paths";
import { error, redirect, type Actions } from "@sveltejs/kit";
import { listPosts, savePost } from "$lib/server/posts";
import { isoDateString } from "$lib/utils/date";

export const actions = {
  newpost: async ({ locals }) => {
    const session = await locals.getSession();
    if (session?.user?.role != "admin") throw error(401, "NO U");

    const path = `new-post${(await maxPostN()) + 1 || ""}`;

    const data: App.PostData = {
      title: "New Post",
      author: session.user?.name ?? undefined,
      date: isoDateString(new Date()),
      url: path
    };
    const md = "";

    await savePost(path, data, md);

    throw redirect(303, `${base}/post/${path}/edit`);
  }
} satisfies Actions;

async function maxPostN() {
  const names = await listPosts();
  const postRegex = /^new-post([0-9]*)$/;

  let maxN = -1;

  for (const name of names.keys()) {
    const groups = postRegex.exec(name) ?? [];
    const n = parseInt(groups[1] || "0");
    console.log(name, n);
    maxN = Math.max(maxN, n);
  }

  return maxN;
}
