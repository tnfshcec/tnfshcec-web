<script>
  /** @type {string | undefined} */
  export let title;
</script>

<div class="flex justify-center">
  <div
    class="p-6 my-4 rounded-2xl shadow-lg max-w-[65rem] min-w-[30rem] w-[80%] shadow-surface-400 bg-surface-200 space-y-4"
  >
    <h1 class="h1">{title}</h1>
    <slot />
  </div>
</div>
