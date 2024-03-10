import { getPost, listSortedPosts } from "$lib/utils/posts";
import { error } from "@sveltejs/kit";
import type { PageLoad, EntryGenerator } from "./$types";

export const load = (async ({ params }) => {
  // not sending the result of `getPost()`
  // because it contains a Svelte component
  // and sending a component through `load()`
  // is not properly supported
  if (!getPost(params.post)) error(404, "post not found");

  return { slug: params.post };
}) satisfies PageLoad;

export const entries: EntryGenerator = () => {
  return listSortedPosts({ all: true }).map((p) => ({ post: p.slug }));
};
