import { dev } from "$app/environment";
import type { ComponentType } from "svelte";

type MdsvexImport = { default: ComponentType; metadata?: Record<string, string> };

const imported: Record<string, MdsvexImport> = import.meta.glob("/cec/**/*.{md,svx}", {
  eager: true
});

const posts = Object.entries(imported).reduce<Record<string, App.Post>>((acc, [path, object]) => {
  const slug = path.substring(5, path.lastIndexOf("."));

  acc[slug] = {
    content: object.default,
    metadata: {
      slug: slug,
      ...object.metadata
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

      const dateA = a.date ? Date.parse(a.date) : 0;
      const dateB = b.date ? Date.parse(b.date) : 0;

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
