<script lang="ts">
  import "../app.postcss";

  import { createDropdownMenu, melt } from "@melt-ui/svelte";
  import { base } from "$app/paths";

  import IconButton from "$lib/components/IconButton.svelte";
  import icon from "$lib/assets/global-icon.png";
  import Menu from "~icons/mdi/menu";
  import Bright from "~icons/mdi/brightness-5";
  import Moon from "~icons/mdi/moon-waning-crescent";

  export let data;
  const { session } = data;
  // TODO: session validation & display avatar

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
        <span class="text-sm px-4">
          Signed in as <span class="font-bold">{session.user.name ?? session.user.email}</span>
        </span>
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
