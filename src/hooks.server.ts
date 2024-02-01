import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
import { env } from "$env/dynamic/private";
import { serverDetectTheme } from "$lib/stores/theme";
import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";
import { i18n } from "$lib/i18n";

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

const theme: Handle = async ({ event, resolve }) => {
  const theme = serverDetectTheme(event.request);

  event.locals.theme = theme;

  const response = await resolve(event);

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-Prefers-Color-Scheme
  response.headers.set("Accept-CH", "Sec-CH-Prefers-Color-Scheme");
  response.headers.set("Vary", "Sec-CH-Prefers-Color-Scheme");
  response.headers.set("Critical-CH", "Sec-CH-Prefers-Color-Scheme");

  return response;
};

export const handle = sequence(auth, theme, i18n.handle());
