import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET = (async () => {
  const postFiles = import.meta.glob<Partial<App.PostData>>(
    "/src/routes/post/**/+page.{md,svelte.md,svx}",
    {
      import: "metadata"
    }
  );

  const asyncPosts = Object.entries(postFiles).map(async ([key, val]) => {
    const postPath = key.substring(12, key.lastIndexOf("/"));

    let frontmatter = await val();
    frontmatter ??= {
      timestamp: 0,
      url: postPath
    };

    const date = new Date(frontmatter.date || "");
    const localDate = isNaN(date.valueOf())
      ? frontmatter.date
      : date.toLocaleString("zh-TW", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

    const data: App.PostData = {
      ...frontmatter,
      date: localDate,
      timestamp: date.getTime() || 0,
      url: postPath
    };

    return data;
  });

  const posts = await Promise.all(asyncPosts);
  posts.sort((a, b) => {
    const pin = +(b.pinned || 0) - +(a.pinned || 0);

    if (pin != 0) {
      return pin;
    }

    return b.timestamp - a.timestamp;
  });

  console.log(posts);

  return json(posts);
}) satisfies RequestHandler;
