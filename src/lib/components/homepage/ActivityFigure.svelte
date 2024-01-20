<script context="module" lang="ts">
  export type ActivityLabel = {
    label: string;
    labelPosition: [number, number];
    pinPosition: [number, number];
  };
</script>

<script lang="ts">
  import logo from "$lib/assets/logo.svg";
  import type { Action } from "svelte/action";

  export let activities: ActivityLabel[];

  const distance = (...x: number[]) =>
    Math.sqrt(x.map((n) => Math.pow(n, 2)).reduce((prev, curr) => prev + curr));
  const activityLabel: Action<HTMLDivElement, ActivityLabel> = (
    node,
    { label, labelPosition, pinPosition }
  ) => {
    // create events (handle dragging)
    node.addEventListener("mousedown", (e) => {
      window.addEventListener("mousemove", onDrag);
      window.addEventListener("mouseup", endDrag);

      const initialPos = [node.offsetLeft, node.offsetTop];
      const initialMousePos = [e.clientX, e.clientY];

      function onDrag(e: MouseEvent) {
        if (!e.buttons) endDrag();

        let movedX = e.clientX - initialMousePos[0];
        let movedY = e.clientY - initialMousePos[1];
        const dist = distance(movedX, movedY);

        const threshold = 100;
        const rate = Math.min(dist / threshold, 1);
        movedX = rate * threshold * (movedX / dist);
        movedY = rate * threshold * (movedY / dist);

        node.style.left = initialPos[0] + movedX + "px";
        node.style.top = initialPos[1] + movedY + "px";
      }

      function endDrag() {
        window.removeEventListener("mousemove", onDrag);
        node.style.left = `${labelPosition[0]}rem`;
        node.style.top = `${labelPosition[1]}rem`;
      }
    });

    return {
      update: ({ label, labelPosition, pinPosition }) => {
        // do update
      }
    };
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
    <div
      class="btn-accent absolute cursor-move select-none"
      style:left="{act.labelPosition[0]}rem"
      style:top="{act.labelPosition[1]}rem"
      use:activityLabel={act}
    >
      {act.label}
    </div>
    <div
      class="absolute h-2 w-2 rounded-full bg-accent"
      style:left="{act.pinPosition[0]}rem"
      style:top="{act.pinPosition[1]}rem"
    />
  {/each}
</div>

<style>
</style>
