<script lang="ts">
  import { base } from "$app/paths";
  import type { ComponentProps } from "svelte";

  import Comment from "$lib/components/Comment.svelte";
  import PostCard from "$lib/components/PostCard.svelte";
  import { anchorScroll } from "$lib/components/actions";
  import * as m from "$paraglide/messages";

  import TNFSH_emblem from "$lib/assets/TNFSH_emblem.svg";
  import Facebook from "~icons/mdi/facebook";
  import Instagram from "~icons/mdi/instagram";
  import Github from "~icons/mdi/github";
  import ArrowDown from "~icons/mdi/arrow-down-drop-circle-outline";
  import ArrowRight from "~icons/mdi/arrow-right-drop-circle-outline";

  export let data;

  const comments: ComponentProps<Comment>[][] = [
    [
      { username: "原批", handle: "@gayshitenjoyer", comment: "我的評價是不如原神" },
      { username: "我要AI色圖！！", handle: "@horn_yart", comment: "啥時會有4090玩 😡" },
      { username: "荖蒿", handle: "@haolao", comment: "這就資訊社吧，根本抄襲！" }
    ],
    [
      {
        username: "✨✨",
        handle: "@yun._.0618",
        comment: "這網站都在複製可愛ㄉ文案\n可惜我的可愛不能複製 UwU"
      },
      { username: "鈍棄疾", handle: "@nobleg", comment: "我打了一學期手遊，好像沒人發現我 🫥" }
    ],
    [
      { username: "顆粒玩家", handle: "@kleeplayer", comment: "哈哈，電機社，啟動！" },
      {
        username: "欸冷握可",
        handle: "@alan_wolk",
        comment:
          "看這網站，花了我0.1%的電量，1M的流量，幾秒的時間，73焦耳的熱量，還浪費我用26鍵打了60個漢字，9個逗號，1個句號，13個阿拉伯數字，讓我原本不富裕的家庭雪上加霜。"
      }
    ]
  ];
</script>

<section class="h-[65vh] min-h-[20rem] w-full items-center p-4">
  <div class="relative mx-auto h-full max-w-screen-xl">
    <div
      class="absolute left-0 top-1/2 z-10 flex max-w-lg -translate-y-1/2 flex-col items-start gap-4"
    >
      <div class="space-y-4">
        <header class="text-4xl font-bold">{m.home_title()}</header>
        <section class="text-xl">{m.home_description()}</section>
      </div>
      <div class="flex items-center justify-center gap-2">
        <a
          href="https://www.tnfsh.tn.edu.tw/form/Details.aspx?Parser=28,4,28,,,,34"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            class="h-8 w-8 bg-text/80 transition-colors hover:bg-accent"
            style:mask="url({TNFSH_emblem}) center / contain no-repeat"
            style:-webkit-mask="url({TNFSH_emblem}) center / contain no-repeat"
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
      class="absolute right-0 top-0 aspect-square h-full max-w-full opacity-80 blur-[160px]"
      id="hero-gradient"
    />
  </div>
</section>

<section class="flex h-72 w-full flex-col items-center gap-4 px-16 py-24">
  <div class="max-w-4xl text-lg">{m.home_quote()}</div>
  <a class="icon-flex transition-colors hover:text-accent" href="#news" use:anchorScroll>
    <ArrowDown class="h-4 w-4" />
    <span>{m.home_moreInfo()}</span>
  </a>
</section>

<section class="w-full px-4 py-16" id="news">
  <div
    class="mx-auto flex h-full max-w-screen-xl flex-col items-center justify-center gap-4 md:flex-row"
  >
    <div class="max-w-lg flex-grow basis-80 space-y-4">
      <header class="text-center text-2xl font-bold">{m.home_newsTitle()}</header>
      <div class="text-lg">{m.home_newsDescription()}</div>
      <a class="btn-accent icon-flex mx-auto w-fit" href="{base}/post">
        <ArrowRight class="h-6 w-6" />
        <span>{m.home_newsMore()}</span>
      </a>
    </div>
    <div class="flex-grow" />
    <div class="flex max-w-lg flex-col items-center justify-center gap-4">
      {#each data.posts.slice(0, 3) as post}
        <PostCard {post} />
      {/each}
    </div>
  </div>
</section>

<section class="w-full px-4 py-16" id="interests">
  <div
    class="mx-auto flex h-full max-w-screen-xl flex-col items-center justify-center gap-4 md:flex-row"
  >
    <div class="max-w-lg flex-grow basis-80 space-y-4">
      <header class="text-center text-2xl font-bold">{m.home_interestsTitle()}</header>
      <div class="whitespace-pre-wrap text-lg">{m.home_interestsDescription()}</div>
    </div>
    <div class="flex-grow" />
    <div class="grid grid-cols-2 grid-rows-2 gap-2">
      <div
        class="aspect-square max-h-52 rounded-lg border border-primary/80 p-4 transition-all hover:border-primary hover:shadow-glow-sm hover:shadow-primary"
      >
        <header class="text-xl font-bold">{m.home_interestsRobot()}</header>
        <div class="text-lg text-text/80">{m.home_interestsRobotDescription()}</div>
      </div>
      <div
        class="aspect-square max-h-52 rounded-lg border border-primary/80 p-4 transition-all hover:border-primary hover:shadow-glow-sm hover:shadow-primary"
      >
        <header class="text-xl font-bold">{m.home_interestsHardware()}</header>
        <div class="text-lg text-text/80">{m.home_interestsHardwareDescription()}</div>
      </div>
      <div
        class="aspect-square max-h-52 rounded-lg border border-primary/80 p-4 transition-all hover:border-primary hover:shadow-glow-sm hover:shadow-primary"
      >
        <header class="text-xl font-bold">{m.home_interestsSoftware()}</header>
        <div class="text-lg text-text/80">{m.home_interestsSoftwareDescription()}</div>
      </div>
      <div
        class="aspect-square max-h-52 rounded-lg border border-primary/80 p-4 transition-all hover:border-primary hover:shadow-glow-sm hover:shadow-primary"
      >
        <header class="text-xl font-bold">{m.home_interestsOthers()}</header>
        <div class="text-lg text-text/80">{m.home_interestsOthersDescription()}</div>
      </div>
    </div>
  </div>
</section>

<section class="w-full px-4 py-16" id="comments">
  <div class="mx-auto flex h-full max-w-screen-xl flex-col items-center gap-4">
    <div class="text-2xl font-bold">{m.home_commentsTitle()}</div>
    <div class="flex max-w-full snap-x snap-proximity gap-4 overflow-x-auto">
      {#each comments as comList}
        <div class="flex snap-start flex-col gap-4">
          {#each comList as comment}
            <Comment {...comment} />
          {/each}
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="w-full p-2 text-[0.25rem] text-text/20">
  <span class="font-bold">DISCLAIMER</span><br />
  *The text content on the site may not be true, or be referring to any real-world events.<br />
  *The “comments” above this section may not be real, nor are they made by any real person.<br />
  <br />
  *This page is HEAVILY inspired by
  <a class="underline" href="https://orm.drizzle.team">Drizzle ORM's landing page</a>, I must
  attribute them for the hard work.<br />
  <br />
  Also if you are reading this, you're weird. ;)
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
