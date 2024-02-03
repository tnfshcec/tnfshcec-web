<script lang="ts">
  import "../app.postcss";

  import { fly } from "svelte/transition";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { i18n } from "$lib/i18n";
  import { getPageInfo } from "$lib/utils/pageInfo";
  import { availableLanguageTags, languageTag } from "$paraglide/runtime";
  import * as m from "$paraglide/messages";

  import { ParaglideJS } from "@inlang/paraglide-js-adapter-sveltekit";
  import { ModeWatcher, toggleMode, mode } from "mode-watcher";
  import { DropdownMenu, Toggle } from "bits-ui";
  import { MetaTags } from "svelte-meta-tags";
  import Toaster from "$lib/components/Toaster.svelte";
  import Menu from "~icons/mdi/menu";
  import Sunny from "~icons/mdi/weather-sunny";
  import Night from "~icons/mdi/weather-night";
  import Earth from "~icons/mdi/earth";
  import ChevronRight from "~icons/mdi/chevron-right";
  import ChevronDown from "~icons/mdi/chevron-down";
  import Check from "~icons/mdi/check";
  import logo from "$lib/assets/logo.svg";

  // remove trailing slash in `pathname`, except the "/" path
  // we'll just make it "/" if the trimmed url results in "" (empty string).
  $: info = getPageInfo($page.url.pathname.replace(/\/$/, "") || "/");
  // TODO: scroll detection & changing title
</script>

<MetaTags
  title={info.title}
  description={info.description}
  canonical={$page.url.toString()}
  openGraph={{
    type: "website",
    locale: languageTag(),
    images: [
      {
        url: `${$page.url.origin}${base}/thumbnail.png`,
        width: 1280,
        height: 720,
        type: "image/png"
      }
    ]
  }}
  twitter={{ handle: "@tnfshcec", cardType: "summary_large_image" }}
/>

<ModeWatcher />

<ParaglideJS {i18n}>
  <!-- header bar -->
  <header
    class="sticky top-0 z-50 h-20 w-full border-b border-text/10 bg-background/60 px-4 py-2 backdrop-blur"
  >
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between">
      <!-- no idea why normal link here doesn't get translated -->
      <a href={i18n.resolveRoute(`${base}/`)} class="flex items-center gap-2 overflow-hidden">
        <img src={logo} class="h-12 w-12" alt="TNFSHCEC icon" />
        <div>
          <span class="whitespace-nowrap font-bold">{m.title()}</span>
          <br />
          <span class="whitespace-nowrap text-xl font-bold">{m.name()}</span>
        </div>
      </a>

      <div class="flex gap-8">
        <!-- theme toggle button -->
        <Toggle.Root
          class="hidden rounded-sm p-2 transition-colors hover:bg-primary/20 sm:block"
          onPressedChange={toggleMode}
        >
          {#if $mode === "light"}
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
                href={i18n.route($page.url.pathname)}
                hreflang={tag}
                aria-current={tag === languageTag() ? "page" : undefined}
              >
                {#if tag === languageTag()}
                  <Check class="h-4 w-4" />
                {:else}
                  <div class="h-4 w-4" />
                {/if}
                {m.lang({}, { languageTag: tag }) || tag}
              </DropdownMenu.Item>
            {/each}
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <!-- dropdown for mobile -->
        <DropdownMenu.Root preventScroll={false}>
          <DropdownMenu.Trigger class="block sm:hidden">
            <Menu class="h-12 w-12" />
          </DropdownMenu.Trigger>

          <DropdownMenu.Content
            class="dropdown-menu"
            transition={fly}
            transitionConfig={{ duration: 150, y: -10 }}
          >
            <DropdownMenu.Item class="icon-flex dropdown-item" on:click={toggleMode}>
              {#if $mode === "light"}
                <Sunny class="h-4 w-4" />
                <span>{m.light_theme()}</span>
              {:else}
                <Night class="h-4 w-4" />
                <span>{m.dark_theme()}</span>
              {/if}
            </DropdownMenu.Item>

            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger
                class="icon-flex px-4 py-2 transition-colors hover:bg-primary/20"
              >
                <Earth class="h-4 w-4" />
                <span>{m.language()}</span>
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
                    href={i18n.route($page.url.pathname)}
                    hreflang={tag}
                    aria-current={tag === languageTag() ? "page" : undefined}
                  >
                    {m.lang({}, { languageTag: tag }) || tag}
                  </DropdownMenu.Item>
                {/each}
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  </header>

  <Toaster />

  <main>
    <slot />
  </main>
</ParaglideJS>
