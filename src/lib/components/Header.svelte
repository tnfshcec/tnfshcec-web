<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { i18n } from "$lib/i18n";
  import * as m from "$paraglide/messages";
  import { availableLanguageTags, languageTag } from "$paraglide/runtime";
  import { fly, slide } from "svelte/transition";
  import { uwu } from "$lib/utils/uwu.svelte";

  import logo from "$lib/assets/logo.svg";
  import uwuLogo from "$lib/assets/uwu-logo.png";
  import { Collapsible, DropdownMenu } from "bits-ui";
  import { mode, toggleMode } from "mode-watcher";
  import { Drawer } from "vaul-svelte";
  import Check from "~icons/mdi/check";
  import ChevronDown from "~icons/mdi/chevron-down";
  import ChevronRight from "~icons/mdi/chevron-right";
  import Earth from "~icons/mdi/earth";
  import Flag from "~icons/mdi/flag-triangle";
  import Menu from "~icons/mdi/menu";
  import Star from "~icons/mdi/star-four-points";
  import Info from "~icons/mdi/information-outline";
  import Night from "~icons/mdi/weather-night";
  import Sunny from "~icons/mdi/weather-sunny";
</script>

<header
  class="sticky top-0 z-50 h-20 w-full border-b border-text/10 bg-background/60 px-4 py-2 backdrop-blur"
>
  <div class="mx-auto flex w-full max-w-6xl items-center justify-between">
    <!-- no idea why normal link here doesn't get translated -->
    <a
      href="{base}/"
      class="grid w-full grid-cols-[3rem_minmax(0,1fr)] items-center gap-2 overflow-hidden"
    >
      <img
        src={uwu.enabled ? uwuLogo : logo}
        class="col-start-1 row-span-2 row-start-1"
        alt="TNFSHCEC icon"
      />
      <div class="col-start-2 whitespace-nowrap font-bold">{m.title()}</div>
      <div class="col-start-2 whitespace-nowrap text-xl font-bold" id="header-name">{m.name()}</div>
    </a>

    <!-- disable flex-shrink, so only the title above shrinks -->
    <div class="ml-6 shrink-0">
      <!-- navbar buttons for larger screens -->
      <div class="hidden items-center gap-6 lg:flex">
        <a
          href="{base}/post"
          class="shrink-0 transition-colors hover:text-accent"
        >
          {m.post_list()}
        </a>
        <a href="{base}/post/about" class="shrink-0 transition-colors hover:text-accent">
          {m.about()}
        </a>
        <a href="https://ctf.tnfshcec.com" class="shrink-0 transition-colors hover:text-accent">
          GCUP CTF
        </a>

        <!-- theme toggle button -->
        <button class="rounded-sm p-2 transition-colors hover:bg-primary/20" onclick={toggleMode}>
          {#if $mode === "light"}
            <!-- awkward fix - see https://github.com/tnfshcec/tnfshcec-web/issues/56#issuecomment-2315897422 -->
            <!-- basically we make the two SVGs different so Svelte updates it. -->
            <span>
              <Night class="h-8 w-8" aria-label={m.dark_theme()} id="night" />
            </span>
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
                  <div role="none"></div>
                {/if}
                {m.lang({}, { languageTag: tag }) || tag}
              </DropdownMenu.Item>
            {/each}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>

      <!-- drawer for mobile -->
      <Drawer.Root direction="right">
        <Drawer.Trigger class="block lg:hidden">
          <Menu class="h-12 w-12" aria-label={m.menu()} />
        </Drawer.Trigger>

        <Drawer.Portal>
          <Drawer.Overlay class="fixed inset-0 bg-[black]/20" />
          <Drawer.Content
            class="fixed bottom-0 right-0 top-0 z-top flex min-w-80 max-w-[90%] flex-col rounded-l border border-text/20 bg-background py-4 shadow-lg"
          >
            <Drawer.Title class="px-4 text-lg font-bold">{m.menu()}</Drawer.Title>

            <hr class="my-2 w-full text-text/20" />

            <a
              class="icon-flex w-full px-4 py-2 transition-colors hover:bg-primary/20"
              href="{base}/post"
            >
              <Star class="h-4 w-4" />
              {m.post_list()}
            </a>
            <a
              class="icon-flex w-full px-4 py-2 transition-colors hover:bg-primary/20"
              href="{base}/post/about"
            >
              <Info class="h-4 w-4" />
              {m.about()}
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
              onclick={toggleMode}
            >
              {#if $mode === "light"}
                <Night class="h-4 w-4" />
                <span>{m.dark_theme()}</span>
              {:else}
                <Sunny class="h-4 w-4" />
                <span>{m.light_theme()}</span>
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
                      <div class="h-4 w-4" role="none"></div>
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

<style>
  /* styles for external links */
  a[href^="http://"]:not([href^="http://www.tnfshcec.com"])::after,
  a[href^="https://"]:not([href^="https://www.tnfshcec.com"])::after,
  a[href^="//"]:not([href^="//www.tnfshcec.com"])::after
  {
    content: "";
    position: relative;
    display: inline-block;
    margin: 0 0.2em;
    top: 0.1em;
    width: 1em;
    height: 1em;
    background-color: currentColor;
    mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7Z"/></svg>');
  }

  #header-name {
    mask-image: linear-gradient(to right, white, 95%, transparent);
  }
</style>
