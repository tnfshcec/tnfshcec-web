<script lang="ts">
  import "../app.postcss";

  import { page } from "$app/state";
  import { i18n } from "$lib/i18n";
  import { uwu } from "$lib/utils/uwu.svelte";
  import { availableLanguageTags } from "$paraglide/runtime";
  import extend from "just-extend";

  import Header from "$lib/components/Header.svelte";
  import { ParaglideJS } from "@inlang/paraglide-sveltekit";
  import { ModeWatcher } from "mode-watcher";
  import { MetaTags } from "svelte-meta-tags";

  let { data, children } = $props();

  const meta = extend(true, {}, data.baseMetaTags, page.data.pageMetaTags);

  // uwu stuff
  // read uwu state from localStorage and url param
  $effect(() => {
    let localUwu = localStorage.getItem("uwu");
    let uwuEnabled = localUwu === "true";
    switch (page.url.searchParams.get("uwu")) {
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
    uwu.enabled = uwuEnabled;
    localStorage.setItem("uwu", uwuEnabled ? "true" : "false");
  });
</script>

<MetaTags {...meta} />

<ModeWatcher />

<ParaglideJS {i18n}>
  <Header />

  <main>
    {@render children?.()}
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
    <link rel="alt-lang" href={i18n.resolveRoute(i18n.route(page.url.pathname), tag)} />
  {/each}
</svelte:head>
