import { base } from "$app/paths";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const posts: App.PostData[] = await fetch(base + "/posts.json").then((res) => res.json());

  return {
    posts
  };
}) satisfies PageLoad;
