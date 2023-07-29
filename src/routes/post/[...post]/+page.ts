import type { PageLoad } from "./$types";
import { base } from "$app/paths";

export const load = (async ({ fetch, params }) => {
  return fetch(`${base}/post/${params.post}/endpoint`).then((r) => r.json());
}) satisfies PageLoad;
