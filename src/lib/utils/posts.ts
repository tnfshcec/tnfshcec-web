import type { SvelteComponent } from "svelte";

export type MdsvexImport = { default: SvelteComponent; metadata: Record<string, string> };

const posts: Record<string, MdsvexImport> = import.meta.glob("/cec/**/*.{md,svx}", {
  eager: true
});

/**
 * @returns A list of post metadata, sorted with our method
 */
export function listSortedPosts(): App.PostData[] {
  return Object.entries(posts)
    .map(([path, { metadata }]) => {
      return {
        url: path.substring(5, path.lastIndexOf(".")),
        ...metadata
      } as App.PostData;
    })
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
export function getPost(slug: string): MdsvexImport | undefined {
  // we accept `.md` and `.svx`, so checking both
  return posts[`/cec/${slug}.md`] || posts[`/cec/${slug}.svx`];
}
