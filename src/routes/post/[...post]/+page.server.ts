import { deletePost, parsePost } from "$lib/server/posts";
import { error, redirect, type Actions } from "@sveltejs/kit";
import { base } from "$app/paths";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const post = await parsePost(`cec/${params.post}.md`).catch((e) => {
    if (e.code === "ENOENT") throw error(404, "post not found");
    throw e;
  });

  const { md, ...data } = post;

  return {
    md,
    data
  };
}) satisfies PageServerLoad;

export const actions = {
  edit: async ({ params }) => {
    throw redirect(303, `${base}/post/${params.post}/edit`);
  },
  delete: async ({ params }) => {
    await deletePost(`cec/${params.post}.md`);
  }
} satisfies Actions;
