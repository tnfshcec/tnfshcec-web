import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET = (() => {
  const postFiles = import.meta.glob<App.PostData>("/src/routes/post/**/+page.md", {
    import: "metadata",
    eager: true
  });

  const posts = Object.entries(postFiles).map(([key, val]) => {
    let data: App.PostData = {
      ...val,
      url: key.substring(11, key.length - 9)
    };

    if (data.date) {
      let date = new Date(data.date);
      data.date = isNaN(date.valueOf())
        ? data.date
        : date.toLocaleString("zh-TW", {
            year: "numeric",
            month: "long",
            day: "numeric"
          });
    }

    return data;
  });

  return json(posts);
}) satisfies RequestHandler;
