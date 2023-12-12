import { getI18nStore } from "$lib/stores/i18n";
import type { LayoutLoad } from "./$types";

export const load = (({ data }) => {
  return {
    ...data,
    i18n: getI18nStore(data.lang)
  };
}) satisfies LayoutLoad;
