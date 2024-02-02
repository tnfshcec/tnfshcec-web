<script lang="ts">
  import { onMount } from "svelte";

  // sine wave range(0, 1)
  let breath = 0;

  onMount(() => {
    const interval = setInterval(() => {
      breath = Math.sin(Date.now() / 20) / 2 + 0.5;
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<div
  class="absolute right-0 top-0 aspect-square h-full max-w-full opacity-80 blur-[160px]"
  style:--size="{breath * 30 + 100}%"
  id="hero-gradient"
/>

<style>
  #hero-gradient {
    transition: background-size 2500ms ease-out;

    background-position: center;
    background-image: radial-gradient(
        43% 43% at 64% 81%,
        rgb(var(--primary)) 0%,
        rgb(var(--primary) / 0) 100%
      ),
      radial-gradient(46% 79% at 67% 29%, rgb(var(--secondary)) 0%, rgb(var(--secondary) / 0) 100%),
      radial-gradient(51% 63% at 41% 39%, rgb(var(--accent)) 0%, rgb(var(--accent) / 0) 100%);

    background-size: var(--size) var(--size);
  }

  #hero-gradient:hover {
    background-size: 150% 150%;
  }
</style>
