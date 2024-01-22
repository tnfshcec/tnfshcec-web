<script lang="ts">
  import "../app.postcss";

  import { fly } from "svelte/transition";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { pageDetectTheme, useThemeStore } from "$lib/stores/theme";
  import { pageDetectLanguage, useI18nStores, langUrl } from "$lib/stores/i18n";
  import { availableLanguageTags } from "$paraglide/runtime";

  import { DropdownMenu } from "bits-ui";
  import Toaster from "$lib/components/Toaster.svelte";
  import Menu from "~icons/mdi/menu";
  import Brightness from "~icons/mdi/brightness-5";
  import Moon from "~icons/mdi/moon-waning-crescent";
  import Earth from "~icons/mdi/earth";
  import ChevronRight from "~icons/mdi/chevron-right";
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
  <meta
    name="description"
    content="國立臺南第一高級中學電機（🐔）（日研、佛、法研、話劇）詩社（教團）（雞舍）OFFICIAL"
  />

  <meta property="og:title" content={$m.name()} />
  <meta
    property="og:description"
    content="國立臺南第一高級中學電機（🐔）（日研、佛、法研、話劇）詩社（教團）（雞舍）OFFICIAL"
  />
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

    <!-- dropdown menu -->
    <DropdownMenu.Root>
      <DropdownMenu.Trigger class={session?.user?.image ? "relative after:content-['_']" : ""}>
        <Menu class="h-12 w-12" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        class="z-top max-w-xs rounded border border-primary/40 bg-background/60 backdrop-blur"
        transition={fly}
        transitionConfig={{ duration: 150, y: -10 }}
      >
        <DropdownMenu.Item
          class="icon-flex rounded-t px-4 py-2 transition-colors hover:bg-primary/20"
          on:click={() => theme.toggle()}
        >
          {#if $theme === "light"}
            <Brightness class="h-4 w-4" />
            <span>{$m.lightTheme()}</span>
          {:else}
            <Moon class="h-4 w-4" />
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
                class="block whitespace-nowrap px-4 py-2 transition-colors first:rounded-t last:rounded-b hover:bg-primary/20"
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
          <DropdownMenu.Item
            class="block rounded-b px-4 py-2 transition-colors hover:bg-primary/20"
            href="{base}/auth/signin"
          >
            {$m.signIn()}
          </DropdownMenu.Item>
        {:else}
          <span class="px-4 text-sm font-bold">
            {$m.signedInAs({ user: session.user.name ?? session.user.email ?? "Unknown" })}
          </span>
          {#if session.user.role === "admin"}
            <DropdownMenu.Item
              class="block px-4 py-2 transition-colors hover:bg-primary/20"
              href="{base}/newpost"
            >
              {$m.post_newPost()}
            </DropdownMenu.Item>

            <DropdownMenu.Item
              class="block rounded-b px-4 py-2 transition-colors hover:bg-primary/20"
              href="{base}/auth/signout"
            >
              {$m.signOut()}
            </DropdownMenu.Item>
          {/if}
        {/if}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
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
