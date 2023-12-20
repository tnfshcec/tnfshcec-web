<script lang="ts">
  import "../app.postcss";

  // JS
  import { createDropdownMenu, melt } from "@melt-ui/svelte";
  import { fly } from "svelte/transition";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { themeStore } from "$lib/stores/theme";
  import { detectLanguage, langUrl } from "$lib/stores/i18n";
  import { availableLanguageTags } from "$paraglide/runtime";

  // Icon
  import Toaster from "$lib/components/Toaster.svelte";
  import Menu from "~icons/mdi/menu";
  import Brightness from "~icons/mdi/brightness-5";
  import Moon from "~icons/mdi/moon-waning-crescent";
  import Earth from "~icons/mdi/earth";
  import ChevronRight from "~icons/mdi/chevron-right";
  import Downo from "~icons/mdi/google-downasaur";
  import logo from "$lib/assets/logo.svg";
  import { setContext } from "svelte";

  export let data;

  const { session, i18n } = data;

  $: i18n.lang.set(detectLanguage($page.url));
  const m = i18n.m;

  setContext("i18n", i18n);

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

<!--nav-bar-->
<nav
  class="sticky top-0 z-50 h-20 w-full border-b border-text/10 bg-background/60 px-8 py-2 backdrop-blur"
>
  <div class="mx-auto flex w-full max-w-6xl items-center justify-between">
    <a href="{base}/" class="flex items-center gap-2 overflow-hidden">
      <img src={logo} class="h-12 w-12" alt="TNFSHCEC icon" />
      <div>
        <span class="font-bold whitespace-nowrap">{$m.title()}</span>
        <br />
        <span class="text-xl font-bold whitespace-nowrap">{$m.name()}</span>
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

    <!--melt-ui-dropdown-->
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
            <span>{$m.lightTheme()}</span>
          {:else}
            <Moon class="h-4 w-4" />
            <span>{$m.darkTheme()}</span>
          {/if}
        </div>

        <div
          use:melt={$subTrigger}
          class="icon-flex px-4 py-2 transition-colors hover:bg-primary/20"
        >
          <Earth class="h-4 w-4" />
          <span>{$m.language()}</span>
          <ChevronRight class="ml-auto h-4 w-4" />
        </div>

        <a
          use:melt={$item}
          class="icon-flex px-4 py-2 transition-colors hover:bg-primary/20"
          href="{base}/2048"
        >
          <Downo class="h-4 w-4" />
          <span>{$m.game()}</span>
        </a>

        {#if $subOpen}
          <div
            class="z-top max-w-xs rounded border border-primary/60 bg-background/60 backdrop-blur"
            use:melt={$subMenu}
            transition:fly={{ duration: 150, y: -10 }}
          >
            {#each availableLanguageTags as tag}
              <a
                use:melt={$item}
                class="block whitespace-nowrap px-4 py-2 transition-colors first:rounded-t last:rounded-b hover:bg-primary/20"
                href={langUrl($page.url, tag)}
                hreflang={tag}
              >
                {$m.lang({}, { languageTag: tag }) || tag}
              </a>
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
            {$m.signIn()}
          </a>
        {:else}
          <span class="px-4 text-sm font-bold">
            {$m.signedInAs({ user: session.user.name ?? session.user.email ?? "Unknown" })}
          </span>
          {#if session.user.role === "admin"}
            <a
              use:melt={$item}
              class="block px-4 py-2 transition-colors hover:bg-primary/20"
              href="{base}/newpost"
            >
              {$m.post_newPost()}
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
            {$m.signOut()}
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

<!--gradient-->
<style>
  #menu-trigger::after {
    @apply absolute bottom-0 right-0 h-8 w-8;
    @apply rounded-full border-4 border-background;
    @apply bg-contain bg-center;

    background-image: var(--avatar);
  }
</style>
