<script lang="ts">
  import "../app.postcss";

  import { createDropdownMenu, melt } from "@melt-ui/svelte";
  import { fly } from "svelte/transition";
  import { base } from "$app/paths";
  import { applyAction, deserialize } from "$app/forms";
  import { themeStore } from "$lib/stores/theme";

  import Toaster from "$lib/components/Toaster.svelte";
  import Menu from "~icons/mdi/menu";
  import Brightness from "~icons/mdi/brightness-5";
  import Moon from "~icons/mdi/moon-waning-crescent";
  import logo from "$lib/assets/logo.svg";

  export let data;
  const { session } = data;

  // TODO: scroll detection & changing title

  async function postAction(action: string) {
    const res = await fetch(`${base}/post?/${action}`, {
      method: "POST",
      body: new FormData()
    });
    const result = deserialize(await res.text());
    applyAction(result);
  }

  const {
    elements: { menu, item, trigger, separator },
    states: { open }
  } = createDropdownMenu({ forceVisible: true, preventScroll: false });
</script>

<nav
  class="sticky top-0 z-50 h-20 w-full border-b border-text/10 bg-background/60 px-8 py-2 backdrop-blur"
>
  <div class="mx-auto flex w-full max-w-6xl items-center justify-between">
    <a href="{base}/" class="flex items-center gap-2">
      <img src={logo} class="h-12 w-12" alt="TNFSHCEC icon" />
      <div>
        <span class="font-bold">新樓醫院心臟科附屬</span>
        <br />
        <span class="text-xl font-bold">臺南一中電機社</span>
      </div>
    </a>
    <button
      use:melt={$trigger}
      id="menu-trigger"
      class={session?.user?.image ? "relative after:content-['_']" : ""}
      style:--avatar={session?.user?.image ? `url('${session.user.image}')` : ""}
    >
      <Menu class="h-12 w-12" />
    </button>

    {#if $open}
      <div
        use:melt={$menu}
        class="z-top max-w-xs overflow-hidden rounded border border-primary/60 bg-background/60 backdrop-blur"
        transition:fly={{ duration: 150, y: -10 }}
      >
        <div
          use:melt={$item}
          class="icon-flex px-4 py-2 transition-colors hover:bg-primary/20"
          on:m-click={() => themeStore.toggle()}
        >
          {#if $themeStore === "light"}
            <Brightness class="h-4 w-4" />
            <span>Light Theme</span>
          {:else}
            <Moon class="h-4 w-4" />
            <span>Dark Theme</span>
          {/if}
        </div>

        <div use:melt={$separator} class="h-[1px] bg-text/20" />

        {#if session?.user === undefined}
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
            on:m-click={() => postAction("newpost")}
          >
            New Post
          </div>
          <!-- <div -->
          <!--   use:melt={$item} -->
          <!--   class="block px-4 py-2 transition-colors hover:bg-primary/20" -->
          <!--   on:m-click={() => postAction("deletecache")} -->
          <!-- > -->
          <!--   Delete Post Cache -->
          <!-- </div> -->
          <a
            use:melt={$item}
            class="block px-4 py-2 transition-colors hover:bg-primary/20"
            href="{base}/auth/signout"
          >
            Sign Out
          </a>
        {/if}
      </div>
    {/if}
  </div>
</nav>

<Toaster />

<main>
  <slot />
</main>

<style>
  #menu-trigger::after {
    @apply absolute bottom-0 right-0 h-8 w-8;
    @apply rounded-full border-4 border-background;
    @apply bg-contain bg-center;

    background-image: var(--avatar);
  }
</style>
