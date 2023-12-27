<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { derived } from "svelte/store";
  import { createSelect, melt } from "@melt-ui/svelte";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import PageTitle from "$lib/components/PageTitle.svelte";
  import { useI18nStores } from "$lib/stores/i18n";
  import { Game2048, scoreStores } from "./2048";

  import Restart from "~icons/mdi/restart";
  import ExpandAll from "~icons/mdi/arrow-expand-all";
  import ChevronDown from "~icons/mdi/chevron-down";

  import type { KeyboardEventHandler } from "svelte/elements";

  import "./2048_colors.css";

  const { m } = useI18nStores();

  const {
    elements: { trigger, menu, option },
    states: { selected, open },
    helpers: { isSelected }
  } = createSelect<number>({
    defaultSelected: { value: 4 },
    forceVisible: true,
    preventScroll: false,
    positioning: {
      placement: "bottom",
      fitViewport: true,
      sameWidth: true
    }
  });

  const size = derived(selected, (s) => s?.value ?? 4);

  const game = new Game2048($size);
  const controller = game.controller;
  const { score, bestScore } = scoreStores(game);

  let gameOver = false;
  game.on("gameOver", () => {
    gameOver = true;
  });

  const moveMap = {
    ArrowLeft: "left",
    ArrowUp: "up",
    ArrowRight: "right",
    ArrowDown: "down"
  } as const;

  const onkeydown: KeyboardEventHandler<Document> = (e) => {
    if (moveMap.hasOwnProperty(e.key)) {
      e.preventDefault();
      // remove focus from current focused element (like the navbar menu)
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();

      game.move(moveMap[e.key as keyof typeof moveMap]);
    }
  };

  const restartGame = (s: number = $size) => {
    game.reset(s);
    game.gameStartBoxes();
    gameOver = false;
  };

  onMount(() => {
    size.subscribe(restartGame);
  });
</script>

<svelte:document
  on:mousedown|preventDefault={(e) => controller.start(e.clientX, e.clientY)}
  on:mousemove|preventDefault={(e) => controller.move(e.clientX, e.clientY)}
  on:mouseup|preventDefault={(e) => controller.end()}
  on:keydown={onkeydown}
/>

<CenteredPage>
  <div class="w-full max-w-screen-xl select-none">
    <PageTitle current="2048" />
    <div class="flex flex-col justify-evenly gap-4 p-4 lg:flex-row">
      <!-- left panel (scores & restart) -->
      <div class="space-y-4">
        <!-- scores -->
        <div class="flex flex-wrap gap-2">
          <div class="min-w-[8rem] rounded-sm bg-secondary p-2">
            <span class="text-lg">{$m.game_2048Score()}</span><br />
            <span class="text-2xl font-bold">{$score}</span>
          </div>
          <div class="min-w-[8rem] rounded-sm bg-secondary p-2">
            <span class="text-lg">{$m.game_2048BestScore()}</span><br />
            <span class="text-2xl font-bold">{$bestScore[$size]}</span>
          </div>
        </div>

        <div class="flex gap-2">
          <!-- change sizes -->
          <button class="btn-primary icon-flex" use:melt={$trigger}>
            <ExpandAll class="h-4 w-4" />
            {$size}x{$size}
            <ChevronDown class="h-4 w-4" />
          </button>
          {#if $open}
            <div class="dropdown-menu z-10" use:melt={$menu} transition:fade={{ duration: 150 }}>
              {#each [4, 6, 8] as sizeOption}
                <div
                  class="dropdown-item icon-flex relative cursor-pointer
                  {$isSelected(sizeOption) ? '!bg-primary/20' : ''}"
                  use:melt={$option({ value: sizeOption, label: `${sizeOption}x${sizeOption}` })}
                >
                  {sizeOption}x{sizeOption}
                </div>
              {/each}
            </div>
          {/if}

          <!-- restart -->
          <button class="btn-accent icon-flex" on:click={() => restartGame()}>
            <Restart class="h-4 w-4" />
            {$m.game_2048Restart()}
          </button>
        </div>
      </div>

      <!-- actual game -->
      <div
        id="stage"
        class="relative aspect-square w-[30rem] max-w-full overflow-clip rounded border border-text"
        style:--size={$size}
        on:touchstart|preventDefault={(e) =>
          controller.start(e.touches[0].clientX, e.touches[0].clientY)}
        on:touchmove|preventDefault={(e) =>
          controller.move(e.touches[0].clientX, e.touches[0].clientY)}
        on:touchend|preventDefault={(e) => controller.end()}
      >
        {#if gameOver}
          <div
            class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-secondary/40 backdrop-blur-[1px]"
            transition:fade={{ duration: 200 }}
          >
            <span class="text-2xl font-bold">{$m.game_2048GameOver()}</span><br />
            <span>{$m.game_2048GameOverMessage({ score: $score })}</span>
          </div>
        {/if}
      </div>

      <!-- right text -->
      <div class="max-w-xs">
        <span class="font-bold">{$m.game_2048InfoQ1()}</span><br />
        <span>{$m.game_2048InfoA1()}</span><br /><br />
        <span class="font-bold">{$m.game_2048InfoQ2()}</span><br />
        <span>{$m.game_2048InfoA2()}</span><br /><br />
        <span class="font-bold">{$m.game_2048InfoQ3()}</span><br />
        <span>{$m.game_2048InfoA3()}</span>
      </div>
    </div>
  </div>
</CenteredPage>

<style>
  :global(span.tile) {
    @apply absolute grid cursor-pointer place-items-center rounded-sm text-2xl transition-all;

    height: var(--tile);
    width: var(--tile);
    color: var(--color);
    background-color: var(--bg-color);

    --stage: min(30rem, 100%);
    --gap: 0.5rem;
    /* (size of stage - the gaps) / number of tiles (the size) */
    --tile: calc((var(--stage) - var(--gap) * (var(--size) + 1)) / var(--size));

    /* calculate the position of each tile */
    top: calc(var(--gap) * (var(--row, 0) + 1) + var(--tile) * var(--row));
    left: calc(var(--gap) * (var(--cell, 0) + 1) + var(--tile) * var(--cell));
  }
</style>
