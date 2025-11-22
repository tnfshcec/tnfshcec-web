<script lang="ts">
  interface Props {
    src?: string;
    alt?: string;
    title?: string | undefined;
  }

  let { src = "", alt = "", title = undefined }: Props = $props();
</script>

<figure>
  <img {src} {alt} {title} class="w-full max-w-lg min-w-24" />

  {#if title}
    <figcaption class="italic">{title}</figcaption>
  {/if}
</figure>
