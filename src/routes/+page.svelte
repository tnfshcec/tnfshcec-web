<script lang="ts">
  import { getContext, type ComponentProps, type ComponentType } from "svelte";
  import type { Readable } from "svelte/store";
  import { base } from "$app/paths";
  import * as m from "$paraglide/messages";
  import { anchorScroll } from "$lib/components/actions";
  import Comment from "$lib/components/homepage/Comment.svelte";
  import ActivityFigure from "$lib/components/homepage/ActivityFigure.svelte";
  import PostCard from "$lib/components/homepage/PostCard.svelte";

  import Facebook from "~icons/mdi/facebook";
  import Instagram from "~icons/mdi/instagram";
  import At from "~icons/mdi/at";
  import Twitter from "~icons/mdi/twitter";
  import Github from "~icons/mdi/github";
  import ArrowDown from "~icons/mdi/arrow-down-drop-circle-outline";
  import ArrowRight from "~icons/mdi/arrow-right-drop-circle-outline";
  import uwuLogo from "$lib/assets/uwu-logo.png";
  import TNFSH_emblem from "$lib/assets/TNFSH_emblem.svg";
  import HeroGradient from "$lib/components/homepage/HeroGradient.svelte";
  import { listSortedPosts } from "$lib/utils/posts";

  export let data;

  type Social = { name: string; href: string; icon: ComponentType };
  let socials: Social[] = [
    { name: "Facebook", href: "https://www.facebook.com/TNFSHCEC", icon: Facebook },
    { name: "Instagram", href: "https://www.instagram.com/tnfshcec", icon: Instagram },
    { name: "Threads", href: "https://www.threads.net/tnfshcec", icon: At },
    { name: "X (Formerly Twitter)", href: "https://twitter.com/tnfshcec", icon: Twitter },
    { name: "GitHub", href: "https://github.com/tnfshcec", icon: Github }
  ];

  let comments: ComponentProps<Comment>[][] = [
    [
      {
        username: m.home_comment_user_genshit(),
        handle: "@gayshitenjoyer",
        comment: m.home_comment_genshit(),
        usernameHref: "https://genshin.hoyoverse.com/zh-tw/"
      },
      { username: m.home_comment_user_ai(), handle: "@horn_yart", comment: m.home_comment_ai() },
      {
        username: m.home_comment_user_yorMUM(),
        handle: "@yorMUM",
        comment: m.home_comment_yorMUM()
      }
    ],
    [
      {
        username: m.home_comment_user_yun(),
        handle: "@yun._.0618",
        comment: m.home_comment_yun(),
        usernameHref: "https://www.12339.gov.cn/h5_index"
      },
      { username: m.home_comment_user_dun(), handle: "@nobleg", comment: m.home_comment_dun() }
    ],
    [
      {
        username: m.home_comment_user_kleeplayer(),
        handle: "@kleeplayer",
        comment: m.home_comment_kleeplayer()
      },
      {
        username: m.home_comment_user_alanwolk(),
        handle: "@alan_wolk",
        comment: m.home_comment_alanwolk()
      }
    ]
  ];

  let uwu = getContext<Readable<boolean>>("uwu");
</script>

<section class="h-[65vh] min-h-[20rem] w-full items-center p-4">
  <div class="relative mx-auto h-full max-w-screen-xl">
    <div
      class="absolute left-0 top-1/2 z-10 flex max-w-lg -translate-y-1/2 flex-col items-start gap-4"
    >
      <div class="space-y-4">
        <header class="text-4xl font-bold">
          {#if $uwu}
            <img src={uwuLogo} alt="kawaii tnfshcec logo" />
          {:else}
            {m.home_title()}
          {/if}
        </header>
        <section class="text-xl">{m.home_description()}</section>
      </div>
      <div class="flex items-center justify-center gap-2">
        <a
          href="https://www.tnfsh.tn.edu.tw/form/Details.aspx?Parser=28,4,28,,,,34"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={m.home_tnfsh_link()}
        >
          <div
            class="h-8 w-8 bg-text/80 transition-colors hover:bg-accent"
            style:mask="url({TNFSH_emblem}) center / contain no-repeat"
            style:-webkit-mask="url({TNFSH_emblem}) center / contain no-repeat"
          />
        </a>
        {#each socials as social}
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={m.home_social_link({ name: social.name })}
          >
            <svelte:component
              this={social.icon}
              class="h-8 w-8 text-text/80 transition-colors hover:text-accent"
            />
          </a>
        {/each}
      </div>
    </div>
    <HeroGradient />
  </div>
</section>

<!-- more -->
<section class="flex h-72 w-full flex-col items-center gap-4 px-16 py-24">
  <div class="max-w-4xl text-lg">{m.home_quote()}</div>
  <a class="icon-flex transition-colors hover:text-accent" href="#news" use:anchorScroll>
    <ArrowDown class="h-4 w-4" />
    <span>{m.home_more_info()}</span>
  </a>
</section>

<!-- news -->
<section class="w-full px-4 py-16" id="news">
  <div
    class="mx-auto flex h-full max-w-screen-xl flex-col items-center justify-between gap-4 md:flex-row"
  >
    <div class="max-w-lg flex-grow basis-80 space-y-4">
      <header class="text-center text-2xl font-bold">{m.home_news_title()}</header>
      <div class="text-lg">{m.home_news_description()}</div>
      <a class="btn-accent icon-flex mx-auto w-fit" href="{base}/post">
        <ArrowRight class="h-6 w-6" />
        <span>{m.home_news_more()}</span>
      </a>
    </div>
    <div class="flex min-w-80 max-w-lg flex-1 flex-col items-center justify-center gap-4">
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
      <header class="text-center text-2xl font-bold">{m.home_interests_title()}</header>
      <div class="whitespace-pre-wrap text-lg">{m.home_interests_description()}</div>
    </div>
    <ActivityFigure />
  </div>
</section>

<section class="w-full px-4 py-16" id="comments">
  <div class="mx-auto flex h-full max-w-screen-xl flex-col items-center gap-4">
    <div class="text-2xl font-bold">{m.home_comments_title()}</div>
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
