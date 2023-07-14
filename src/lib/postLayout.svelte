<script>
  import { flyIn, flyOut } from "$lib/utils/transitions";
  import { localeDate } from "$lib/utils/date";
  export let /** @type {string | undefined} */ title,
    /** @type {string | undefined} */ author,
    /** @type {string | undefined} */ date,
    /** @type {boolean | undefined} */ pinned;

  date = localeDate(date);
</script>

<div class="flex justify-center">
  <div
    class="p-4 my-4 shadow-lg max-w-[65rem] min-w-[20rem] w-[80%] card"
    in:flyIn={{ y: 100 }}
    out:flyOut={{ y: -100 }}
  >
    <header class="card-header">
      <span class="block text-surface-600 dark:text-surface-300">
        {pinned ? "📌" : ""}
        {author || ""}
        {author && date ? "/" : ""}
        {date || ""}
      </span>
      <h1 class="h1">{title}</h1>
    </header>
    <section class="p-4 prose">
      <slot />
    </section>
  </div>
</div>
