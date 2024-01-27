<script lang="ts">
  import { createTableOfContents } from "@melt-ui/svelte";
  import { scrollOffset } from "$lib/utils/scrollOffset";
  import Tree from "./Tree.svelte";

  export let selector: string;

  const {
    elements: { item },
    states: { activeHeadingIdxs, headingsTree }
  } = createTableOfContents({
    selector,
    exclude: ["h1", "h4", "h5", "h6"],
    activeType: "all",
    scrollOffset: scrollOffset(),
    headingFilterFn: (heading) => !heading.hasAttribute("data-toc-ignore")
  });
</script>

<nav>
  {#key $headingsTree}
    <Tree tree={$headingsTree} activeHeadingIdxs={$activeHeadingIdxs} {item} on:click />
  {/key}
</nav>
