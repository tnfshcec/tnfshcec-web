import { getPost, listSortedPosts } from "$lib/utils/posts";
import { error } from "@sveltejs/kit";
import * as m from "$paraglide/messages";
import type { PageLoad, EntryGenerator } from "./$types";
import type { MetaTagsProps } from "svelte-meta-tags";

export const load = (async ({ params }) => {
  // not sending the result of `getPost()`
  // because it contains a Svelte component
  // and sending a component through `load()`
  // is not properly supported
  const post = getPost(params.post);
  if (!post) error(404, "post not found");

  const { metadata } = post;

  const pageMetaTags = {
    title: `${metadata.title} | ${m.name()}`,
    description: metadata.desc ?? m.description(),
    robots: metadata.unlisted ? "noindex" : "index,follow"
  } satisfies MetaTagsProps;

  return {
    slug: params.post,
    post,
    pageMetaTags
  };
}) satisfies PageLoad;

export const entries: EntryGenerator = () => {
  return listSortedPosts({ all: true }).map((p) => ({ post: p.slug }));
};
