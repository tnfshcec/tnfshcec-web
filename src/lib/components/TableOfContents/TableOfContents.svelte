<script lang="ts">
  import { onMount } from "svelte";
  import { createTableOfContents } from "@melt-ui/svelte";
  import { scrollOffset } from "$lib/utils/scrollOffset";
  import Tree from "./Tree.svelte";
  import ChevronUp from "~icons/mdi/chevron-up";
  import * as m from "$paraglide/messages";

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

  // reactive scrollY for "scroll to top" button
  let scrollY = 0;
  let setter = () => (scrollY = window.scrollY);
  onMount(() => {
    window.addEventListener("scroll", setter);
    return () => window.removeEventListener("scroll", setter);
  });
</script>

<nav>
  {#key $headingsTree}
    <Tree tree={$headingsTree} activeHeadingIdxs={$activeHeadingIdxs} {item} on:click />
  {/key}

  {#if scrollY > 500}
    <a href="" class="icon-flex mt-2">
      <ChevronUp />
      {m.scroll_to_top()}
    </a>
  {/if}
</nav>
