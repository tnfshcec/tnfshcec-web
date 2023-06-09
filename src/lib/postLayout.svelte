<script>
  import { flyIn, flyOut } from "$lib/utils/transitions";
  export let /** @type {string | undefined} */ title,
    /** @type {string | undefined} */ author,
    /** @type {string | undefined} */ date,
    /** @type {boolean | undefined} */ pinned;
</script>

<div class="flex justify-center">
  <div
    class="p-6 my-4 rounded-xl shadow-md max-w-[65rem] min-w-[20rem] w-[80%]
           shadow-surface-400 bg-surface-100 space-y-4 dark:shadow-surface-500 dark:bg-surface-800"
    in:flyIn={{ y: 100 }}
    out:flyOut={{ y: -100 }}
  >
    <div>
      <span class="block text-surface-600 dark:text-surface-300">
        {pinned ? "📌" : ""}
        {author || ""}
        {author && date ? "/" : ""}
        {date || ""}
      </span>
      <h1 class="h1">{title}</h1>
    </div>
    <slot />
  </div>
</div>
