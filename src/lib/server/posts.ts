import thunky from "thunky/promise";
import fg from "fast-glob";
import fs from "fs/promises";
import yamlFront from "yaml-front-matter";
import yaml from "js-yaml";
import { isoDateString } from "$lib/utils/date";

const filePath = (postPath: string) => `cec/${postPath}.md`;

const posts = thunky(loadPosts);

export async function listPosts() {
  return posts();
}

export async function parsePost<B extends boolean = true>(
  path: string,
  withContent?: B
): Promise<B extends true ? App.PostData & { md: string } : App.PostData>;

export async function parsePost(path: string, withContent = true) {
  const file = await fs.readFile(filePath(path), { encoding: "utf8" });
  const { __content, ...yamlFm } = yamlFront.loadFront(file, { schema: yaml.JSON_SCHEMA });

  const fm: Omit<App.PostData, "url"> = yamlFm;

  if (fm.date !== undefined) {
    fm.date = isoDateString(new Date(fm.date), fm.date);
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

type Writeable<T> = { -readonly [P in keyof T]: T[P] };
async function loadPosts(): Promise<Map<string, App.PostData>> {
  const list = await fg("**/*.md", { cwd: "cec" });

  let posts: Map<string, App.PostData> = new Map();

  for (const path of list) {
    const file = await fs.readFile("cec/" + path, { encoding: "utf8" });
    const { __content, ...frontmatter } = yamlFront.loadFront(file, {
      schema: yaml.JSON_SCHEMA
    }) as Writeable<ReturnType<typeof yamlFront.loadFront>>;

    frontmatter.url = path.substring(0, path.length - 3);
    posts.set("path", frontmatter as { url: string;[x: string]: unknown });
  }

  return posts;
}

async function writePost(filePath: string, fm: string, content: string): Promise<string> {
  if (fm) {
    content = `---\n${fm}---\n\n${content}`;
  }

  content += "\n";

  await fs.writeFile(filePath, content);

  return content;
}
