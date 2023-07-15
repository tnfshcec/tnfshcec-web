import { parsePost } from "$lib/server/posts";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
  const { __content, ...data } = await parsePost(`cec/${params.post}.md`);

  return {
    data,
    md: __content,
  };
}) satisfies PageLoad;
