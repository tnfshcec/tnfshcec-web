<script lang="ts">
  import { fadeIn, fadeOut, flyIn, flyOut } from "$lib/utils/transitions";

  export let title: string;
</script>

<h1 class="mb-3 h1" in:fadeIn out:fadeOut># {title}</h1>

<p class="space-y-3" in:flyIn={{ x: 20 }} out:flyOut={{ x: -20 }}>
  <slot />
</p>
