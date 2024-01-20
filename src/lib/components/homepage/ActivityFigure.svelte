<script context="module" lang="ts">
  export type ActivityLabel = {
    label: string;
    labelPosition: [number, number];
    pinPosition: [number, number];
  };
</script>

<script lang="ts">
  import { sineOut } from "svelte/easing";
  import logo from "$lib/assets/logo.svg";
  import type { Action } from "svelte/action";

  export let activities: ActivityLabel[];

  const activityLabel: Action<HTMLDivElement, { labelPosition: [number, number] }> = (
    node,
    { labelPosition }
  ) => {
    // some parameters for dragging animation
    const threshold = 100;
    const multiplier = 1 / 6.9;

    node.addEventListener("mousedown", (e) => {
      // start dragging
      // add events
      window.addEventListener("mousemove", onDrag);
      window.addEventListener("mouseup", endDrag);

      const initialPos = [node.offsetLeft, node.offsetTop];
      const initialMousePos = [e.clientX, e.clientY];

      function onDrag(e: MouseEvent) {
        if (!e.buttons) endDrag();

        // math (i don't know what i'm doing)
        let movedX = e.clientX - initialMousePos[0];
        let movedY = e.clientY - initialMousePos[1];
        const dist = Math.sqrt(movedX * movedX + movedY * movedY);
        const rate = sineOut(Math.min((dist / threshold) * multiplier, 1));

        movedX = rate * threshold * (movedX / dist);
        movedY = rate * threshold * (movedY / dist);

        node.style.left = initialPos[0] + movedX + "px";
        node.style.top = initialPos[1] + movedY + "px";
      }

      function endDrag() {
        window.removeEventListener("mousemove", onDrag);

        const animation = node.animate(
          { left: `${labelPosition[0]}rem`, top: `${labelPosition[1]}rem` },
          { duration: 250, easing: "ease-out" }
        );
        animation.onfinish = () => {
          // actually reset the values after animation
          node.style.left = `${labelPosition[0]}rem`;
          node.style.top = `${labelPosition[1]}rem`;
        };
      }
    });
  };
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
      <feFlood flood-color="rgb(var(--primary))" flood-opacity=".95" result="color" />
      <feComposite operator="in" in="color" in2="inverse" result="shadow" />
    </filter>
    <image href={logo} width="100%" height="100%" filter="url(#inset-shadow)" />
  </svg>
  {#each activities as act}
    <div class="group">
      <div
        class="btn-accent absolute cursor-grab select-none"
        style:left="{act.labelPosition[0]}rem"
        style:top="{act.labelPosition[1]}rem"
        use:activityLabel={act}
      >
        {act.label}
      </div>
      <div
        class="absolute h-2 w-2 rounded-full bg-accent/80 transition-colors group-hover:bg-accent"
        style:left="{act.pinPosition[0]}rem"
        style:top="{act.pinPosition[1]}rem"
      />
    </div>
  {/each}
</div>

<style>
</style>
