import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const posts: App.PostData[] = await fetch("posts.json").then((res) => res.json());

  return {
    posts
  };
}) satisfies PageLoad;
