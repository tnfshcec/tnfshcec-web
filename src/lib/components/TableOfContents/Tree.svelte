<!-- https://www.melt-ui.com/docs/builders/table-of-contents -->
<script lang="ts">
  import Tree from './Tree.svelte';
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import { type TableOfContentsItem, type TableOfContentsElements, melt } from "@melt-ui/svelte";

  interface Props {
    tree?: TableOfContentsItem[];
    activeHeadingIdxs: number[];
    item: TableOfContentsElements["item"];
    level?: number;
  }

  let {
    tree = [],
    activeHeadingIdxs,
    item,
    level = 1
  }: Props = $props();
</script>

<ul class="m-0 list-none {level !== 1 ? 'pl-4' : ''}">
  {#if tree && tree.length}
    {#each tree as heading, i (i)}
      <li class="mt-0 pt-2">
        <a
          href="#{heading.id}"
          use:melt={$item(heading.id)}
          class="inline-flex items-center justify-center gap-2 text-text/60 no-underline transition-colors
                 hover:!text-accent data-[active]:text-text"
          onclick={bubble('click')}
        >
          <!--
            Along with the heading title, the original heading node
            is also passed down, so you can display headings
            however you want.
          -->
          {@html heading.node.innerHTML}
        </a>
        {#if heading.children && heading.children.length}
          <Tree
            tree={heading.children}
            level={level + 1}
            {activeHeadingIdxs}
            {item}
            on:click
          />
        {/if}
      </li>
    {/each}
  {/if}
</ul>
