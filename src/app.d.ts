import type { ComponentType } from "svelte";
import type { AvailableLanguageTag } from "$paraglide/runtime";

import "unplugin-icons/types/svelte";

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
    interface Post {
      content: ComponentType;
      metadata: App.PostData;
    }
    interface PostData {
      title?: string;
      author?: string;
      desc?: string;
      date?: string;
      image?: string;
      pinned?: boolean;
      slug: string;
    }
  }
}

export {};
