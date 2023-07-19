import fg from "fast-glob";
import fs from "fs/promises";
import yamlFront from "yaml-front-matter";

export async function listPosts() {
  return await fg("cec/**/*.md");
}

export async function parsePost<B extends boolean = true>(
  path: string,
  withContent?: B
): Promise<App.PostData & (B extends true ? { md: string } : Record<string, never>)>;

export async function parsePost(path: string, withContent = true) {
  const file = await fs.readFile(path, { encoding: "utf8" });
  const { __content, ...fm } = yamlFront.loadFront(file);
  const url = `post/${path.slice(4, -3)}`;

  if (withContent) {
    return {
      ...fm,
      url,
      md: __content
    };
  }
  return {
    ...fm,
    url
  };
}
