/**
 * Git Tree
 * The hierarchy between files in a Git repository.
 * @see {@link https://docs.github.com/en/rest/git/trees?apiVersion=2022-11-28#get-a-tree}
 */
export interface GitTree {
  sha: string;
  url: string;
  truncated: boolean;
  /**
   * Objects specifying a tree structure
   */
  tree: {
    path?: string;
    mode?: string;
    type?: string;
    sha?: string;
    size?: number;
    url?: string;
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}

/**
 * Content Tree
 * @see {@link https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content}
 */
export interface ContentTree {
  type: string;
  size: number;
  name: string;
  path: string;
  sha: string;
  url: string;
  git_url: string | null;
  html_url: string | null;
  download_url: string | null;
  entries?: {
    type: string;
    size: number;
    name: string;
    path: string;
    content?: string;
    sha: string;
    url: string;
    git_url: string | null;
    html_url: string | null;
    download_url: string | null;
    _links: {
      git: string | null;
      html: string | null;
      self: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }[];
  _links: {
    git: string | null;
    html: string | null;
    self: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
