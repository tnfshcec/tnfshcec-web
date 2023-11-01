<script lang="ts">
  import "../app.postcss";

  import icon from "$lib/assets/global-icon.png";
  import { base } from "$app/paths";

  import Menu from "~icons/mdi/menu";

  export let data;
  // TODO: session validation & display avatar
  // TODO: scroll response
</script>

<nav class="h-20 w-full border-b border-text/10 bg-background/70 px-8 py-2 backdrop-blur-lg">
  <div class="mx-auto flex w-full max-w-6xl items-center justify-between">
    <a href={base} class="flex gap-2">
      <img src={icon} class="h-12 w-12" alt="TNFSHCEC icon" />
      <div>
        <span class="font-bold">新樓醫院心臟科附屬</span>
        <br />
        <span class="text-xl font-bold">臺南一中電機社</span>
      </div>
    </a>
    <button><Menu class="h-12 w-12" /></button>
  </div>
</nav>

<main>
  <slot />
</main>
