<script lang="ts">
  import "../app.postcss";

  import { fly, slide } from "svelte/transition";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { i18n } from "$lib/i18n";
  import { getPageInfo } from "$lib/utils/pageInfo";
  import { availableLanguageTags, languageTag } from "$paraglide/runtime";
  import * as m from "$paraglide/messages";

  import { ParaglideJS } from "@inlang/paraglide-js-adapter-sveltekit";
  import { ModeWatcher, toggleMode, mode } from "mode-watcher";
  import { DropdownMenu, Toggle, Collapsible } from "bits-ui";
  import { Drawer } from "vaul-svelte";
  import { MetaTags } from "svelte-meta-tags";
  import Toaster from "$lib/components/Toaster.svelte";
  import Menu from "~icons/mdi/menu";
  import Sunny from "~icons/mdi/weather-sunny";
  import Night from "~icons/mdi/weather-night";
  import Earth from "~icons/mdi/earth";
  import ChevronRight from "~icons/mdi/chevron-right";
  import ChevronDown from "~icons/mdi/chevron-down";
  import Check from "~icons/mdi/check";
  import Flag from "~icons/mdi/flag-triangle";
  import Star from "~icons/mdi/star-four-points";
  import logo from "$lib/assets/logo.svg";

  // remove trailing slash in `pathname`, except the "/" path
  // we'll just make it "/" if the trimmed url results in "" (empty string).
  $: info = getPageInfo($page.url.pathname.replace(/\/$/, "") || "/");
  // TODO: scroll detection & changing title
</script>

<MetaTags
  title={info?.title}
  description={info?.description}
  robots={info?.noindex ? "noindex" : "index,follow"}
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

      <!-- disable flex-shrink, so only the title above shrinks -->
      <div class="ml-6 shrink-0">
        <!-- navbar buttons for larger screens -->
        <div class="hidden items-center gap-6 md:flex">
          <a
            href={i18n.resolveRoute(`${base}/posts`)}
            class="shrink-0 transition-colors hover:text-accent"
          >
            {m.post_list()}
          </a>
          <a href="https://ctf.tnfshcec.com" class="shrink-0 transition-colors hover:text-accent">
            GCUP CTF
          </a>

          <!-- theme toggle button -->
          <button
            class="rounded-sm p-2 transition-colors hover:bg-primary/20"
            on:click={toggleMode}
          >
            {#if $mode === "light"}
              <Night class="h-8 w-8" aria-label={m.dark_theme()} />
            {:else}
              <Sunny class="h-8 w-8" aria-label={m.light_theme()} />
            {/if}
          </button>

          <!-- language change button -->
          <DropdownMenu.Root preventScroll={false}>
            <DropdownMenu.Trigger
              class="flex items-center rounded-sm border border-text/20 p-1 transition-colors hover:bg-primary/20"
            >
              <Earth class="h-8 w-8" aria-label={m.language()} />
              <ChevronDown class="h-6 w-6" />
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              class="z-top max-w-xs rounded border border-text/20 bg-background/60 backdrop-blur"
              sideOffset={4}
              transition={fly}
              transitionConfig={{ duration: 150, y: -10 }}
            >
              {#each availableLanguageTags as tag}
                <DropdownMenu.Item
                  class="flex items-center gap-2 whitespace-nowrap px-4 py-2 transition-colors first:rounded-t last:rounded-b hover:bg-primary/20"
                  href={i18n.route($page.url.pathname)}
                  hreflang={tag}
                  aria-current={tag === languageTag() ? "page" : undefined}
                >
                  {#if tag === languageTag()}
                    <Check class="h-4 w-4" />
                  {:else}
                    <div role="none" />
                  {/if}
                  {m.lang({}, { languageTag: tag }) || tag}
                </DropdownMenu.Item>
              {/each}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>

        <!-- drawer for mobile -->
        <Drawer.Root direction="right">
          <Drawer.Trigger class="block md:hidden">
            <Menu class="h-12 w-12" aria-label={m.menu()} />
          </Drawer.Trigger>

          <Drawer.Portal>
            <Drawer.Overlay class="fixed inset-0 bg-[black]/20" />
            <Drawer.Content
              class="fixed bottom-0 right-0 top-0 z-top flex min-w-80 max-w-[90%] flex-col rounded-l border border-text/20 bg-background py-4 shadow-lg"
            >
              <Drawer.Title class="px-4 text-lg font-bold">Menu</Drawer.Title>

              <hr class="my-2 w-full text-text/20" />

              <a
                class="icon-flex w-full px-4 py-2 transition-colors hover:bg-primary/20"
                href="{base}/posts"
              >
                <Star class="h-4 w-4" />
                {m.post_list()}
              </a>
              <a
                class="icon-flex w-full px-4 py-2 transition-colors hover:bg-primary/20"
                href="https://ctf.tnfshcec.com"
              >
                <Flag class="h-4 w-4" />
                GCUP CTF
              </a>

              <hr class="my-2 w-full text-text/20" />

              <button
                class="icon-flex w-full px-4 py-2 transition-colors hover:bg-primary/20"
                on:click={toggleMode}
              >
                {#if $mode === "light"}
                  <Sunny class="h-4 w-4" />
                  <span>{m.light_theme()}</span>
                {:else}
                  <Night class="h-4 w-4" />
                  <span>{m.dark_theme()}</span>
                {/if}
              </button>

              <Collapsible.Root>
                <Collapsible.Trigger
                  class="icon-flex group w-full px-4 py-2 transition-colors hover:bg-primary/20"
                >
                  <Earth class="h-4 w-4" />
                  <span>{m.language()}</span>
                  <ChevronRight
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-90"
                  />
                </Collapsible.Trigger>

                <Collapsible.Content transition={slide} class="rounded-b border-b border-text/20">
                  {#each availableLanguageTags as tag}
                    <!-- that href is disgusting, but paraglide somehow doesn't work here -->
                    <a
                      class="flex w-full items-center gap-2 whitespace-nowrap px-4 py-2 transition-colors last:rounded-b hover:bg-primary/20"
                      href={i18n.resolveRoute(i18n.route($page.url.pathname), tag)}
                      hreflang={tag}
                      aria-current={tag === languageTag() ? "page" : undefined}
                    >
                      {#if tag === languageTag()}
                        <Check class="h-4 w-4" />
                      {:else}
                        <div class="h-4 w-4" role="none" />
                      {/if}
                      {m.lang({}, { languageTag: tag }) || tag}
                    </a>
                  {/each}
                </Collapsible.Content>
              </Collapsible.Root>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  </header>

  <Toaster />

  <main>
    <slot />
  </main>
</ParaglideJS>
