<script lang="ts">
  import type { HTMLInputTypeAttribute } from "svelte/elements";

  export let value: unknown,
    label = "",
    type: HTMLInputTypeAttribute = "text",
    className = "",
    inline = false,
    isActive = false;

  let checked = type === "checkbox" && Boolean(value);

  let inputClass = inline // inline input class
    ? "bg-transparent rounded-container-token hover:bg-primary-hover-token"
    : ["file", "checkbox", "radio", "range", "color"].includes(type)
    ? type // input styles from skeleton
    : "input";
</script>

<span>
  {#if label}
    <label for={label} class="capitalize label">{label}</label>
  {/if}

  <input
    {value}
    {checked}
    {type}
    class="accent-primary-400 {inputClass} {className}"
    id={label}
    on:focusin={() => (isActive = true)}
    on:focusout={() => (isActive = false)}
  />
</span>
