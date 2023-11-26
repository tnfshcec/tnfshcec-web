import { listPosts } from "$lib/server/posts";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  return {
    maxPostN: await maxPostN()
  };
}) satisfies PageServerLoad;

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
