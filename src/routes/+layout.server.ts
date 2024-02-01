import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.getSession(),
    lang: event.locals.lang,
    theme: event.locals.theme
  };
};
