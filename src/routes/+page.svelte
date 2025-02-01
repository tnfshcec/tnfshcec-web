<script lang="ts">
  import { type Component, type ComponentProps } from "svelte";
  import { base } from "$app/paths";
  import * as m from "$paraglide/messages";
  import { anchorScroll } from "$lib/components/actions";
  import { uwu } from "$lib/utils/uwu.svelte";
  import Comment from "$lib/components/homepage/Comment.svelte";
  import ActivityFigure from "$lib/components/homepage/ActivityFigure.svelte";
  import PostCard from "$lib/components/homepage/PostCard.svelte";
  import HeroGradient from "$lib/components/homepage/HeroGradient.svelte";

  import Facebook from "~icons/mdi/facebook";
  import Instagram from "~icons/mdi/instagram";
  import At from "~icons/mdi/at";
  import Twitter from "~icons/mdi/twitter";
  import Github from "~icons/mdi/github";
  import ArrowDown from "~icons/mdi/arrow-down-drop-circle-outline";
  import ArrowRight from "~icons/mdi/arrow-right-drop-circle-outline";
  import uwuLogo from "$lib/assets/uwu-logo.png";
  import TNFSH_emblem from "$lib/assets/TNFSH_emblem.svg";

  let { data } = $props();

  let comments = [
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
</script>

{#snippet socialIcon(name:string, href:string, Icon:Component)}
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={m.home_social_link({ name })}
  >
    <Icon
      class="h-8 w-8 text-text/80 transition-colors hover:text-accent"
    />
  </a>
{/snippet}

<section class="w-full items-center p-4">
  <div class="relative mx-auto min-h-[60vh] max-w-screen-xl">
    <div
      class="absolute left-0 top-1/2 z-10 flex max-w-lg -translate-y-1/2 flex-col items-start gap-4"
    >
      <div class="space-y-4">
        <header class="text-4xl font-bold">
          {#if uwu.enabled}
            <img src={uwuLogo} alt="kawaii tnfshcec logo" />
          {:else}
            {m.home_title()}
          {/if}
        </header>
        <p class="sm:text-xl">{m.home_description()}</p>
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
          ></div>
        </a>
        {@render socialIcon("Facebook", "https://www.facebook.com/TNFSHCEC", Facebook )}
        {@render socialIcon("Instagram", "https://www.instagram.com/tnfshcec", Instagram )}
        {@render socialIcon("Threads", "https://www.threads.net/tnfshcec", At )}
        {@render socialIcon("X (Formerly Twitter)", "https://twitter.com/tnfshcec", Twitter )}
        {@render socialIcon("GitHub", "https://github.com/tnfshcec", Github )}
      </div>
    </div>
    <HeroGradient />
  </div>
</section>

<!-- more -->
<section class="flex h-72 w-full flex-col items-center gap-4 px-16 py-24">
  <div class="max-w-4xl sm:text-lg">{m.home_quote()}</div>
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

{#snippet comment(username:string, handle:string, comment:string)}
  <div class="flex w-72 flex-col gap-2 rounded bg-secondary px-4 py-2">
    <div class="flex items-center gap-2">
      <div class="comment-pfp h-8 w-8 rounded-full"></div>
      <div>
        <span>
          {username}
        </span>
        <br />
        <span class="text-text/60">{handle}</span>
      </div>
    </div>
    <div class="text-lg">{comment}</div>
  </div>
{/snippet}

<!-- comments -->
<section class="w-full px-4 py-16" id="comments">
  <div class="mx-auto flex h-full max-w-screen-xl flex-col items-center gap-4">
    <div class="text-2xl font-bold">{m.home_comments_title()}</div>

    <div class="flex max-w-full snap-x snap-proximity gap-4 overflow-x-auto">
      <!-- column 1 -->
      <div class="flex snap-start flex-col gap-4">
        {@render comment(
           m.home_comment_user_genshit(),
           "@gayshitenjoyer",
           m.home_comment_genshit()
        )}
        {@render comment(
          m.home_comment_user_ai(),
          "@horn_yart",
          m.home_comment_ai()
        )}
        {@render comment(
           m.home_comment_user_yorMUM(),
           "@yorMUM",
           m.home_comment_yorMUM()
        )}
      </div>
      <!-- column 2 -->
      <div class="flex snap-start flex-col gap-4">
        {@render comment(
           m.home_comment_user_yun(),
           "@yun._.0618",
           m.home_comment_yun(),
        )}
        {@render comment(
         m.home_comment_user_dun(),
          "@nobleg",
          m.home_comment_dun()
        )}
      </div>
      <!-- column 3 -->
      <div class="flex snap-start flex-col gap-4">
        {@render comment(
           m.home_comment_user_kleeplayer(),
           "@kleeplayer",
           m.home_comment_kleeplayer()
        )}
        {@render comment(
           m.home_comment_user_alanwolk(),
           "@alan_wolk",
           m.home_comment_alanwolk()
        )}
      </div>
    </div>
  </div>
</section>

<style>
  .comment-pfp {
    background-attachment: fixed;
    background-size: 100% 100%;
    background-image: radial-gradient(circle at 83.01% 47.05%, rgb(var(--primary)), transparent 81%),
      radial-gradient(circle at 82.02% 97.01%, rgb(var(--accent)), transparent 63%),
      radial-gradient(circle at 28.02% 57.03%, rgb(var(--accent)), transparent 43%);
    background-color: rgb(var(--text));
  }
</style>
