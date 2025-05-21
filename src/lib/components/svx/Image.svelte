<script lang="ts">
  import { browser } from "$app/environment";

  interface Props {
    src?: string;
    alt?: string;
    title?: string | undefined;
  }

  let { src = "", alt = "", title = undefined }: Props = $props();

  // WARN: dirty workaround (see mdsvex.config.js)
  // since i am lazy and used the vite URL method to import static assets,
  // which does not support ssr environment,
  // we need to prevent the server-rendered `file:///` src from showing.
  // and the below code is purely recommended by the svelte docs to update attributes after hydration.

  const initial = src;
  src = "";

  $effect(() => {
    // reset after mounted
    src = initial;
  });
</script>

<figure>
  <img {src} {alt} {title} class="w-full min-w-24 max-w-lg" />

  {#if title}
    <figcaption class="italic">{title}</figcaption>
  {/if}
</figure>
