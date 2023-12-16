<script lang="ts">
  import { onMount } from "svelte";
  import { Game2048, getController } from "./2048";
  import type { KeyboardEventHandler } from "svelte/elements";

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
  on:mousedown={(e) => controller.start(e.clientX, e.clientY)}
  on:mousemove={(e) => controller.move(e.clientX, e.clientY)}
  on:mouseup={(e) => controller.end()}
  on:touchstart={(e) => controller.start(e.touches[0].clientX, e.touches[0].clientY)}
  on:touchmove={(e) => controller.move(e.touches[0].clientX, e.touches[0].clientY)}
  on:touchend={(e) => controller.end()}
  on:keyup={onkeyup}
/>

<div class="">
  <div class="text-center text-4xl font-bold text-primary">2048</div>
  <div class="select-none text-center">
    <span>Score:</span>
    <span class="text-xl">{score}</span>
  </div>
  <div
    id="stage"
    class="relative mx-auto h-[450px] w-[450px] cursor-pointer select-none rounded border border-accent"
  />
</div>

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
    background: #fff;
    color: #777;
  }

  :global(.num4) {
    background: #fafafa;
    color: #e9b856;
  }

  :global(.num8) {
    background: #f3f3f3;
    color: #f94e2f;
  }

  :global(.num16) {
    background: #f5ec00;
    color: #fff;
  }

  :global(.num32) {
    background: #fcc20e;
    color: #fdfdfd;
  }

  :global(.num64) {
    background: #f94a3b;
    color: #fff;
  }

  :global(.num128) {
    background: #222;
    color: #f94e2f;
  }

  :global(.num256) {
    background: #d13100;
    color: #ffcc66;
  }

  :global(.num512) {
    background: #fff300;
    color: #fb4e4e;
  }

  :global(.num1024) {
    background: #6483b5;
    color: #f6f7ff;
  }

  :global(.num2048) {
    background: #000000;
    color: #fff300;
  }

  :global(.num4096) {
    background: #ff0099;
    color: #fff;
  }
</style>
