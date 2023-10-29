<script lang="ts">
  import "../app.postcss";

  import icon from "$lib/assets/global-icon.png";
  import { base } from "$app/paths";

  import Menu from "~icons/mdi/menu";

  export let data;
  // TODO: session validation & display avatar
  // TODO: scroll response
</script>

<nav class="border-text/90 bg-background/20 h-24 w-full border-b p-4 backdrop-blur-lg">
  <div class="mx-auto flex w-full max-w-4xl items-center justify-between">
    <a href={base} class="flex gap-2">
      <img src={icon} class="h-16 w-16" alt="TNFSHCEC icon" />
      <div>
        <span class="text-xl font-bold">新樓醫院心臟科附屬</span>
        <br />
        <span class="text-3xl font-bold">電機社</span>
      </div>
    </a>
    <button><Menu class="h-12 w-12" /></button>
  </div>
</nav>

<slot />
