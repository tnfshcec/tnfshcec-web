<script lang="ts">
  import { sineOut } from "svelte/easing";
  import { getContext } from "svelte";
  import type { Readable } from "svelte/store";
  import logo from "$lib/assets/logo.svg";
  import * as m from "$paraglide/messages";
  import { base } from "$app/paths";

  let uwu = getContext<Readable<boolean>>("uwu");

  let activities = [
    { label: m.home_interests_religion(), labelPosition: [15.01, 5.69] },
    { label: m.home_interests_robot(), labelPosition: [9.73, 6.81] },
    { label: m.home_interests_drama(), labelPosition: [8.31, 11.27] },
    { label: m.home_insterets_legal(), labelPosition: [0, 11.45] },
    { label: m.home_interests_japan(), labelPosition: [10.11, 14.69] },
    { label: m.home_interests_software(), labelPosition: [15.29, 11.94] },
    { label: m.home_interests_hardware(), labelPosition: [11.79, 18.5] },
    { label: m.home_interests_poetry(), labelPosition: [18.42, 16.38] }
  ];

  // drag animation parameters
  const THRESHOLD = 150;
  const MULTIPLIER = 1 / 6.9;
  function dragStart(e: MouseEvent & { currentTarget: HTMLDivElement }) {
    // add events
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", endDrag);

    const node = e.currentTarget;
    const initialPos = [node.offsetLeft, node.offsetTop];
    const initialMousePos = [e.clientX, e.clientY];

    function onDrag(e: MouseEvent) {
      if (!e.buttons) endDrag();

      // math (i don't know what i'm doing)
      let movedX = e.clientX - initialMousePos[0];
      let movedY = e.clientY - initialMousePos[1];
      const dist = Math.sqrt(movedX * movedX + movedY * movedY);
      const rate = sineOut(Math.min((dist / THRESHOLD) * MULTIPLIER, 1));

      movedX = rate * THRESHOLD * (movedX / dist);
      movedY = rate * THRESHOLD * (movedY / dist);

      node.style.left = initialPos[0] + movedX + "px";
      node.style.top = initialPos[1] + movedY + "px";
    }

    function endDrag() {
      window.removeEventListener("mousemove", onDrag);

      const animation = node.animate(
        { left: `${initialPos[0]}px`, top: `${initialPos[1]}px` },
        { duration: 250, easing: "ease-out" }
      );
      animation.onfinish = () => {
        // actually reset the values after animation
        node.style.left = `${initialPos[0]}px`;
        node.style.top = `${initialPos[1]}px`;
      };
    }
  }
</script>

<div class="relative aspect-square h-96">
  <svg class="h-full w-full">
    <!-- inset drop shadows from https://css-tricks.com/adding-shadows-to-svg-icons-with-css-and-svg-filters -->
    <filter id="inset-shadow">
      <!-- Shadow offset -->
      <feOffset dx="0" dy="0" />

      <!-- Shadow blur -->
      <feGaussianBlur stdDeviation="8" result="offset-blur" />

      <!-- Invert drop shadow to make an inset shadow -->
      <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />

      <!-- Cut color inside shadow -->
      <feFlood flood-color="rgb(var(--accent))" flood-opacity=".95" result="color" />
      <feComposite operator="in" in="color" in2="inverse" result="shadow" />
    </filter>
    <image href={logo} width="100%" height="100%" filter="url(#inset-shadow)" />
  </svg>

  {#each activities as act}
    <div
      class="btn-accent absolute cursor-grab select-none whitespace-nowrap"
      style:left="{act.labelPosition[0]}rem"
      style:top="{act.labelPosition[1]}rem"
      role="presentation"
      onmousedown={dragStart}
    >
      {act.label}
    </div>
  {/each}

  <a
    class="btn-accent absolute select-none whitespace-nowrap"
    style:left="19.21rem"
    style:top="3.89rem"
    href={$uwu ? `${base}/?uwu=0` : `${base}/?uwu`}
  >
    {$uwu ? "no uwu" : "uwu?"}
  </a>
</div>

<style>
</style>
