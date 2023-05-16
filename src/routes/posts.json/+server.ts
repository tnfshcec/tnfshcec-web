import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET = (() => {
  const postFiles = import.meta.glob<App.PostData>("/src/routes/post/**/+page.md", {
    import: "metadata",
    eager: true
  });

  const posts = Object.entries(postFiles).map(([key, val]) => {
    return {
      ...val,
      url: key.substring(11, key.length - 9)
    } as App.PostData;
  });

  return json(posts);
}) satisfies RequestHandler;
