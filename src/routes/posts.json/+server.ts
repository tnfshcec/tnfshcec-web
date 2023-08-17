import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { listPosts, parsePost } from "$lib/server/posts";

// NOTE: needed to load everything at once.
// 1. prerendering doesn't accept url args
// 2. need to load everything before sorting them
// this could be solved when proper database is used.

export const GET = (async () => {
  const posts: App.PostData[] = await listPosts().then((paths) =>
    Promise.all(paths.map((p) => parsePost(p, false)))
  );

  posts.sort((a, b) => {
    const pin = +(b.pinned ?? 0) - +(a.pinned ?? 0);

    if (pin != 0) {
      return pin;
    }

    return +(b.date ?? 0) - +(a.date ?? 0);
  });

  // console.log(posts);

  return json(posts);
}) satisfies RequestHandler;
