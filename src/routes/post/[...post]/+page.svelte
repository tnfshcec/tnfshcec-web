<script lang="ts">
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";

  import Pin from "~icons/mdi/pin";

  import { fadeIn, fadeOut, flyIn, flyOut } from "$lib/utils/transitions";
  import { rawPlugin, slugPlugin, componentsPlugin } from "$lib/utils/exmarkdown-plugins";
  import { localeDateFromString } from "$lib/utils/date.js";
  import PageTitle from "$lib/components/PageTitle.svelte";

  export let data;

  let {
    md,
    data: { title, author, date, image, pinned, url }
  } = data;
  let localeDate = localeDateFromString(date ?? "");
</script>

<div class="flex w-full p-4">
  <!-- left space -->
  <div class="flex-1" />

  <div class="order-last flex-1">
    <!-- TODO: table of contents -->
  </div>

  <div id="post-content" class="flex w-full max-w-screen-xl flex-col gap-4">
    <PageTitle current="post" {title}>
      <div class="">
        {#if pinned}
          <Pin class="-mt-1 inline h-4 w-4 text-primary" />
        {/if}
        {author || ""}
        {author && date ? "/" : ""}
        {localeDate || ""}
      </div>
    </PageTitle>

    <article class="prose space-y-4">
      <Markdown {md} plugins={[gfmPlugin, rawPlugin, slugPlugin, componentsPlugin]} />
    </article>
  </div>
</div>
