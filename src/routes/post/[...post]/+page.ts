import { error } from "@sveltejs/kit";
import { getPost, listSortedPosts } from "$lib/utils/posts";
import type { PageLoad, EntryGenerator } from "./$types";

export const load = (async ({ params }) => {
  const post = getPost(params.post);
  if (!post) {
    error(404, "not found");
  }

  return post;
}) satisfies PageLoad;

export const entries: EntryGenerator = () => {
  return listSortedPosts({ all: true }).map((p) => ({ post: p.slug }));
};
