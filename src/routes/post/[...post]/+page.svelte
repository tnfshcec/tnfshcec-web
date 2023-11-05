<script lang="ts">
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
  import { createTableOfContents, createDialog, melt } from "@melt-ui/svelte";

  import PageTitle from "$lib/components/PageTitle.svelte";
  import Toc from "$lib/components/TableOfContents.svelte";
  import Pin from "~icons/mdi/pin";
  import List from "~icons/mdi/format-list-bulleted-type";
  import Pencil from "~icons/mdi/pencil-circle";

  import { withIcon } from "$lib/components/actions.js";
  import { rawPlugin, slugPlugin, componentsPlugin } from "$lib/utils/exmarkdown-plugins";
  import { localeDateFromString } from "$lib/utils/date.js";
  import { base } from "$app/paths";
  import { fade, fly } from "svelte/transition";

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

  const {
    elements: { trigger, overlay, content, title: dTitle, portalled },
    states: { open }
  } = createDialog({
    forceVisible: true
  });
</script>

<div class="flex w-full p-4">
  <!-- left space -->
  <div class="flex-1" />

  <div class="order-last flex-1">
    <div class="sticky top-20 hidden w-max max-w-xs p-4 md:block">
      <p class="font-bold">On This Page</p>
      <nav>
        {#key $headingsTree}
          <Toc tree={$headingsTree} activeHeadingIdxs={$activeHeadingIdxs} {item} />
        {/key}
      </nav>
    </div>
  </div>

  <div id="post-content" class="relative flex w-full min-w-0 max-w-screen-xl flex-col gap-4">
    <PageTitle current="post" {title}>
      <div use:withIcon>
        {#if pinned}
          <Pin class="h-4 w-4 text-primary" />
        {/if}
        <span>
          {pinned && !author && !date ? "Pinned" : ""}
          {author ? `By ${author}` : ""}
          {author && date ? "/" : ""}
          {localeDate}
        </span>
      </div>

      <div slot="title" class="flex flex-grow basis-0 flex-wrap justify-end gap-2">
        <button class="btn-text flex items-center gap-2 md:hidden" use:melt={$trigger}>
          <!-- NOTE: cannot use withIcon because of melt -->
          <List class="h-4 w-4" />
          <span>Contents</span>
        </button>
        {#if data.session?.user?.role === "admin"}
          <a class="btn-accent" href="{base}/post/{url}/edit" use:withIcon>
            <Pencil class="h-4 w-4" />
            <span>Edit</span>
          </a>
        {/if}
      </div>
    </PageTitle>

    <div use:melt={$portalled}>
      {#if $open}
        <div
          use:melt={$overlay}
          class="fixed inset-0 z-top bg-background/60"
          transition:fade={{ duration: 150 }}
        />
        <div
          class="fixed right-0 top-0 z-top h-full w-full max-w-sm bg-background p-4 shadow-glow-sm shadow-text/60"
          use:melt={$content}
          transition:fly={{ duration: 150, x: 10 }}
        >
          <p class="font-bold" use:melt={$dTitle}>On This Page</p>
          <nav>
            {#key $headingsTree}
              <Toc tree={$headingsTree} activeHeadingIdxs={$activeHeadingIdxs} {item} />
            {/key}
          </nav>
        </div>
      {/if}
    </div>

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
      <!-- TODO: codeblock highlighting, styling / custom codeblock -->
      <!-- TODO: footnotes plugin -->
      <Markdown {md} plugins={[gfmPlugin, rawPlugin, slugPlugin, componentsPlugin]} />
    </article>
  </div>
</div>
