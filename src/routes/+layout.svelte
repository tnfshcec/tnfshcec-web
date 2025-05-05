<script lang="ts">
  import "../app.postcss";

  import { page } from "$app/state";
  import { uwu } from "$lib/utils/uwu.svelte";
  import { locales, localizeHref } from "$paraglide/runtime";

  import Header from "$lib/components/Header.svelte";
  import { ModeWatcher } from "mode-watcher";
  import { MetaTags, deepMerge } from "svelte-meta-tags";

  let { data, children } = $props();

  let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));

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

<MetaTags {...metaTags} />

<ModeWatcher />

  <Header />

  <main>
    {@render children?.()}
  </main>

<!--
    NOTE: This is what the ParaglideJS docs recommends to
    let SvelteKit crawl pages of other languages.
    We were previously using <link>s; now this is using invisible <a>s.
-->
<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>
  
