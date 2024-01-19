import { error } from "@sveltejs/kit";
import type { PageData } from "./$types";

export const load = (async ({ params }) => {
  const post = await import(/* @vite-ignore */ `../../../../cec/${params.post}.md`);
  const { default: page, metadata: data } = post;

  if (!page) {
    error(404, "not found");
  }

  return {
    data,
    content: page
  };
}) satisfies PageData;
