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

    const dateA = a.date ? Date.parse(a.date) : 0;
    const dateB = b.date ? Date.parse(b.date) : 0;

    return dateB - dateA;
  });

  // console.log(posts);

  return json(posts);
}) satisfies RequestHandler;
