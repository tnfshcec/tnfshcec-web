<script lang="ts">
  export let type: "anchor" | "button" = "anchor";
  export let text: string;
  export let href = "";
  export let textClass = "";

  let className = "";
  export { className as class };
</script>

{#if type == "anchor"}
  <a class="flex items-center gap-2 {className}" {href} on:click>
    <slot />
    <div class={textClass}>{text}</div>
  </a>
{:else if type == "button"}
  <button class="flex items-center gap-2 {className}" on:click>
    <slot />
    <div class={textClass}>{text}</div>
  </button>
{/if}
