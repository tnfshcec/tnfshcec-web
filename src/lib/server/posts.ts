import { LRUCache } from "lru-cache";
import matter from "gray-matter";
import { deleteFile, rawFile, updateFile } from "$lib/utils/github";

import { REPO } from "$env/static/private";

const cache = new LRUCache<string, App.Post>({
  max: 500,
  ttl: 1000 * 60 * 60
});

export async function listPosts(token: string): Promise<Map<string, App.PostData>> { }

// TODO: storing the sorted array (making `limit` arg useful)
export async function listSortedPosts(limit: number = 0, token: string): Promise<App.PostData[]> { }

export async function parsePost(
  path: string,
  token: string
): Promise<{ data: App.PostData; content: string }> {
  if (cache.has(path)) {
    // INFO: ignoring `undefined` since we have a `has()` guard
    return cache.get(path)!;
  }

  const file = await rawFile(REPO, path, token).then((text) => matter(text));
  const post: App.Post = {
    data: {
      url: path,
      ...file.data
    },
    content: file.content
  };

  cache.set(path, post);
  return post;
}

export async function deletePost(path: string, token: string): Promise<boolean> {
  return await deleteFile(REPO, path, `Delete ${path}`, token);
}

export async function savePost(
  path: string,
  data: App.PostData,
  content: string,
  token: string
): Promise<boolean> {
  const file = matter.stringify(content, data);
  return await updateFile(REPO, path, file, `Update ${path}`, token);
}
