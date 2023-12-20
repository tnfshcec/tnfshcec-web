<script lang="ts">
  import { onMount } from "svelte";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import PageTitle from "$lib/components/PageTitle.svelte";
  import { Game2048, getController } from "./2048";
  import type { KeyboardEventHandler } from "svelte/elements";
  import Restart from "~icons/mdi/restart";
  import "./2048_dark.css"

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
      <div class="space-y-2">
        <div class="flex gap-2">
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
      <div
        id="stage"
        class="relative h-[450px] w-[450px] rounded border border-text"
        on:touchstart|preventDefault={(e) =>
          controller.start(e.touches[0].clientX, e.touches[0].clientY)}
        on:touchmove|preventDefault={(e) =>
          controller.move(e.touches[0].clientX, e.touches[0].clientY)}
        on:touchend|preventDefault={(e) => controller.end()}
      />
      <div class="">
        <span class="font-bold">這裡為什麼有2048？</span><br />
        <span class="">我怎麼會知道。</span><br /><br />
        <span class="font-bold">2048怎麼玩？</span><br />
        <span class="">自己Google。</span><br /><br />
        <span class="font-bold">但是我要怎麼控制？</span><br />
        <span class="">方向鍵或直接滑動，滑鼠或觸控都可以。</span>
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
    background: #EEE4DA;
    color: #776E65;
  }

  :global(.num4) {
    background: #EDE0C8;
    color: #776E65;
  }

  :global(.num8) {
    background: #F2B179;
    color: #F9F6F2;
  }

  :global(.num16) {
    background: #F59563;
    color: #F9F4E7;
  }

  :global(.num32) {
    background: #F67C60;
    color: #F9F6F2;
  }

  :global(.num64) {
    background: #F65E3B;
    color: #F9F6F2;
  }

  :global(.num128) {
    background: #EDCF73;
    color: #F9F6F2;
  }

  :global(.num256) {
    background: #EDCC62;
    color: #F9F6F2;
  }

  :global(.num512) {
    background: #EDC850;
    color: #fb4e4e;
  }

  :global(.num1024) {
    background: #6483b5;
    color: #F9F6F2;
  }

  :global(.num2048) {
    background: #EDC53F;
    color: #F9F6F2;
  }

  :global(.num4096) {
    background: #EDC22D;
    color: #F9F6F2;
  }
</style>
