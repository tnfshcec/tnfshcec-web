import * as m from "$paraglide/messages";
import { listSortedPosts } from "./posts";
import { availableLanguageTags, setLanguageTag } from "$paraglide/runtime";
import { base } from "$app/paths";
import { i18n } from "$lib/i18n";

type PageNavigation = {
  title: string;
  pageTitle: string;
  description: string;
  path: string[];
};

const navigate: Record<string, PageNavigation> = {};

// PERF: code looks dirty, i tried ;)
for (const lang of availableLanguageTags) {
  setLanguageTag(lang);

  const home = i18n.resolveRoute(base + "/");
  const postList = i18n.resolveRoute(base + "/post");

  navigate[home] = {
    title: `${m.title()} - ${m.name()}`,
    pageTitle: m.home(),
    description: m.description(),
    path: []
  };

  navigate[postList] = {
    title: `${m.post_list()} | ${m.name()}`,
    pageTitle: m.post_list(),
    description: m.description(),
    path: [home]
  };

  for (const post of listSortedPosts()) {
    const url = i18n.resolveRoute(base + `/post/${post.slug}`);

    navigate[url] = {
      title: `${post.title} | ${m.name()}`,
      pageTitle: `${post.title}`,
      description: post.desc ?? m.description(),
      path: [home, postList]
    };
  }
}

// set the language back to default
setLanguageTag(i18n.config.defaultLanguageTag);

// console.log(navigate);

export function getPageInfo(path: string): PageNavigation {
  return navigate[path];
}
