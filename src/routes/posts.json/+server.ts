import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET = (async () => {
  const postFiles = import.meta.glob<App.PostData>("/src/routes/post/**/+page.{md,svelte.md,svx}", {
    import: "metadata"
  });

  const posts = Object.entries(postFiles).map(async ([key, val]) => {
    let data: App.PostData = {
      ...(await val().catch((error) => console.log(error))),
      url: key.substring(12, key.lastIndexOf("/"))
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

  return json(await Promise.all(posts));
}) satisfies RequestHandler;
