<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import { createTableOfContents } from "@melt-ui/svelte";
  import TocItem from "./TableOfContentsItem.svelte";
  import { scrollOffset } from "$lib/utils/scrollOffset";
  import type { I18nStores } from "$lib/stores/i18n";

  export let selector: string;

  const { m } = getContext<I18nStores>("i18n");

  const dispatch = createEventDispatcher<{ itemClick: MouseEvent }>();

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

<p class="font-bold">{$m.post_tableOfContents()}</p>
<nav>
  {#key $headingsTree}
    <TocItem
      tree={$headingsTree}
      activeHeadingIdxs={$activeHeadingIdxs}
      {item}
      on:click={(e) => dispatch("itemClick", e)}
    />
  {/key}
</nav>
