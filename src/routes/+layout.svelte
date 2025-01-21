<script lang="ts">
  import { run } from 'svelte/legacy';

  import "../app.postcss";

  import { setContext } from "svelte";
  import { writable, type Readable } from "svelte/store";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import { i18n } from "$lib/i18n";
  import { availableLanguageTags } from "$paraglide/runtime";
  import extend from "just-extend";

  import Header from "$lib/components/Header.svelte";
  import { ParaglideJS } from "@inlang/paraglide-sveltekit";
  import { ModeWatcher } from "mode-watcher";
  import { MetaTags } from "svelte-meta-tags";

  let { data, children } = $props();

  const meta = extend(true, {}, data.baseMetaTags, $page.data.pageMetaTags);

  // uwu stuff
  let uwu = writable(false);
  setContext<Readable<boolean>>("uwu", { subscribe: uwu.subscribe });

  run(() => {
    if (browser) {
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
