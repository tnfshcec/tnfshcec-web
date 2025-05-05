import { base } from "$app/paths";
import { getLocale } from "$paraglide/runtime";
import * as m from "$paraglide/messages";
import type { MetaTagsProps } from "svelte-meta-tags";
import type { LayoutLoad } from "./$types";

export const prerender = true;

export const load = (async ({ url }) => {
  const baseMetaTags = {
    title: `${m.title()} - ${m.name()}`,
    description: m.name(),
    canonical: url.toString(),
    openGraph: {
      type: "website",
      locale: getLocale(),
      images: [
        {
          url: `${url.origin}${base}/thumbnail.png`,
          width: 1280,
          height: 720,
          type: "image/png"
        }
      ]
    },
    twitter: { creator: "@tnfshcec", cardType: "summary_large_image" }
  } satisfies MetaTagsProps;

  return {
    baseMetaTags
  };
}) satisfies LayoutLoad;
