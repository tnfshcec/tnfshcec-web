import { i18nStores } from "$lib/stores/i18n";
import type { LayoutLoad } from "./$types";

export const load = (({ data }) => {
  return {
    ...data,
    i18n: i18nStores(data.lang)
  };
}) satisfies LayoutLoad;
