import type { ComponentType } from "svelte";

import "unplugin-icons/types/svelte";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
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
      lang?: string;
      tags?: string[];
      pinned?: boolean;
      unlisted?: boolean;
      slug: string;
    }
  }
}

export {};
