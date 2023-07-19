import { base } from "$app/paths";
import type { PageLoad } from "./$types";

export const load = (async ({ params, fetch }) => {
  const { md, ...data }: App.PostData & { md: string } = await fetch(
    `${base}/api/post?post=${params.post}`
  ).then((res) => res.json());

  return {
    md,
    data
  };
}) satisfies PageLoad;
