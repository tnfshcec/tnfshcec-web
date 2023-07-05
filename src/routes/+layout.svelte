<script lang="ts">
  import "../theme.postcss";
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  import "../app.postcss";

  import { AppBar, AppShell } from "@skeletonlabs/skeleton";

  import vitamin from "$lib/assets/vitamin-d.png";
  import { onScroll } from "$lib/stores/scroll";
  import { base } from "$app/paths";

  function scrollEvent(e: Event) {
    onScroll.fireEvent(e as Event & { currentTarget: EventTarget & HTMLDivElement });
  }

  $: scrolled = $onScroll.scrollY > 100;
</script>

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
