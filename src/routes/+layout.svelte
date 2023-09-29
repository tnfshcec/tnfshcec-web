<script lang="ts">
  import "../app.postcss";

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
    getDrawerStore,
    initializeStores,
    popup,
    storeHighlightJs,
    storePopup,
    type PopupSettings
  } from "@skeletonlabs/skeleton";

  import icon from "$lib/assets/global-icon.png";
  import { onScroll } from "$lib/stores/scroll";
  import { base } from "$app/paths";

  export let data;

  initializeStores();
  storeHighlightJs.set(hljs);
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  const drawerStore = getDrawerStore();

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

  $: scrolled = $onScroll.scrollY > 100;
</script>

<Modal />

<Toast />

<Drawer>
  {#if $drawerStore.id === "post-toc"}
    <TableOfContents on:click={() => drawerStore.close()} />
  {/if}
</Drawer>

<!-- NOTE: AppShell doesn't support scroll-margin -->
<AppShell slotHeader="z-10 shadow-md" regionPage="scroll-smooth" on:scroll={onScroll.fireEvent}>
  <svelte:fragment slot="header">
    <AppBar slotTrail="space-x-8">
      <svelte:fragment slot="lead">
        <a href="{base}/">
          <img src={icon} alt="" class="transition-all duration-300 {scrolled ? 'w-12' : 'w-20'}" />
        </a>
      </svelte:fragment>

      <a href="{base}/">
        <span class="whitespace-nowrap text-base">新樓醫院心臟科附屬</span>
        <br />
        <span class="whitespace-nowrap text-3xl">電機社</span>
      </a>

      <svelte:fragment slot="trail">
        <LightSwitch />
        <button class="btn-icon {scrolled ? 'w-10' : 'w-14'}" use:popup={authPopup}>
          <Avatar
            src={data.session?.user?.image ?? undefined}
            initials="UW"
            width="transition-all duration-300 "
          />
        </button>

        <div class="card variant-ghost-surface space-y-4 p-4 backdrop-blur" data-popup="auth-popup">
          {#if data.session}
            <div>
              <small>Signed in as {data.session.user?.role?.toUpperCase() ?? "USER"}</small><br />
              <strong>{data.session.user?.email ?? data.session.user?.name}</strong>
            </div>
            <a href="{base}/auth/signout" class="variant-filled-primary btn">Sign out</a>
          {:else}
            <div>hello there</div>
            <a href="{base}/auth/signin" class="variant-filled-primary btn">Sign in</a>
          {/if}
        </div>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <!-- header -->

  <slot />
</AppShell>
