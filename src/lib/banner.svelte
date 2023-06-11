<script lang="ts">
  import { fadeIn, fadeOut } from "./utils/transitions";

  export let img: string;
</script>

<div
  class="w-full bg-[50%_45%] bg-fixed shadow-inner h-[25em]"
  style="background-image: url('{img}');"
  in:fadeIn
  out:fadeOut
/>
