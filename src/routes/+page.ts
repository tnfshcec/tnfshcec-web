import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const posts: Promise<App.PostData[]> = fetch("/posts.json").then((res) => res.json());

  return {
    posts
  };
}) satisfies PageLoad;
