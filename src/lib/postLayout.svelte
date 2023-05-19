<script>
  import { flyIn, flyOut } from "$lib/utils/transitions";
  /** @type {string | undefined} */
  export let title;
</script>

<div class="flex justify-center">
  <div
    class="p-6 my-4 rounded-2xl shadow-lg max-w-[65rem] min-w-[20rem] w-[80%]
           shadow-surface-400 bg-surface-200 space-y-4 dark:shadow-surface-500 dark:bg-surface-700"
    in:flyIn={{ y: 100 }}
    out:flyOut={{ y: -100 }}
  >
    <h1 class="h1">{title}</h1>
    <slot />
  </div>
</div>
