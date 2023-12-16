<script lang="ts">
  import { onMount } from "svelte";
  import { Game2048, getController } from "./2048";
  import type { KeyboardEventHandler } from "svelte/elements";

  const gameObj = new Game2048();
  const controller = getController(gameObj);

  onMount(() => gameObj.newBox());

  const onkeyup: KeyboardEventHandler<Document> = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        gameObj.move("left");
        break;
      case "ArrowUp":
        gameObj.move("up");
        break;
      case "ArrowRight":
        gameObj.move("right");
        break;
      case "ArrowDown":
        gameObj.move("down");
        break;
    }
  };
</script>

<svelte:document
  on:mousedown={(e) => controller.start(e.clientX, e.clientY)}
  on:mousemove={(e) => controller.move(e.clientX, e.clientY)}
  on:mouseup={(e) => controller.end(e.clientX, e.clientY)}
  on:keyup={onkeyup}
/>

<p>join the number to get 2048 tile!</p>
<div class="">
  <div class="text-center text-4xl font-bold text-primary">2048</div>
  <div class="relative text-right">
    <span style="margin-top:-13px;">score:</span>
    <span class="text-xl">0</span>
    <div id="addScore" class="absolute bottom-0 right-0 opacity-0 transition-all"></div>
  </div>
  <div
    id="stage"
    class="relative mx-auto h-[450px] w-[450px] cursor-pointer select-none rounded border border-accent"
  />
</div>

<style>
  #addScore.show {
    opacity: 1;
  }

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
    @apply absolute grid h-[100px] w-[100px] cursor-pointer select-none place-items-center rounded-sm text-center text-2xl;
    @apply transition-all;
  }

  :global(.num2) {
    @apply animate-[0.5s] animate-[myfirst];
    background: #fff;
    color: #777;
  }

  :global(.num4) {
    @apply animate-[0.5s] animate-[myfirst];
    background: #fafafa;
    color: #e9b856;
  }

  :global(.num8) {
    @apply animate-[0.5s] animate-[myfirst];
    background: #f3f3f3;
    color: #f94e2f;
  }

  :global(.num16) {
    @apply animate-[0.5s] animate-[myfirst];
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

  @keyframes myfirst {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.5);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @-moz-keyframes myfirst /* Firefox */ {
    0% {
      opacity: 0;
      -moz-transform: scale(0);
    }
    50% {
      opacity: 0.5;
      -moz-transform: scale(1.5);
    }
    100% {
      opacity: 1;
      -moz-transform: scale(1);
    }
  }
  @-webkit-keyframes myfirst /* Safari or Chrome */ {
    0% {
      opacity: 0;
      -webkit-transform: scale(0);
    }
    50% {
      opacity: 0.5;
      -webkit-transform: scale(1.5);
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
    }
  }
</style>
