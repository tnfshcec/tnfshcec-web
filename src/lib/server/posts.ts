import fg from "fast-glob";
import fs from "fs/promises";
import yamlFront from "yaml-front-matter";
import yaml from "js-yaml";

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
      md: __content.trim()
    };
  }
  return {
    ...fm,
    url
  };
}

export async function deletePost(path: string) {
  console.log("Delete post OHNO");
  return Promise.resolve();
}

export async function editPost(path: string, data: App.PostData, content: string) {
  const { url, ...fmData } = data;
  const fm = yaml.dump(fmData);

  return writePost(path, fm, content.trim());
}

async function writePost(path: string, fm: string, content: string) {
  content = `---\n${fm}---\n\n${content}\n`;

  await fs.writeFile(path, content);

  return content;
}
