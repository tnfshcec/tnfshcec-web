<script lang="ts">
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
  import { createTableOfContents, melt } from "@melt-ui/svelte";

  import PageTitle from "$lib/components/PageTitle.svelte";
  import Toc from "$lib/components/TableOfContents.svelte";
  import IconButton from "$lib/components/IconButton.svelte";
  import Pin from "~icons/mdi/pin";
  import Pencil from "~icons/mdi/pencil-circle";

  import { fadeIn, fadeOut, flyIn, flyOut } from "$lib/utils/transitions";
  import { rawPlugin, slugPlugin, componentsPlugin } from "$lib/utils/exmarkdown-plugins";
  import { localeDateFromString } from "$lib/utils/date.js";
  import { base } from "$app/paths";

  export let data;

  let {
    md,
    data: { title, author, date, image, pinned, url }
  } = data;
  let localeDate = localeDateFromString(date ?? "");

  const {
    elements: { item },
    states: { activeHeadingIdxs, headingsTree }
  } = createTableOfContents({
    selector: "#post-content",
    exclude: ["h4", "h5", "h6"],
    activeType: "all",
    headingFilterFn: (heading) => !heading.hasAttribute("data-toc-ignore")
  });
</script>

<div class="flex w-full p-4">
  <!-- left space -->
  <div class="flex-1" />

  <div class="order-last flex-1">
    <div class="sticky top-20 w-max max-w-xs p-4">
      <p class="font-bold">On This Page</p>
      <nav>
        {#key $headingsTree}
          <Toc tree={$headingsTree} activeHeadingIdxs={$activeHeadingIdxs} {item} />
        {/key}
      </nav>
    </div>
  </div>

  <div id="post-content" class="relative flex w-full max-w-screen-xl flex-col gap-4">
    <PageTitle current="post" {title}>
      <div>
        {#if pinned}
          <Pin class="-mt-1 inline h-4 w-4 text-primary" />
        {/if}
        {author ? `By ${author}` : ""}
        {author && date ? "/" : ""}
        {localeDate}
      </div>
    </PageTitle>

    <IconButton
      class="absolute right-4 top-10 rounded border border-accent/80 p-2 text-accent transition-all hover:border-accent hover:shadow-glow hover:shadow-accent/40"
      text="Edit"
      href="{base}/post/{url}/edit"
    >
      <Pencil class="h-4 w-4" />
    </IconButton>

    {#if image}
      <div class="p-4">
        <img
          src={image}
          alt=""
          class="max-h-80 w-full rounded object-cover shadow-glow shadow-primary/20"
        />
      </div>
    {/if}

    <article class="prose space-y-4">
      <Markdown {md} plugins={[gfmPlugin, rawPlugin, slugPlugin, componentsPlugin]} />
    </article>
  </div>
</div>
