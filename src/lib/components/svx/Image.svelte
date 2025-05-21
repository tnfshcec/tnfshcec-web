<script lang="ts">
  import { browser } from "$app/environment";

  interface Props {
    src?: string;
    alt?: string;
    title?: string | undefined;
  }

  let { src = "", alt = "", title = undefined }: Props = $props();
</script>

<figure>
  <img {src} {alt} {title} class="w-full min-w-24 max-w-lg" />

  {#if title}
    <figcaption class="italic">{title}</figcaption>
  {/if}
</figure>
