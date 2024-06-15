import { dev } from "$app/environment";
import { isAvailableLanguageTag } from "$paraglide/runtime";
import * as m from "$paraglide/messages";
import { validDate } from "./date";
import type { ComponentType } from "svelte";

type MdsvexImport = { default: ComponentType; metadata?: Record<string, unknown> };

const imported: Record<string, MdsvexImport> = import.meta.glob("/cec/**/*.{md,svx}", {
  eager: true
});

const posts = Object.entries(imported).reduce<Record<string, App.Post>>((acc, [path, imported]) => {
  const slug = path.substring(5, path.lastIndexOf("."));

  // if `lang` is set
  if (isAvailableLanguageTag(imported.metadata?.lang)) {
    const langName = m.lang({}, { languageTag: imported.metadata.lang });

    // push element if isArray, replace if not
    if (Array.isArray(imported.metadata.tags)) {
      imported.metadata.tags.push(langName);
    } else {
      imported.metadata.tags = [langName];
    }
  }

  acc[slug] = {
    content: imported.default,
    metadata: {
      slug: slug,
      ...imported.metadata
    }
  };

  return acc;
}, {});

/**
 * @returns A list of post metadata, sorted with our method
 */
export function listSortedPosts({ all } = { all: dev }): App.PostData[] {
  return Object.values(posts)
    .map((p) => p.metadata)
    .filter((p) => all || !p.unlisted)
    .sort((a, b) => {
      const pin = +(b.pinned ?? 0) - +(a.pinned ?? 0);

      if (pin != 0) {
        return pin;
      }

      const dateA = validDate(a.date)?.valueOf() ?? 0;
      const dateB = validDate(b.date)?.valueOf() ?? 0;

      return dateB - dateA;
    });
}

/**
 * @param slug The slug of the post
 * @returns The post specified, with a Svelte component and its metadata. If the post is not found, `undefined` is returned.
 */
export function getPost(slug: string): App.Post | undefined {
  return posts[slug];
}

/**
 * @returns A list of available tags
 */
export function getTags({ all } = { all: dev }) {
  const allTags = Object.values(posts)
    .filter((p) => all || !p.metadata.unlisted)
    .flatMap((p) => p.metadata.tags)
    .filter((tag): tag is string => !!tag); // filter out undefined

  // allTags contains duplicates so we put it in Set()
  return new Set(allTags);
}
