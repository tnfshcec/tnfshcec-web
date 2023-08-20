<script lang="ts">
  import { fadeIn, fadeOut } from "$lib/utils/transitions";

  export let src: string;
  export let className: string = "";
  export let blur: number = 8;
</script>

<div
  style:background-image="url({src})"
  style:--blur-amt="{blur}px"
  id="glow-img"
  class={className}
  in:fadeIn
  out:fadeOut
/>

<style>
  #glow-img {
    position: relative;
  }

  #glow-img::after {
    content: "";
    position: absolute;
    inset: 0;
    background: inherit;
    filter: blur(var(--blur-amt, 8px));
    z-index: -1;
  }
</style>
