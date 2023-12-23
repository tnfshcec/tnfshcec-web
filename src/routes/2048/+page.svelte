<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import PageTitle from "$lib/components/PageTitle.svelte";
  import { Game2048, scoreStores } from "./2048";
  import Restart from "~icons/mdi/restart";
  import type { KeyboardEventHandler } from "svelte/elements";

  import "./2048_dark.css";

  let size: 4 | 8 = 4;

  const game = new Game2048(size);
  const controller = game.controller;
  const { score, bestScore } = scoreStores(game);

  let gameOver = false;
  game.on("gameOver", () => {
    gameOver = true;
  });

  onMount(() => game.gameStartBoxes());

  const moveMap = {
    ArrowLeft: "left",
    ArrowUp: "up",
    ArrowRight: "right",
    ArrowDown: "down"
  } as const;

  const onkeydown: KeyboardEventHandler<Document> = (e) => {
    if (moveMap.hasOwnProperty(e.key)) {
      e.preventDefault();
      // focus `document` so the global dropdown menu wouldn't be triggered
      document.documentElement.focus();
      game.move(moveMap[e.key as keyof typeof moveMap]);
    }
  };

  const restartGame = () => {
    game.reset();
    game.gameStartBoxes();
    gameOver = false;
  };
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
    <div class="flex flex-col justify-evenly gap-4 p-4 md:flex-row">
      <!-- left panel (scores & restart) -->
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <div class="min-w-[8rem] rounded-sm bg-secondary p-2">
            <span class="text-lg">SCORE</span><br />
            <span class="text-2xl font-bold">{$score}</span>
          </div>
          <div class="min-w-[8rem] rounded-sm bg-secondary p-2">
            <span class="text-lg">BEST</span><br />
            <span class="text-2xl font-bold">{$bestScore}</span>
          </div>
        </div>
        <button class="btn-accent icon-flex" on:click={restartGame}>
          <Restart class="h-4 w-4" />
          RESTART
        </button>
      </div>

      <!-- actual game -->
      <div
        id="stage"
        class="relative aspect-square w-[30rem] max-w-full overflow-clip rounded border border-text"
        style:--size={size}
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
            <span class="text-2xl font-bold">GAME OVER</span><br />
            <span>Score: {$score}</span>
          </div>
        {/if}
      </div>

      <!-- right text -->
      <div>
        <span class="font-bold">這裡為什麼有2048？</span><br />
        <span>我怎麼會知道。</span><br /><br />
        <span class="font-bold">2048怎麼玩？</span><br />
        <span>自己Google。</span><br /><br />
        <span class="font-bold">但是我要怎麼控制？</span><br />
        <span>方向鍵或直接滑動，滑鼠或觸控都可以。</span><br /><br />
        <span class="font-bold">這邊在供三小？</span><br />
        <span>不知道欸，我只是想放點字讓頁面不要這麼空。</span>
      </div>
    </div>
  </div>
</CenteredPage>

<style>
  :global(span.tile) {
    @apply absolute grid h-[var(--tile)] w-[var(--tile)] cursor-pointer place-items-center rounded-sm text-2xl transition-all;

    --stage: min(30rem, 100%);
    --gap: 0.5rem;
    /* (size of stage - the gaps) / number of tiles (the size) */
    --tile: calc((var(--stage) - var(--gap) * (var(--size) + 1)) / var(--size));

    /* calculate the position of each tile */
    top: calc(var(--gap) * (var(--row, 0) + 1) + var(--tile) * var(--row));
    left: calc(var(--gap) * (var(--cell, 0) + 1) + var(--tile) * var(--cell));
  }

  :global(.num2) {
    background: #eee4da;
    color: #776e65;
  }

  :global(.num4) {
    background: #ede0c8;
    color: #776e65;
  }

  :global(.num8) {
    background: #f2b179;
    color: #f9f6f2;
  }

  :global(.num16) {
    background: #f59563;
    color: #f9f4e7;
  }

  :global(.num32) {
    background: #f67c60;
    color: #f9f6f2;
  }

  :global(.num64) {
    background: #f65e3b;
    color: #f9f6f2;
  }

  :global(.num128) {
    background: #edcf73;
    color: #f9f6f2;
  }

  :global(.num256) {
    background: #edcc62;
    color: #f9f6f2;
  }

  :global(.num512) {
    background: #edc850;
    color: #fb4e4e;
  }

  :global(.num1024) {
    background: #6483b5;
    color: #f9f6f2;
  }

  :global(.num2048) {
    background: #edc53f;
    color: #f9f6f2;
  }

  :global(.num4096) {
    background: #edc22d;
    color: #f9f6f2;
  }
</style>
