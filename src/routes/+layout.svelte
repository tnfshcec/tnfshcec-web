<script lang="ts">
  import "../app.postcss";

  import { setContext } from "svelte";
  import { writable, type Readable } from "svelte/store";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import { i18n } from "$lib/i18n";
  import { getPageInfo } from "$lib/utils/pageInfo";
  import { availableLanguageTags, languageTag } from "$paraglide/runtime";

  import Header from "$lib/components/Header.svelte";
  import Toaster from "$lib/components/Toaster.svelte";
  import { ParaglideJS } from "@inlang/paraglide-js-adapter-sveltekit";
  import { ModeWatcher } from "mode-watcher";
  import { MetaTags } from "svelte-meta-tags";

  // remove trailing slash in `pathname`, except the "/" path
  // we'll just make it "/" if the trimmed url results in "" (empty string).
  $: info = getPageInfo($page.url.pathname.replace(/\/$/, "") || "/");

  // uwu stuff
  let uwu = writable(false);
  setContext<Readable<boolean>>("uwu", { subscribe: uwu.subscribe });

  $: if (browser) {
    let localUwu = localStorage.getItem("uwu");
    let uwuEnabled = localUwu === "true";
    switch ($page.url.searchParams.get("uwu")) {
      case "":
      case "1":
      case "true":
        uwuEnabled = true;
        break;
      case "0":
      case "false":
        uwuEnabled = false;
        break;
    }
    uwu.set(uwuEnabled);
    localStorage.setItem("uwu", uwuEnabled ? "true" : "false");
  }
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
  <Header />

  <Toaster />

  <main>
    <slot />
  </main>
</ParaglideJS>

<!--
    NOTE: This is a hack for SvelteKit to crawl the i18n pages.
    The ParaglideJS component already add similar <link> elements with _absolute_ links, which is better for SEO.
    But Sveltekit doesn't crawl absolute links for prerendering, so we add our own <link> with relative paths.
    Our <link>'s rel isn't spec'd so there should be no effect.
-->
<svelte:head>
  {#each availableLanguageTags as tag}
    <link rel="alt-lang" href={i18n.resolveRoute(i18n.route($page.url.pathname), tag)} />
  {/each}
</svelte:head>
