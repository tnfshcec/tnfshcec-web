<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { HTMLInputTypeAttribute } from "svelte/elements";

  export let value: unknown;
  export let label = "";
  export let type: HTMLInputTypeAttribute = "text";
  export let className = "px-2";
  export let container = "";
  export let inline = false;
  export let isActive = false;
  export let validate: (value: unknown) => boolean = () => true;

  const dispatch = createEventDispatcher();

  let checked = type === "checkbox" && Boolean(value);

  let inputClass = inline // inline input class
    ? "bg-transparent rounded-container-token hover:bg-primary-hover-token"
    : ["file", "checkbox", "radio", "range", "color"].includes(type)
    ? type // input styles from skeleton
    : "input";

  let isValid = validate(value);

  $: if (value === undefined || value === null) value = "";

  function doValidation(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
    isValid = validate(e.currentTarget.value);
  }

  function handleChange(e: Event) {
    const target = e.target as EventTarget & HTMLInputElement;
    value =
      type === "checkbox"
        ? target.checked
        : type.match(/^(number|range)$/)
        ? +target.value
        : target.value;

    dispatch("change");
  }
</script>

<span class={container}>
  {#if !inline}
    <label for={label} class="capitalize label">{label}</label>
  {/if}

  <input
    {value}
    {checked}
    {type}
    class="accent-primary-400 {inputClass} {className} {!isValid ? 'input-error' : ''}"
    id={label}
    placeholder={label}
    on:change={handleChange}
    on:input={doValidation}
    on:focusin={() => (isActive = true)}
    on:focusout={() => (isActive = false)}
  />
</span>
