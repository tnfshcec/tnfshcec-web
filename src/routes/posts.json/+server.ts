import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET = (async () => {
  const postFiles = import.meta.glob<App.PostData>("/src/routes/post/**/+page.{md,svelte.md,svx}", {
    import: "metadata"
  });

  const posts = await Promise.all(Object.entries(postFiles).map(([key, val]) => val()));

  posts.sort((a, b) => {
    const pin = +(b.pinned || 0) - +(a.pinned || 0);

    if (pin != 0) {
      return pin;
    }

    return Date.parse(b.date || "") - Date.parse(a.date || "");
  });

  console.log(posts);

  return json(posts);
}) satisfies RequestHandler;
