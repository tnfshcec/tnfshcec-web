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

  export const activityLabel: Action<HTMLDivElement, ActivityLabel> = (
    node,
    { label, labelPosition, pinPosition }
  ) => {
    // calculate line ends position
    // create svg
    // create line
    // create pin (the circle)
    // insert svg
    // create events (handle dragging)

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
      class="btn-accent absolute"
      style:left="{act.labelPosition[0]}rem"
      style:top="{act.labelPosition[1]}rem"
      use:activityLabel={act}
    >
      {act.label}
    </div>
  {/each}
</div>
