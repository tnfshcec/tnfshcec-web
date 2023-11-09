import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
import { env } from "$env/dynamic/private";

const admins = env.ADMINS?.split(",")
  .map((s) => s.trim())
  .filter((s) => s);

export const handle = SvelteKitAuth({
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
