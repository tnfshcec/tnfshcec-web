import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
import { env } from "$env/dynamic/private";
import { sequence } from "@sveltejs/kit/hooks";
import { initAcceptLanguageHeaderDetector } from "typesafe-i18n/detectors";
import { detectLocale, i18n, isLocale } from "$lib/i18n/i18n-util";
import type { Handle } from "@sveltejs/kit";
import type { Locales } from "$lib/i18n/i18n-types";
import { loadAllLocales } from "$lib/i18n/i18n-util.sync";

const admins = env.ADMINS?.split(",")
  .map((s) => s.trim())
  .filter((s) => s);

const auth = SvelteKitAuth({
  providers: [
    GitHub({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          role: admins?.includes(profile.email ?? "") ? "admin" : "user"
        };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.role = token.role;
      return session;
    }
  }
});

// INFO: might lag server starting time when i18n text gets huge (IDK)
loadAllLocales();
const L = i18n();

const locale: Handle = async ({ event, resolve }) => {
  let lang = event.url.searchParams.get("lang");
  if (!lang || !isLocale(lang)) {
    lang = detectLocale(initAcceptLanguageHeaderDetector(event.request));
  }

  // INFO: at this point `lang` is definitely `Locales`
  const locale = lang as Locales;

  event.locals.locale = locale;
  event.locals.LL = L[locale];

  return resolve(event, { transformPageChunk: ({ html }) => html.replace("%lang%", locale) });
};

export const handle = sequence(auth, locale);
