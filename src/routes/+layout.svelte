<script lang="ts">
  import "../app.postcss";

  import { fly } from "svelte/transition";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { pageDetectTheme, useThemeStore } from "$lib/stores/theme";
  import { pageDetectLanguage, useI18nStores, langUrl } from "$lib/stores/i18n";
  import { availableLanguageTags } from "$paraglide/runtime";

  import { DropdownMenu, Toggle } from "bits-ui";
  import Toaster from "$lib/components/Toaster.svelte";
  import Menu from "~icons/mdi/menu";
  import Sunny from "~icons/mdi/weather-sunny";
  import Night from "~icons/mdi/weather-night";
  import Earth from "~icons/mdi/earth";
  import ChevronRight from "~icons/mdi/chevron-right";
  import ChevronDown from "~icons/mdi/chevron-down";
  import Check from "~icons/mdi/check";
  import logo from "$lib/assets/logo.svg";

  export let data;

  const { session, lang: serverLang, theme: serverTheme } = data;

  const i18n = useI18nStores(pageDetectLanguage(serverLang, $page.url));
  const theme = useThemeStore(pageDetectTheme(serverTheme));

  // reactively set the global stores
  $: i18n.lang.set(pageDetectLanguage(serverLang, $page.url));
  $: theme.set(pageDetectTheme(serverTheme));
  const { lang, m } = i18n;

  // TODO: scroll detection & changing title
</script>

<!-- TODO: dynamic meta -->
<svelte:head>
  <meta name="description" content={$m.description()} />

  <meta property="og:title" content={$m.name()} />
  <meta property="og:description" content={$m.description()} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={$page.url.href.split(/[?#]/)[0]} />
  <meta property="og:image" content="{$page.url.protocol}//{$page.url.host}{base}/thumbnail.png" />

  <meta property="og:locale" content={$lang} />
  {#each availableLanguageTags as tag}
    {#if tag != $lang}
      <meta property="og:locale:alternative" content={tag} />
    {/if}
  {/each}

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@tnfshcec" />
</svelte:head>

<!-- nav bar -->
<nav
  class="sticky top-0 z-50 h-20 w-full border-b border-text/10 bg-background/60 px-4 py-2 backdrop-blur"
>
  <div class="mx-auto flex w-full max-w-6xl items-center justify-between">
    <a href="{base}/" class="flex items-center gap-2 overflow-hidden">
      <img src={logo} class="h-12 w-12" alt="TNFSHCEC icon" />
      <div>
        <span class="whitespace-nowrap font-bold">{$m.title()}</span>
        <br />
        <span class="whitespace-nowrap text-xl font-bold">{$m.name()}</span>
      </div>
    </a>

    <div class="flex gap-8">
      <!-- theme toggle button -->
      <Toggle.Root
        class="hidden rounded-sm p-2 transition-colors hover:bg-primary/20 sm:block"
        onPressedChange={() => theme.toggle()}
      >
        {#if $theme === "light"}
          <Sunny class="h-8 w-8" />
        {:else}
          <Night class="h-8 w-8" />
        {/if}
      </Toggle.Root>

      <!-- language change button -->
      <DropdownMenu.Root preventScroll={false}>
        <DropdownMenu.Trigger
          class="hidden items-center rounded-sm border border-text/20 p-1 transition-colors hover:bg-primary/20 sm:flex"
        >
          <Earth class="h-8 w-8" />
          <ChevronDown class="h-6 w-6" />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          class="dropdown-menu"
          sideOffset={4}
          transition={fly}
          transitionConfig={{ duration: 150, y: -10 }}
        >
          {#each availableLanguageTags as tag}
            <DropdownMenu.Item
              class="dropdown-item flex items-center gap-1 whitespace-nowrap p-2"
              href={langUrl($page.url, tag)}
              hreflang={tag}
            >
              {#if $lang === tag}
                <Check class="h-4 w-4" />
              {:else}
                <div class="h-4 w-4" />
              {/if}
              {$m.lang({}, { languageTag: tag }) || tag}
            </DropdownMenu.Item>
          {/each}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <!-- account button -->
      <DropdownMenu.Root preventScroll={false}>
        <DropdownMenu.Trigger class="relative hidden after:content-[''] sm:block">
          <Menu class="h-12 w-12" />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          class="dropdown-menu"
          transition={fly}
          transitionConfig={{ duration: 150, y: -10 }}
        >
          {#if session?.user === undefined}
            <DropdownMenu.Item class="dropdown-item block" href="{base}/auth/signin">
              {$m.signIn()}
            </DropdownMenu.Item>
          {:else}
            <span class="px-4 text-sm font-bold">
              {$m.signedInAs({ user: session.user.name ?? session.user.email ?? "Unknown" })}
            </span>
            {#if session.user.role === "admin"}
              <DropdownMenu.Item class="dropdown-item block" href="{base}/newpost">
                {$m.post_newPost()}
              </DropdownMenu.Item>

              <DropdownMenu.Item class="dropdown-item block" href="{base}/auth/signout">
                {$m.signOut()}
              </DropdownMenu.Item>
            {/if}
          {/if}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <!-- dropdown for mobile -->
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class="block sm:hidden">
          <Menu class="h-12 w-12" />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          class="dropdown-menu"
          transition={fly}
          transitionConfig={{ duration: 150, y: -10 }}
        >
          <DropdownMenu.Item class="icon-flex dropdown-item" on:click={() => theme.toggle()}>
            {#if $theme === "light"}
              <Sunny class="h-4 w-4" />
              <span>{$m.lightTheme()}</span>
            {:else}
              <Night class="h-4 w-4" />
              <span>{$m.darkTheme()}</span>
            {/if}
          </DropdownMenu.Item>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger
              class="icon-flex px-4 py-2 transition-colors hover:bg-primary/20"
            >
              <Earth class="h-4 w-4" />
              <span>{$m.language()}</span>
              <ChevronRight class="ml-auto h-4 w-4" />
            </DropdownMenu.SubTrigger>

            <DropdownMenu.SubContent
              class="z-top max-w-xs rounded border border-primary/40 bg-background/60 backdrop-blur"
              transition={fly}
              transitionConfig={{ duration: 150, y: -10 }}
            >
              {#each availableLanguageTags as tag}
                <DropdownMenu.Item
                  class="dropdown-item block whitespace-nowrap"
                  href={langUrl($page.url, tag)}
                  hreflang={tag}
                >
                  {$m.lang({}, { languageTag: tag }) || tag}
                </DropdownMenu.Item>
              {/each}
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator class="h-[1px] bg-text/20" />

          {#if session?.user === undefined}
            <DropdownMenu.Item class="dropdown-item block" href="{base}/auth/signin">
              {$m.signIn()}
            </DropdownMenu.Item>
          {:else}
            <span class="px-4 text-sm font-bold">
              {$m.signedInAs({ user: session.user.name ?? session.user.email ?? "Unknown" })}
            </span>
            {#if session.user.role === "admin"}
              <DropdownMenu.Item class="dropdown-item block" href="{base}/newpost">
                {$m.post_newPost()}
              </DropdownMenu.Item>

              <DropdownMenu.Item class="dropdown-item block" href="{base}/auth/signout">
                {$m.signOut()}
              </DropdownMenu.Item>
            {/if}
          {/if}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  </div>
</nav>

<Toaster />

<main>
  <slot />
</main>
