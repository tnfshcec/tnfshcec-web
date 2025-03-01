<script lang="ts">
  import { onMount } from "svelte";

  let breath = $state(0); // range 0..1
  let rotation = $state(0); // range 0..1

  onMount(() => {
    const interval = setInterval(() => {
      breath = Math.sin(Date.now() / 20) / 2 + 0.5;
      rotation = Math.sin(Date.now() / 23) / 2 + 0.5;
    }, 5000);

    return () => clearInterval(interval);
  });
</script>

<div
  class="absolute right-0 top-0 aspect-square h-full max-w-full opacity-80 blur-[160px]"
  style:--size="{breath * 20 + 90}%"
  style:--rotate="{rotation * 30 - 15}deg"
  id="hero-gradient"
></div>

<style>
  #hero-gradient::before {
    position: absolute;
    inset: 0;
    content: "";

    transition:
      scale 10s ease-out,
      rotate 10s ease-out;

    background-position: center;
    background-repeat: no-repeat;
    background-image: radial-gradient(
        43% 43% at 64% 81%,
        rgb(var(--primary)) 0%,
        rgb(var(--primary) / 0) 100%
      ),
      radial-gradient(46% 79% at 67% 29%, rgb(var(--secondary)) 0%, rgb(var(--secondary) / 0) 100%),
      radial-gradient(51% 63% at 41% 39%, rgb(var(--accent)) 0%, rgb(var(--accent) / 0) 100%);

    scale: var(--size);
    rotate: var(--rotate);
  }

  #hero-gradient:hover {
    --size: 110% !important;
  }
</style>
