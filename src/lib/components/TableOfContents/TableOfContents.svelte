<script lang="ts">
  import TocItem from "./TableOfContentsItem.svelte";
  import { scrollOffset } from "$lib/utils/scrollOffset";
  import { createTableOfContents } from "@melt-ui/svelte";
  import * as m from "$paraglide/messages";

  export let selector: string;

  const {
    elements: { item },
    states: { activeHeadingIdxs, headingsTree }
  } = createTableOfContents({
    selector,
    exclude: ["h4", "h5", "h6"],
    activeType: "all",
    scrollOffset: scrollOffset(),
    headingFilterFn: (heading) => !heading.hasAttribute("data-toc-ignore")
  });
</script>

<p class="font-bold">{m.post_tableOfContents()}</p>
<nav>
  {#key $headingsTree}
    <TocItem tree={$headingsTree} activeHeadingIdxs={$activeHeadingIdxs} {item} />
  {/key}
</nav>
