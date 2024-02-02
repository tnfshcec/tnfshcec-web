import "unplugin-icons/types/svelte";
import { DefaultSession } from "@auth/core";
import type { AvailableLanguageTag } from "$paraglide/runtime";
import type { Theme } from "$lib/stores/theme";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      lang: AvailableLanguageTag;
      theme: Theme;
    }
    // interface PageData {}
    // interface Platform {}
    interface PostData {
      title?: string;
      author?: string;
      desc?: string;
      date?: string;
      image?: string;
      pinned?: boolean;
      url: string;
    }
  }
}

type Role = "user" | "admin";

declare module "@auth/core/types" {
  interface User {
    role?: Role;
  }

  interface Session {
    user?: {
      role?: Role;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: Role;
  }
}
export {};
