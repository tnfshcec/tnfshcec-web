import fg from "fast-glob";
import fs from "fs/promises";
import yamlFront from "yaml-front-matter";
import yaml from "js-yaml";
import { localeDate } from "$lib/utils/date";

const filePath = (postPath: string) => `cec/${postPath}.md`;

export async function listPosts(pattern = "**/*.md") {
  const list = await fg(pattern, { cwd: "cec" });

  // omit the `.md` part
  return list.map((path) => path.substring(0, path.length - 3));
}

export async function parsePost<B extends boolean = true>(
  path: string,
  withContent?: B
): Promise<B extends true ? App.PostData & { md: string } : App.PostData>;

export async function parsePost(path: string, withContent = true) {
  const file = await fs.readFile(filePath(path), { encoding: "utf8" });
  const { __content, ...yamlFm } = yamlFront.loadFront(file);

  const fm: Record<string, unknown> = yamlFm;

  if (typeof fm.date === "string") {
    const date = new Date(fm.date);

    fm.dateString = localeDate(date, fm.date);
    fm.date = isNaN(date.valueOf()) ? undefined : date;
  }

  if (withContent) {
    return {
      ...fm,
      url: path,
      md: __content.trim()
    };
  }
  return {
    ...fm,
    url: path
  };
}

export async function deletePost(path: string) {
  console.log("DELETING POST", filePath(path));
  await fs.rm(filePath(path));
}

export async function savePost(path: string, data: App.PostData, content: string) {
  const { url, ...fmData } = data;
  const fm = Object.keys(fmData).length ? yaml.dump(fmData, { schema: yaml.JSON_SCHEMA }) : "";

  return writePost(filePath(path), fm, content.trim());
}

async function writePost(filePath: string, fm: string, content: string) {
  if (fm) {
    content = `---\n${fm}---\n\n${content}`;
  }

  content += "\n";

  await fs.writeFile(filePath, content);

  return content;
}
