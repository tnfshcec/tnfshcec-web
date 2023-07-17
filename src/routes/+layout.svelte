<script lang="ts">
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  import "../app.postcss";
  import "../theme.postcss";
  import "../typography-prose.css";

  import hljs from "highlight.js";
  import "highlight.js/styles/atom-one-dark.css";

  import {
    AppBar,
    AppShell,
    Drawer,
    TableOfContents,
    LightSwitch,
    storeHighlightJs,
    drawerStore
  } from "@skeletonlabs/skeleton";
  storeHighlightJs.set(hljs);

  import vitamin from "$lib/assets/vitamin-d.png";
  import { onScroll } from "$lib/stores/scroll";
  import { base } from "$app/paths";

  function scrollEvent(e: Event) {
    onScroll.fireEvent(e as Event & { currentTarget: EventTarget & HTMLDivElement });
  }

  $: scrolled = $onScroll.scrollY > 100;
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
            class="transition-[height] duration-300"
            style="height: {scrolled ? '3rem' : '5rem'}"
          /></a
        >
      </svelte:fragment>

      <svelte:fragment slot="trail">
        <LightSwitch />
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
