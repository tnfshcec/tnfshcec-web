import * as m from "$paraglide/messages";
import { listSortedPosts } from "./posts";
import { availableLanguageTags, sourceLanguageTag } from "$paraglide/runtime";
import { base } from "$app/paths";

type PageNavigation = {
  title: string;
  pageTitle: string;
  description: string;
  path: string[];
};

const navigate = availableLanguageTags.reduce<Record<string, PageNavigation>>((acc, lang) => {
  /**
   * simply named `p` because it's annoying to use this (see below)
   * @returns The path for the language
   */
  function p(path: string) {
    const isSource = lang === sourceLanguageTag;
    // remove trailing slash: `/en/`
    if (!isSource && path === "/") path = "";

    return `${base}${lang === sourceLanguageTag ? "" : `/${lang}`}${path}`;
  }

  const mOpts = [{}, { languageTag: lang }];

  acc[p("/")] = {
    title: m.home(...mOpts),
    pageTitle: `${m.title(...mOpts)} - ${m.name(...mOpts)}`,
    description: m.description(...mOpts),
    path: []
  };
  acc[p("/post")] = {
    title: m.post_list(...mOpts),
    pageTitle: `${m.post_list(...mOpts)} | ${m.name(...mOpts)}`,
    description: m.description(...mOpts),
    path: ["/"].map(p)
  };

  for (const post of listSortedPosts()) {
    acc[p(`/post/${post.slug}`)] = {
      title: `${post.title}`,
      pageTitle: `${post.title} | ${m.name(...mOpts)}`,
      description: post.desc ?? m.description(...mOpts),
      path: ["/", "/post"].map(p)
    };
  }

  return acc;
}, {});

export function getPageInfo(path: string): PageNavigation {
  return navigate[path];
}
