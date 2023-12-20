<script lang="ts">
  import { onMount } from "svelte";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import PageTitle from "$lib/components/PageTitle.svelte";
  import { Game2048, getController } from "./2048";
  import type { KeyboardEventHandler } from "svelte/elements";
  import Restart from "~icons/mdi/restart";
  import "./2048_dark.css";

  const game = new Game2048();
  const controller = getController(game);

  let stage = game.stage;
  let score = game.score;

  game.on("stageChange", (newStage) => {
    stage = newStage;
  });
  game.on("score", (newScore) => {
    score = newScore;
  });

  onMount(() => game.newBox());

  const onkeyup: KeyboardEventHandler<Document> = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        game.move("left");
        break;
      case "ArrowUp":
        game.move("up");
        break;
      case "ArrowRight":
        game.move("right");
        break;
      case "ArrowDown":
        game.move("down");
        break;
    }
  };
</script>

<svelte:document
  on:mousedown|preventDefault={(e) => controller.start(e.clientX, e.clientY)}
  on:mousemove|preventDefault={(e) => controller.move(e.clientX, e.clientY)}
  on:mouseup|preventDefault={(e) => controller.end()}
  on:keyup|preventDefault={onkeyup}
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
            <span class="text-2xl font-bold">{score}</span>
          </div>
          <div class="min-w-[8rem] rounded-sm bg-secondary p-2">
            <span class="text-lg">BEST</span><br />
            <span class="text-2xl font-bold">99999</span>
          </div>
        </div>
        <button class="btn-accent icon-flex">
          <Restart class="h-4 w-4" />
          RESTART
        </button>
      </div>

      <!-- actual game -->
      <div
        id="stage"
        class="relative h-[450px] w-[450px] flex-shrink-0 rounded border border-text"
        on:touchstart|preventDefault={(e) =>
          controller.start(e.touches[0].clientX, e.touches[0].clientY)}
        on:touchmove|preventDefault={(e) =>
          controller.move(e.touches[0].clientX, e.touches[0].clientY)}
        on:touchend|preventDefault={(e) => controller.end()}
      />

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
  :global(.row0) {
    top: 10px;
  }
  :global(.row1) {
    top: 120px;
  }
  :global(.row2) {
    top: 230px;
  }
  :global(.row3) {
    top: 340px;
  }
  :global(.cell0) {
    left: 10px;
  }
  :global(.cell1) {
    left: 120px;
  }
  :global(.cell2) {
    left: 230px;
  }
  :global(.cell3) {
    left: 340px;
  }

  :global(span.tile) {
    @apply absolute grid h-[100px] w-[100px] cursor-pointer select-none place-items-center rounded-sm text-center text-2xl transition-all;
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

