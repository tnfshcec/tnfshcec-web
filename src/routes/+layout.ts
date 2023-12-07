import type { LayoutLoad } from "./$types";
import type { Locales } from "$lib/i18n/i18n-types";
import { loadLocaleAsync } from "$lib/i18n/i18n-util.async";

export const load: LayoutLoad<{ locale: Locales }> = async ({ data: { session, locale } }) => {
  // load dictionary into memory
  await loadLocaleAsync(locale);
  // if you need to output a localized string in a `load` function,
  // you always need to create a new `i18nObject` instance in each `load` function
  // to not run into shared server state issues
  // const LL = i18nObject(locale)

  // pass locale to the "rendering context"
  return { session, locale };
};
