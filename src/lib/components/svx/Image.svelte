<script lang="ts">
  export let src = "";
  export let alt = "";
  export let title: string | undefined = undefined;
</script>

<figure>
    <img {src} {alt} {title} class="min-w-24 max-w-lg w-full" />

    {#if title}
      <figcaption class="italic">{title}</figcaption>
    {/if}
</figure>
