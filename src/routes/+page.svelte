<script lang="ts">
  import { base } from "$app/paths";
  import { anchorScroll } from "$lib/components/actions";
  import { useI18nStores } from "$lib/stores/i18n";
  import Comment from "$lib/components/homepage/Comment.svelte";
  import ActivityFigure from "$lib/components/homepage/ActivityFigure.svelte";
  import PostCard from "$lib/components/PostCard.svelte";
  import type { ComponentProps } from "svelte";
  import type { ActivityLabel } from "$lib/components/homepage/ActivityFigure.svelte";

  import Facebook from "~icons/mdi/facebook";
  import Instagram from "~icons/mdi/instagram";
  import At from "~icons/mdi/at";
  import Twitter from "~icons/mdi/twitter";
  import Github from "~icons/mdi/github";
  import ArrowDown from "~icons/mdi/arrow-down-drop-circle-outline";
  import ArrowRight from "~icons/mdi/arrow-right-drop-circle-outline";
  import TNFSH_emblem from "$lib/assets/TNFSH_emblem.svg";
  import HeroGradient from "$lib/components/homepage/HeroGradient.svelte";

  export let data;
  const { m } = useI18nStores();

  const activities: ActivityLabel[] = [
    { label: "佛教", labelPosition: [15.01, 5.69], pinPosition: [18.12, 5.55] },
    { label: "機器人", labelPosition: [9.73, 6.81], pinPosition: [12.18, 9.26] },
    { label: "話劇", labelPosition: [8.31, 11.27], pinPosition: [10.91, 11.36] },
    { label: "法研", labelPosition: [0, 11.45], pinPosition: [3.17, 14.28] },
    { label: "日研", labelPosition: [10.11, 14.69], pinPosition: [12.79, 16.18] },
    { label: "軟體", labelPosition: [15.29, 11.94], pinPosition: [17.92, 14.72] },
    { label: "硬體", labelPosition: [11.79, 18.5], pinPosition: [15.78, 20.99] },
    { label: "詩社", labelPosition: [18.42, 16.38], pinPosition: [25.48, 20.86] }
  ];

  const comments: ComponentProps<Comment>[][] = [
    [
      { username: "原批", handle: "@gayshitenjoyer", comment: "我的評價是不如原神" },
      { username: "我要AI色圖！！", handle: "@horn_yart", comment: "啥時會有4090玩 😡" },
      { username: "亻尓女馬", handle: "@yorMUM", comment: "這就資訊社吧，根本抄襲！" }
    ],
    [
      {
        username: "✨云✨",
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
        <header class="text-4xl font-bold">{$m.home_title()}</header>
        <section class="text-xl">{$m.home_description()}</section>
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
        <a href="https://www.threads.net/tnfshcec" target="_blank" rel="noopener noreferrer">
          <At class="h-8 w-8 text-text/80 transition-colors hover:text-accent" />
        </a>
        <a href="https://twitter.com/tnfshcec" target="_blank" rel="noopener noreferrer">
          <Twitter class="h-8 w-8 text-text/80 transition-colors hover:text-accent" />
        </a>
        <a href="https://github.com/tnfshcec" target="_blank" rel="noopener noreferrer">
          <Github class="h-8 w-8 text-text/80 transition-colors hover:text-accent" />
        </a>
      </div>
    </div>
    <HeroGradient />
  </div>
</section>

<!-- more -->
<section class="flex h-72 w-full flex-col items-center gap-4 px-16 py-24">
  <div class="max-w-4xl text-lg">{$m.home_quote()}</div>
  <a class="icon-flex transition-colors hover:text-accent" href="#news" use:anchorScroll>
    <ArrowDown class="h-4 w-4" />
    <span>{$m.home_moreInfo()}</span>
  </a>
</section>

<!-- news -->
<section class="w-full px-4 py-16" id="news">
  <div
    class="mx-auto flex h-full max-w-screen-xl flex-col items-center justify-between gap-4 md:flex-row"
  >
    <div class="max-w-lg flex-grow basis-80 space-y-4">
      <header class="text-center text-2xl font-bold">{$m.home_newsTitle()}</header>
      <div class="text-lg">{$m.home_newsDescription()}</div>
      <a class="btn-accent icon-flex mx-auto w-fit" href="{base}/post">
        <ArrowRight class="h-6 w-6" />
        <span>{$m.home_newsMore()}</span>
      </a>
    </div>
    <div class="flex max-w-lg flex-col items-center justify-center gap-4">
      {#each data.posts.slice(0, 3) as post}
        <PostCard {post} />
      {/each}
    </div>
  </div>
</section>

<!-- activities -->
<section class="w-full px-4 py-16" id="interests">
  <div
    class="mx-auto flex h-full max-w-screen-xl flex-col items-center justify-between gap-4 md:flex-row"
  >
    <div class="max-w-lg flex-grow basis-80 space-y-4">
      <header class="text-center text-2xl font-bold">{$m.home_interestsTitle()}</header>
      <div class="whitespace-pre-wrap text-lg">{$m.home_interestsDescription()}</div>
    </div>
    <ActivityFigure {activities} />
  </div>
</section>

<section class="w-full px-4 py-16" id="comments">
  <div class="mx-auto flex h-full max-w-screen-xl flex-col items-center gap-4">
    <div class="text-2xl font-bold">{$m.home_commentsTitle()}</div>
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
