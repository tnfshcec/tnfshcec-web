import thunky from "thunky/promise";
import { LRUCache } from "lru-cache";
import fg from "fast-glob";
import fs from "fs/promises";
import yamlFront from "yaml-front-matter";
import yaml from "js-yaml";
import { isoDateString } from "$lib/utils/date";

const filePath = (postPath: string) => `cec/${postPath}.md`;

const posts = thunky(loadPosts);
const postCache: LRUCache<string, string, unknown> = new LRUCache({
  max: 200,
  fetchMethod: fetchPost
});

export async function listPosts(): Promise<Map<string, App.PostData>> {
  return posts();
}

// TODO: storing the sorted array (making `limit` arg useful)
export async function listSortedPosts(): Promise<App.PostData[]> {
  const p = await posts();
  return [...p.values()].sort((a, b) => {
    const pin = +(b.pinned ?? 0) - +(a.pinned ?? 0);

    if (pin != 0) {
      return pin;
    }

    const dateA = a.date ? Date.parse(a.date) : 0;
    const dateB = b.date ? Date.parse(b.date) : 0;

    return dateB - dateA;
  });
}

export async function parsePost(path: string): Promise<App.PostData & { md: string }> {
  const p = await posts();

  if (!p.has(path)) throw new Error("Cannot find post");

  const fm = p.get(path) as App.PostData;
  const content = await postCache.fetch(path);

  return {
    ...fm,
    md: content ?? ""
  };
}

export async function deletePost(path: string) {
  console.log("DELETING POST", filePath(path));
  await fs.rm(filePath(path));
}

export async function savePost(path: string, data: App.PostData, content: string): Promise<string> {
  const p = await posts();
  p.set(path, data);

  return writePost(path, data, content.trim());
}

async function loadPosts(): Promise<Map<string, App.PostData>> {
  const list = await fg("**/*.md", { cwd: "cec" });

  let posts: Map<string, App.PostData> = new Map();

  for (const path of list) {
    const filePath = `cec/${path}`;
    const urlPath = path.substring(0, path.length - 3);

    const file = await fs.readFile(filePath, { encoding: "utf8" });
    const { __content, ...frontmatter } = yamlFront.loadFront(file, {
      schema: yaml.JSON_SCHEMA
    });

    // WARN: potentially not type-safe
    let fm = frontmatter as App.PostData;
    if (fm.date !== undefined) {
      fm.date = isoDateString(new Date(fm.date), fm.date);
    }
    fm.url = urlPath;
    // set `url` property - it's non-nullable

    posts.set(urlPath, fm);
  }

  return posts;
}

async function fetchPost(path: string): Promise<string> {
  const file = await fs.readFile(filePath(path), { encoding: "utf8" });
  const match = file.match(/^(?:---[\w\W]+?---)?([\w\W]*)/);
  return match ? match[1] : "";
}

async function writePost(path: string, fm: App.PostData, content: string): Promise<string> {
  const { url, ...fmData } = fm;
  const fmString = Object.keys(fmData).length
    ? yaml.dump(fmData, { schema: yaml.JSON_SCHEMA })
    : "";

  if (fm) {
    content = `---\n${fmString}---\n\n${content}`;
  }

  content += "\n";

  await fs.writeFile(filePath(path), content);

  return content;
}
