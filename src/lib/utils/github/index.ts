import { createHash } from "crypto";
import type { ContentTree, GitTree } from "./types";

/**
 * Fetch the Github Api
 */
function api(route: `/${string}`, opts: RequestInit & { token: string; type?: "json" | "raw" }) {
  const { token, type, ...init } = opts;
  const Accept = type == "raw" ? "application/vnd.github.raw" : "application/vnd.github+json";

  return fetch(`https://api.github.com${route}`, {
    headers: {
      Accept,
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...init?.headers
    },
    ...init
  });
}

/**
 * Calculate the Git blob SHA for a string.
 */
function blobSha(content: string | Buffer) {
  if (typeof content == "string") {
    content = `blob ${content.length}\0${content}`;
  } else {
    content = Buffer.concat([Buffer.from(`blob ${content.length}\0`), content]);
  }
  return createHash("sha1").update(content).digest("hex");
}

/**
 * Github REST API at {@link https://docs.github.com/en/rest/collaborators/collaborators?apiVersion=2022-11-28#get-repository-permissions-for-a-user}
 *
 * @returns Whether the user has admin permissions
 */
export async function checkRepoAccess(repo: string, username: string, token: string) {
  return await api(`/repos/${repo}/collaborators/${username}/permission`, { token }).then(
    (res) => res.ok
  );
}

/**
 * Github REST Api at {@link https://docs.github.com/en/rest/git/trees?apiVersion=2022-11-28#get-a-tree}
 *
 * @returns The git tree on the repository root directory
 */
export async function getLatestTree(
  repo: string,
  token: string,
  recursive: boolean = false
): Promise<GitTree> {
  return await api(`/repos/${repo}/git/trees/HEAD${recursive ? "?recursive=1" : ""}`, {
    token
  }).then((res) => res.json());
}

/**
 * Github REST API at {@link https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content}
 *
 * @returns Response JSON from the api.
 */
export async function getFile(repo: string, path: string, token: string): Promise<ContentTree> {
  return await api(`/repos/${repo}/contents/${path}`, { token }).then((res) => res.json());
}

/**
 * Github REST API at {@link https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content}
 *
 * @todo Handle binary files
 *
 * @returns Text content of the file.
 */
export async function rawFile(repo: string, path: string, token: string) {
  return await api(`/repos/${repo}/contents/${path}`, {
    token,
    type: "raw"
  }).then((res) => res.text());
}

/**
 * Gihub REST API at {@link https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#create-or-update-file-contents}
 *
 * @returns Response JSON from the api.
 */
export async function updateFile(
  repo: string,
  path: string,
  content: string | Buffer,
  message: string,
  token: string
) {
  if (typeof content == "string") {
    content = Buffer.from(content);
  }

  const contentBase64 = content.toString("base64");
  const sha = blobSha(content);

  return await api(`/repos/${repo}/contents/${path}`, {
    token,
    method: "PUT",
    body: JSON.stringify({ message, content: contentBase64, sha })
  }).then((res) => res.ok);
}

/**
 * Github REST API at {@link https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#delete-a-file}
 *
 * @returns Response JSON from the api.
 */
export async function deleteFile(repo: string, path: string, message: string, token: string) {
  const sha = await getFile(repo, path, token).then((file) => file.sha);

  return await api(`/repos/${repo}/contents/${path}`, {
    token,
    method: "DELETE",
    body: JSON.stringify({ message, sha })
  }).then((res) => res.ok);
}
