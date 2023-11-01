<script lang="ts">
  export let text: string;
  export let href = "";
  export let textClass = "";

  // TODO: <button /> variant
</script>

<a class="flex items-center gap-2 {$$props.class}" {href}>
  <slot />
  <div class={textClass}>{text}</div>
</a>
