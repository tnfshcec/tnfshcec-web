<script lang="ts">
  import PostCard from "$lib/components/postCard.svelte";

  import { fadeIn, fadeOut } from "$lib/utils/transitions";
  import { base } from "$app/paths";

  import Facebook from "~icons/mdi/facebook";
  import Instagram from "~icons/mdi/instagram";
  import Github from "~icons/mdi/github";
  import ArrowDown from "~icons/mdi/arrow-down-drop-circle-outline";
  import ArrowRight from "~icons/mdi/arrow-right-drop-circle-outline";
  import TNFSH_emblem from "$lib/assets/TNFSH_emblem.svg";
  import IconButton from "$lib/components/IconButton.svelte";

  export let data;
</script>

<section class="h-[640px] w-full items-center px-4 py-4">
  <div class="relative mx-auto h-full max-w-7xl">
    <div
      class="absolute left-0 top-1/2 z-10 flex w-[512px] -translate-y-1/2 flex-col items-start justify-start gap-4"
    >
      <div class="space-y-4">
        <header class="text-6xl">電🐔社</header>
        <section class="text-2xl">
          你說得對，但是電機社的常住人口有十幾人，同時，僅澳大利亞就有4700萬隻袋鼠。如果袋鼠決定入侵403，那麼每一個電機社員要打3百萬只袋鼠，你不知道，你不在乎，你只關心你自己。
        </section>
      </div>
      <div class="flex items-center justify-center gap-2">
        <a
          href="https://www.tnfsh.tn.edu.tw/form/Details.aspx?Parser=28,4,28,,,,34"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            class="h-8 w-8 bg-text/80 transition-colors hover:bg-accent"
            style="mask: url({TNFSH_emblem}) center / contain no-repeat;"
          />
        </a>
        <a href="https://www.facebook.com/TNFSHCEC" target="_blank" rel="noopener noreferrer">
          <Facebook class="h-8 w-8 text-text/80 transition-colors hover:text-accent" />
        </a>
        <a href="https://www.instagram.com/tnfshcec" target="_blank" rel="noopener noreferrer">
          <Instagram class="h-8 w-8 text-text/80 transition-colors hover:text-accent" />
        </a>
        <a href="https://github.com/tnfshcec" target="_blank" rel="noopener noreferrer">
          <Github class="h-8 w-8 text-text/80 transition-colors hover:text-accent" />
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
  <IconButton class="transition-colors hover:text-accent" href="#news" text="更多資訊">
    <ArrowDown class="h-6 w-6" />
  </IconButton>
</section>

<section class="w-full px-4 py-16" id="news">
  <div class="mx-auto flex h-full max-w-7xl items-center justify-between">
    <div class="flex w-[512px] flex-col items-center gap-4">
      <header class="text-3xl font-bold">最新消息</header>
      <div class="text-2xl">
        你好，我是狒狒，目前在中国台湾桃园市六福村附近山区，刚刚突然开始下大雷雨，我急需钱买雨具，若我日后逃脱成功，必有钜额回报，你可以帮帮我吗？请加Line：87878787monkey，谢谢！
      </div>
      <IconButton
        class="rounded-2xl border border-accent/80 p-2 text-accent transition-colors hover:border-accent hover:shadow hover:shadow-accent"
        href="{base}/post"
        text="查看其他"
      >
        <ArrowRight class="h-6 w-6" />
      </IconButton>
    </div>
    <div class="flex flex-col items-center justify-center gap-4">
      {#each data.posts.slice(0, 3) as post}
        <PostCard {post} />
      {/each}
    </div>
  </div>
</section>

<style>
  #hero-gradient {
    background: radial-gradient(
        43% 43% at 64% 81%,
        rgb(var(--primary)) 0%,
        rgb(var(--primary) / 0) 100%
      ),
      radial-gradient(46% 79% at 67% 29%, rgb(var(--secondary)) 0%, rgb(var(--secondary) / 0) 100%),
      radial-gradient(51% 63% at 41% 39%, rgb(var(--accent)) 0%, rgb(var(--accent) / 0) 100%);
  }
</style>
