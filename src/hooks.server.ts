import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
import { env } from "$env/dynamic/private";
import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";

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

const locale: Handle = async ({ event, resolve }) => {
  // TODO
  const lang = "zh-tw";

  return resolve(event, {
    transformPageChunk({ done, html }) {
      // Only do it at the very end of the rendering process
      if (done) {
        return html.replace("%lang%", lang);
      }
    }
  });
};

export const handle = sequence(auth, locale);
