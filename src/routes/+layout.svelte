<script>
  import "@skeletonlabs/skeleton/themes/theme-skeleton.css";
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  import "../app.postcss";

  import { AppBar, AppShell } from "@skeletonlabs/skeleton";

  import vitamin from "$lib/assets/vitamin-d.png";
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar slotTrail="space-x-8">
      <svelte:fragment slot="lead">
        <img src={vitamin} alt="" class="h-20" />
      </svelte:fragment>

      <span>
        <span class="text-base whitespace-nowrap">新樓醫院心臟科附屬</span>
        <br />
        <span class="text-3xl whitespace-nowrap">電機社</span>
      </span>

      <svelte:fragment slot="trail">
        <a href="#">主頁</a>
        <a href="#">ABOUT</a>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <!-- header -->

  <slot />
</AppShell>

<slot />