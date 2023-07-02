<script lang="ts">
  import { onScroll } from "./stores/scroll";
  import { fadeIn, fadeOut } from "./utils/transitions";

  export let img: string;
  export let parallaxRate = 0;

  $: y = 45 + $onScroll.scrollY * parallaxRate;
</script>

<div
  class="w-full bg-fixed shadow-inner h-[25em]"
  style="background-image: url('{img}'); background-position: 50% {y}%;"
  in:fadeIn
  out:fadeOut
/>
