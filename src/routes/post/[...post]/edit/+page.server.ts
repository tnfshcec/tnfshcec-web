import { deletePost, parsePost, savePost } from "$lib/server/posts";
import { error, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, locals }) => {
  const session = await locals.getSession(); //get sesseion
  if (session?.user?.role != "admin") throw error(401, "NO U"); //check permission

  const post = await parsePost(params.post).catch(() => {
    throw error(404, "post not found"); //if no post, 拖出去，現在！ 
  });

  const { md, ...data } = post; // extract data

  return {
    md,
    data
  };
}) satisfies PageServerLoad;

export const actions = {
  save: async ({ locals, request }) => {
    const session = await locals.getSession(); //get sesseion
    if (session?.user?.role != "admin") throw error(401, "NO U"); //check permission

    const formData = await request.formData(); // form data

    // TODO: do type validation
    // NOTE: replacing CRLF with LF only
    const md = (formData.get("md") as string).replace(/\r\n/g, "\n");
    const url = formData.get("url") as string;
    formData.delete("md");

    const data = Object.fromEntries(formData.entries()) as { url: string;[k: string]: unknown };

    // NOTE: do necessarry type change
    if (data.pinned !== undefined) {
      data.pinned = Boolean(data.pinned);
    }

    await savePost(url, data, md);
  },
  delete: async ({ locals, request }) => {
    const session = await locals.getSession(); // get session
    if (session?.user?.role != "admin") throw error(401, "NO U"); // check permission

    const formData = await request.formData(); // form data

    const url = formData.get("url") as string;

    await deletePost(url);
  }
} satisfies Actions;
