import { writable, type Readable, type Writable } from "svelte/store";
import { browser } from "$app/environment";
import {
  isAvailableLanguageTag,
  setLanguageTag,
  sourceLanguageTag,
  type AvailableLanguageTag
} from "$paraglide/runtime";
import * as m from "$paraglide/messages";
import { useContextStore } from "./contextStore";

/**
 * A type returned by {@link i18nStores()}, containing 2 Svelte stores.
 */
export type I18nStores = {
  /** Containing the current language tag, you can set a new language here. */
  lang: Omit<Writable<AvailableLanguageTag>, "update">;
  /** A readonly store containing i18n messages, and is reactive the changes of the current language. */
  m: Readable<typeof m>;
};

/**
 * Returns a string URL that contains `lang=[lang]` search param.
 * @param url The current URl
 * @param lang The target language
 */
export function langUrl(url: URL, lang: AvailableLanguageTag): string {
  url.searchParams.set("lang", lang);
  return url.toString();
}

/**
 * Get an {@link I18nStores} instance from the `Context`.
 * Creates the store if not found.
 *
 * When the langauge is set on {@link I18nStores.lang},
 * {@link I18nStores.m} also gets the update.
 *
 * @see {@link useContextStore()}
 *
 * @param lang The default language used if creating a new {@link I18nStores}, usually only specified in `+layout.svelte`.
 */
export function useI18nStores(lang?: AvailableLanguageTag): I18nStores {
  return useContextStore("i18n", i18nStores, lang);
}

/**
 * Detect user's current language by the request URL and `Accept-Language` header *on the server*.
 * @param url User's URL to determine the requested language ('lang=[lang]')
 * @param request The {@link Request} object, containing the headers
 */
export function serverDetectLanguage(url: URL, request: Request): AvailableLanguageTag {
  const urlLang = url.searchParams.get("lang");
  const requestLang = requestLanguage(request);

  return getLang(urlLang ?? requestLang ?? "");
}

/**
 * Detect user's current language by client data and the result from {@link serverDetectLanguage}.
 *
 * Note that though this function is intended to be run on the 'page',
 * it may still run on the server for SSR.
 *
 * @param serverLangauge Language detected from the server, with consideration of the request header
 * @param url Page's URL to get searchParam
 */
export function pageDetectLanguage(serverLangauge: AvailableLanguageTag, url: URL) {
  const urlLang = url.searchParams.get("lang");
  const browserLang = browser ? window.localStorage.getItem("lang") : undefined;

  return getLang(urlLang ?? browserLang ?? serverLangauge);
}

/**
 * Get {@link I18nStores} from a default language tag.
 * Where {@link I18nStores.lang} is the current language,
 * {@link I18nStores.m} is the i18n messages.
 *
 * When the langauge is set (on {@link I18nStores.lang}),
 * the 2 stores will both get updated (event fired).
 */
function i18nStores(lang?: AvailableLanguageTag): I18nStores {
  const { set, subscribe } = writable<AvailableLanguageTag>(lang ?? sourceLanguageTag);
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

/**
 * Detect user's requesting language by the `Accept-Language` header, from an {@link Request} object.
 */
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

/**
 * Guarantees an available language by replacing invalid ones with the default
 */
function getLang(lang: string): AvailableLanguageTag {
  return isAvailableLanguageTag(lang) ? lang : sourceLanguageTag;
}
