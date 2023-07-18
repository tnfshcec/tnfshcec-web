<script lang="ts">
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  import "../app.postcss";
  import "../theme.postcss";
  import "../typography-prose.css";

  import hljs from "highlight.js";
  import "highlight.js/styles/atom-one-dark.css";

  import { computePosition, autoUpdate, offset, shift, flip, arrow } from "@floating-ui/dom";

  import {
    AppBar,
    AppShell,
    Avatar,
    Drawer,
    TableOfContents,
    LightSwitch,
    popup,
    storeHighlightJs,
    drawerStore,
    storePopup,
    type PopupSettings
  } from "@skeletonlabs/skeleton";
  storeHighlightJs.set(hljs);
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  import vitamin from "$lib/assets/vitamin-d.png";
  import { onScroll } from "$lib/stores/scroll";
  import { base } from "$app/paths";
  import { page } from "$app/stores";

  function scrollEvent(e: Event) {
    onScroll.fireEvent(e as Event & { currentTarget: EventTarget & HTMLDivElement });
  }

  $: scrolled = $onScroll.scrollY > 100;

  let authPopup: PopupSettings = {
    event: "click",
    target: "auth-popup",
    placement: "bottom",
    middleware: {
      offset: {
        mainAxis: 15,
        crossAxis: -110
      }
    }
  };
</script>

<Drawer>
  {#if $drawerStore.id === "post-toc"}
    <TableOfContents target="#post-content" on:click={() => drawerStore.close()} />
  {/if}
</Drawer>

<AppShell on:scroll={scrollEvent}>
  <svelte:fragment slot="header">
    <AppBar slotTrail="space-x-8">
      <svelte:fragment slot="lead">
        <a href="{base}/">
          <img
            src={vitamin}
            alt=""
            class="transition-all duration-300 {scrolled ? 'w-12' : 'w-20'}"
          /></a
        >
      </svelte:fragment>

      <svelte:fragment slot="trail">
        <LightSwitch />
        <button class="btn-icon {scrolled ? 'w-10' : 'w-14'}" use:popup={authPopup}>
          <Avatar
            src={$page.data.session?.user?.image ?? undefined}
            fallback="GS"
            width="transition-all duration-300 "
          />
        </button>

        <div class="card variant-filled-surface p-4 space-y-4" data-popup="auth-popup">
          {#if $page.data.session}
            <div>
              <small>Signed in as</small><br />
              <strong>{$page.data.session?.user?.email ?? $page.data.session?.user?.name}</strong>
            </div>
            <a href="/auth/signout" class="btn variant-filled">Sign out</a>
          {:else}
            <div>
              <strong>You are not logged in!</strong>
            </div>
            <a href="/auth/signin" class="btn variant-filled">Sign in</a>
          {/if}
        </div>
      </svelte:fragment>

      <span>
        <span class="text-base whitespace-nowrap">新樓醫院心臟科附屬</span>
        <br />
        <span class="text-3xl whitespace-nowrap">電機社</span>
      </span>
    </AppBar>
  </svelte:fragment>
  <!-- header -->

  <slot />
</AppShell>
