import { parsePost, savePost } from "$lib/server/posts";
import { error, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, locals }) => {
  const session = await locals.getSession();
  if (session?.user?.role != "admin") throw error(401, "NO U");

  const post = await parsePost(params.post).catch(() => {
    throw error(404, "post not found");
  });

  const { md, ...data } = post;

  return {
    md,
    data
  };
}) satisfies PageServerLoad;

export const actions = {
  save: async ({ request }) => {
    const formData = await request.formData();

    // TODO: do type validation
    const md = formData.get("md") as string;
    const url = formData.get("url") as string;
    formData.delete("md");

    const data = Object.fromEntries(formData.entries()) as { url: string; [k: string]: unknown };

    console.log("save: ");
    console.log(data);
    console.log(md);

    // NOTE: do necessarry type change
    if (data.pinned !== undefined) {
      data.pinned = Boolean(data.pinned);
    }

    savePost(url, data, md);
  },
  delete: async () => {
    // TODO: do delete
  }
} satisfies Actions;

export const prerender = false;
