<script lang="ts">
  import PostCard from "$lib/components/postCard.svelte";

  import { fadeIn, fadeOut } from "$lib/utils/transitions";
  import { base } from "$app/paths";

  import Facebook from "~icons/mdi/facebook";
  import Instagram from "~icons/mdi/instagram";
  import Github from "~icons/mdi/github";
  import ArrowDrop from "~icons/mdi/arrow-down-drop-circle-outline";
  import TNFSH_emblem from "$lib/assets/TNFSH_emblem.svg";

  export let data;
</script>

<section class="h-[640px] w-full items-center px-4 py-4">
  <div class="relative mx-auto h-full max-w-7xl">
    <div
      class="absolute left-0 top-1/2 z-10 flex w-[512px] -translate-y-1/2 flex-col items-start justify-start gap-4"
    >
      <div class="space-y-4">
        <span class="block text-6xl">電🐔社</span>
        <span class="block text-2xl">
          你說得對，但是電機社的常住人口有十幾人，同時，僅澳大利亞就有4700萬隻袋鼠。如果袋鼠決定入侵403，那麼每一個電機社員要打3百萬只袋鼠，你不知道，你不在乎，你只關心你自己。
        </span>
      </div>
      <div class="flex items-center justify-center gap-2">
        <a
          href="https://www.tnfsh.tn.edu.tw/form/Details.aspx?Parser=28,4,28,,,,34"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            class="h-8 w-8 bg-text"
            style="mask: url({TNFSH_emblem}) center / contain no-repeat;"
          />
        </a>
        <a href="https://www.facebook.com/TNFSHCEC" target="_blank" rel="noopener noreferrer">
          <Facebook class="h-8 w-8" />
        </a>
        <a href="https://www.instagram.com/tnfshcec" target="_blank" rel="noopener noreferrer">
          <Instagram class="h-8 w-8" />
        </a>
        <a href="https://github.com/tnfshcec" target="_blank" rel="noopener noreferrer">
          <Github class="h-8 w-8" />
        </a>
      </div>
    </div>
    <div
      class="absolute right-0 top-0 aspect-square h-full opacity-80 blur-[160px]"
      id="hero-gradient"
    />
  </div>
</section>

<section class="flex h-[288px] w-full flex-col items-center justify-center gap-4 px-16 py-24">
  <div class="max-w-4xl text-2xl">
    電機社！啟動！嘻嘻嘻嘻嘻！我最喜歡玩機器了，我是 Arduino
    玩家！你看這是我新買的模組～蜂鳴器！！蹦蹦喇叭～
  </div>
  <div class="inline-flex items-center justify-center gap-2">
    <ArrowDrop class="h-6 w-6" />
    <div class="text-xl">更多資訊</div>
  </div>
</section>

<style>
  #hero-gradient {
    background: radial-gradient(
        43% 43% at 64% 81%,
        var(--primary) 0%,
        rgba(157, 209, 216, 0) 100% /* transparent primary color */
          /* INFO: use "relative color syntax" when better browser support comes */
      ),
      radial-gradient(46% 79% at 67% 29%, var(--secondary) 0%, rgba(15, 22, 31, 0) 100%),
      radial-gradient(51% 63% at 41% 39%, var(--accent) 0%, rgba(151, 170, 206, 0) 100%);
  }
</style>
