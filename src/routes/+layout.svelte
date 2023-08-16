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
    LightSwitch,
    Modal,
    TableOfContents,
    Toast,
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

  export let data;

  function scrollEvent(e: Event) {
    onScroll.fireEvent(e as Event & { currentTarget: EventTarget & HTMLDivElement });
  }

  $: scrolled = $onScroll.scrollY > 100;

  let authPopup: PopupSettings = {
    event: "click",
    target: "auth-popup",
    placement: "bottom-end",
    middleware: {
      offset: {
        mainAxis: 15,
        crossAxis: -35
      }
    }
  };
</script>

<Modal />

<Toast />

<Drawer>
  {#if $drawerStore.id === "post-toc"}
    <TableOfContents target="#post-content" on:click={() => drawerStore.close()} />
  {/if}
</Drawer>

<AppShell slotPageHeader="sticky top-0 z-10 shadow-md" on:scroll={scrollEvent}>
  <svelte:fragment slot="pageHeader">
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
            src={data.session?.user?.image ?? undefined}
            initials="UW"
            width="transition-all duration-300 "
          />
        </button>

        <div class="card variant-ghost-surface p-4 space-y-4" data-popup="auth-popup">
          {#if data.session}
            <div>
              <small>Signed in as {data.session.user?.role?.toUpperCase() ?? "USER"}</small><br />
              <strong>{data.session.user?.email ?? data.session.user?.name}</strong>
            </div>
            <a href="{base}/auth/signout" class="btn variant-filled">Sign out</a>
          {:else}
            <div>hello there</div>
            <a href="{base}/auth/signin" class="btn variant-filled">Sign in</a>
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
