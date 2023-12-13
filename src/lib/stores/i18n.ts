import { writable, type Readable, type Writable } from "svelte/store";
import { browser } from "$app/environment";
import {
  isAvailableLanguageTag,
  setLanguageTag,
  sourceLanguageTag,
  type AvailableLanguageTag
} from "$paraglide/runtime";
import * as m from "$paraglide/messages";

export type I18nStores = {
  lang: Omit<Writable<AvailableLanguageTag>, "update">;
  m: Readable<typeof m>;
};

export function langUrl(url: URL, lang: AvailableLanguageTag): string {
  url.searchParams.set("lang", lang);
  return url.toString();
}

export function i18nStores(lang: AvailableLanguageTag): I18nStores {
  const { set, subscribe } = writable<AvailableLanguageTag>(lang);
  const { subscribe: subscribeM, update: updateM } = writable<typeof m>(m);

  subscribe((lang) => {
    setLanguageTag(lang);

    // INFO: basicly abusing svelte stores for reactive updates
    updateM((m) => m);

    if (browser) {
      document.documentElement.lang = lang;
      window.localStorage.setItem("lang", lang);
    }
  });

  return { lang: { set, subscribe }, m: { subscribe: subscribeM } };
}

export function detectLanguage(url?: URL, request?: Request): AvailableLanguageTag {
  const requestLang = requestLanguage(request);
  const browserLang = browser ? window.localStorage.getItem("lang") : undefined;

  return getLang(url?.searchParams.get("lang") ?? browserLang ?? requestLang ?? "");
}

function requestLanguage(request?: Request): AvailableLanguageTag | undefined {
  type LanguageWeight = { tag: AvailableLanguageTag; weight: number };

  return (request?.headers.get("Accept-Language") ?? "")
    .split(",")
    .map((lang) => {
      let [tag, weight] = lang.split(";");

      tag = tag.trim();
      weight = weight?.trim().substring(2) ?? "1";

      if (!isAvailableLanguageTag(tag)) return undefined;

      return { tag, weight: parseFloat(weight) } as LanguageWeight;
    })
    .filter((e): e is LanguageWeight => Boolean(e))
    .toSorted((a, b) => b.weight - a.weight)[0]?.tag;
  // INFO: accessing [0] of the array might be `undefined`
}

function getLang(lang: string): AvailableLanguageTag {
  return isAvailableLanguageTag(lang) ? lang : sourceLanguageTag;
}
