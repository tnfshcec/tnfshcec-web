<script lang="ts">
  import "../app.postcss";

  import { createDropdownMenu, melt } from "@melt-ui/svelte";
  import { fly } from "svelte/transition";
  import { base } from "$app/paths";
  import { themeStore } from "$lib/stores/theme";
  import { setLocale } from "$lib/i18n/i18n-svelte";
  import LL from "$lib/i18n/i18n-svelte";
  import { i18nObject, locales } from "$lib/i18n/i18n-util";
  import type { Locales } from "$lib/i18n/i18n-types";
  import { loadLocaleAsync } from "$lib/i18n/i18n-util.async";

  import Toaster from "$lib/components/Toaster.svelte";
  import Menu from "~icons/mdi/menu";
  import Brightness from "~icons/mdi/brightness-5";
  import Moon from "~icons/mdi/moon-waning-crescent";
  import Earth from "~icons/mdi/earth";
  import ChevronRight from "~icons/mdi/chevron-right";
  import logo from "$lib/assets/logo.svg";

  export let data;

  const { session, locale } = data;

  async function handleSetLocale(locale: Locales) {
    await loadLocaleAsync(locale);
    setLocale(locale);
  }
  setLocale(locale);

  // TODO: scroll detection & changing title

  const {
    elements: { menu, item, trigger, separator },
    builders: { createSubmenu },
    states: { open }
  } = createDropdownMenu({ forceVisible: true, preventScroll: false });

  const {
    elements: { subMenu, subTrigger },
    states: { subOpen }
  } = createSubmenu();
</script>

<nav
  class="sticky top-0 z-50 h-20 w-full border-b border-text/10 bg-background/60 px-8 py-2 backdrop-blur"
>
  <div class="mx-auto flex w-full max-w-6xl items-center justify-between">
    <a href="{base}/" class="flex items-center gap-2">
      <img src={logo} class="h-12 w-12" alt="TNFSHCEC icon" />
      <div>
        <span class="font-bold">{$LL.navbar.title()}</span>
        <br />
        <span class="text-xl font-bold">{$LL.navbar.name()}</span>
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
        class="z-top max-w-xs rounded border border-primary/60 bg-background/60 backdrop-blur"
        transition:fly={{ duration: 150, y: -10 }}
      >
        <!-- TODO: maybe extract item classes (especially the `first:rounded-t` and `last:rounded-b`)-->
        <div
          use:melt={$item}
          class="icon-flex rounded-t px-4 py-2 transition-colors hover:bg-primary/20"
          on:m-click={() => themeStore.toggle()}
        >
          {#if $themeStore === "light"}
            <Brightness class="h-4 w-4" />
            <span>{$LL.navbar.lightTheme()}</span>
          {:else}
            <Moon class="h-4 w-4" />
            <span>{$LL.navbar.darkTheme()}</span>
          {/if}
        </div>

        <div
          use:melt={$subTrigger}
          class="icon-flex px-4 py-2 transition-colors hover:bg-primary/20"
        >
          <Earth class="h-4 w-4" />
          <span>{$LL.navbar.language()}</span>
          <ChevronRight class="ml-auto h-4 w-4" />
        </div>

        {#if $subOpen}
          <div
            class="z-top max-w-xs rounded border border-primary/60 bg-background/60 backdrop-blur"
            use:melt={$subMenu}
            transition:fly={{ duration: 150, y: -10 }}
          >
            {#each locales as locale}
              <div
                use:melt={$item}
                class="whitespace-nowrap px-4 py-2 transition-colors first:rounded-t last:rounded-b hover:bg-primary/20"
                on:m-click={() => handleSetLocale(locale)}
              >
                <!-- INFO: the target locale may not be loaded yet -->
                {i18nObject(locale).name() || locale}
              </div>
            {/each}
          </div>
        {/if}

        <div use:melt={$separator} class="h-[1px] bg-text/20" />

        {#if session?.user === undefined}
          <a
            use:melt={$item}
            class="block rounded-b px-4 py-2 transition-colors hover:bg-primary/20"
            href="{base}/auth/signin"
          >
            {$LL.navbar.signIn()}
          </a>
        {:else}
          <span class="px-4 text-sm">
            {$LL.navbar.signedInAs()}
            <span class="font-bold">{session.user.name ?? session.user.email}</span>
          </span>
          {#if session.user.role === "admin"}
            <a
              use:melt={$item}
              class="block px-4 py-2 transition-colors hover:bg-primary/20"
              href="{base}/newpost"
            >
              {$LL.navbar.newPost()}
            </a>
          {/if}
          <!-- <div -->
          <!--   use:melt={$item} -->
          <!--   class="block px-4 py-2 transition-colors hover:bg-primary/20" -->
          <!--   on:m-click={() => postAction("deletecache")} -->
          <!-- > -->
          <!--   Delete Post Cache -->
          <!-- </div> -->
          <a
            use:melt={$item}
            class="block rounded-b px-4 py-2 transition-colors hover:bg-primary/20"
            href="{base}/auth/signout"
          >
            {$LL.navbar.signOut()}
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
