<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { HTMLInputTypeAttribute } from "svelte/elements";

  export let value: unknown;
  export let id = "";
  export let label = id;
  export let type: HTMLInputTypeAttribute = "text";
  export let className = "";
  export let validate: (value: unknown) => boolean = () => true;

  const dispatch = createEventDispatcher();

  let checked = type === "checkbox" && Boolean(value);

  // input styles from skeleton
  let inputClass = ["file", "checkbox", "radio", "range", "color"].includes(type) ? type : "input";

  let isValid = validate(value);

  $: if (value === undefined || value === null) value = "";

  function doValidation(newValue: unknown) {
    isValid = validate(newValue);
    return isValid;
  }

  function handleInput(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
    const target = e.currentTarget;
    const newValue =
      type === "checkbox"
        ? target.checked
        : type.match(/^(number|range)$/)
        ? +target.value
        : target.value;

    if (!doValidation(newValue)) return;

    value = newValue;

    dispatch("input");
  }
</script>

<span class={className}>
  <label for={id} class="capitalize label">{label}</label>

  <input
    {value}
    {checked}
    {type}
    {id}
    class="accent-primary-400 px-2 {inputClass} {!isValid ? 'input-error' : ''}"
    placeholder={label}
    on:input={handleInput}
  />
</span>
