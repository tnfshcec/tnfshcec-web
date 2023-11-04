<script lang="ts">
  import "../app.postcss";

  import { createDropdownMenu, melt } from "@melt-ui/svelte";
  import { base } from "$app/paths";
  import { applyAction, deserialize } from "$app/forms";

  import icon from "$lib/assets/global-icon.png";
  import Menu from "~icons/mdi/menu";
  import Bright from "~icons/mdi/brightness-5";
  import Moon from "~icons/mdi/moon-waning-crescent";

  export let data;
  const { session } = data;

  async function newPost() {
    const res = await fetch(`${base}/post?/newpost`, {
      method: "POST",
      body: new FormData()
    });
    const result = deserialize(await res.text());
    applyAction(result);
  }

  const {
    elements: { menu, item, trigger, separator }
  } = createDropdownMenu();
</script>

<nav
  class="sticky top-0 z-50 h-20 w-full border-b border-text/10 bg-background/60 px-8 py-2 backdrop-blur"
>
  <div class="mx-auto flex w-full max-w-6xl items-center justify-between">
    <a href="{base}/" class="flex items-center gap-2">
      <img src={icon} class="h-12 w-12" alt="TNFSHCEC icon" />
      <div>
        <span class="font-bold">新樓醫院心臟科附屬</span>
        <br />
        <span class="text-xl font-bold">臺南一中電機社</span>
      </div>
    </a>
    <button use:melt={$trigger}><Menu class="h-12 w-12" /></button>

    <div
      use:melt={$menu}
      class="z-top max-w-xs overflow-hidden rounded border border-primary/60 bg-background/60 backdrop-blur"
    >
      <div
        use:melt={$item}
        class="flex items-center px-4 py-2 transition-colors hover:bg-primary/20"
      >
        <Moon class="h-4 w-4" />
        <span>Dark Theme</span>
      </div>

      <div use:melt={$separator} class="h-[1px] bg-text/20" />

      {#if session?.user?.role !== "admin"}
        <a
          use:melt={$item}
          class="block px-4 py-2 transition-colors hover:bg-primary/20"
          href="{base}/auth/signin"
        >
          Sign In
        </a>
      {:else}
        <span class="px-4 text-sm">
          Signed in as <span class="font-bold">{session.user.name ?? session.user.email}</span>
        </span>
        <div
          use:melt={$item}
          class="block px-4 py-2 transition-colors hover:bg-primary/20"
          on:m-click={newPost}
        >
          New Post
        </div>
        <a
          use:melt={$item}
          class="block px-4 py-2 transition-colors hover:bg-primary/20"
          href="{base}/auth/signout"
        >
          Sign Out
        </a>
      {/if}
    </div>
  </div>
</nav>

<main>
  <slot />
</main>
