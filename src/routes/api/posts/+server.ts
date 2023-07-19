import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { listPosts, parsePost } from "$lib/server/posts";

export const GET = (async () => {
  const posts: App.PostData[] = await listPosts().then((paths) =>
    Promise.all(paths.map((p) => parsePost(p, false)))
  );

  posts.sort((a, b) => {
    const pin = +(b.pinned ?? 0) - +(a.pinned ?? 0);

    if (pin != 0) {
      return pin;
    }

    return Date.parse(b.date ?? "") - Date.parse(a.date ?? "");
  });

  // console.log(posts);

  return json(posts);
}) satisfies RequestHandler;
