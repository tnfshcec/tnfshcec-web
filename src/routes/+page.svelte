<script lang="ts">
  import HomeSection, { type SectionAction } from "$lib/components/HomeSection.svelte";
  import PostCard from "$lib/components/postCard.svelte";
  import GlowImg from "$lib/components/GlowImg.svelte";

  import { fadeIn, fadeOut } from "$lib/utils/transitions";
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";

  import Facebook from "~icons/mdi/facebook";
  import Instagram from "~icons/mdi/instagram";
  import Github from "~icons/mdi/github";
  import welcome from "$lib/assets/welcome-icon.jpg";
  import icon from "$lib/assets/global-icon.png";
  import TNFSH_emblem from "$lib/assets/TNFSH_emblem.svg";

  export let data;

  const newPostAction: SectionAction | undefined =
    data.session?.user?.role !== "admin"
      ? undefined
      : {
          name: "New Post",
          action: async () => {
            const res = await fetch(`${base}/api/newpost`, { method: "POST" });
            await goto(await res.json().then((d) => d.postUrl + "/edit"));
          }
        };
</script>

<div class="m-10 space-y-12">
  <div
    class="flex flex-col gap-4 p-3 mx-auto w-full max-w-3xl text-center md:flex-row md:gap-8 md:text-left"
    in:fadeIn
    out:fadeOut
  >
    <div
      class="flex-shrink-0 my-auto mx-auto w-40 h-40 rounded-full bg-cover"
      style="background-image: url({welcome}); background-position: 50% 30%;"
    />
    <div class="space-y-2">
      <h1 class="h1">
        電機社～
        <span class="whitespace-pre">新樓醫院心臟科</span>
        <!-- hack to prevent bad word breaking -->
      </h1>
      <p>
        Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur
        cupidatat.
      </p>
      <div class="flex flex-row gap-2 justify-center md:justify-start">
        <a
          class="btn-icon btn-icon-sm variant-filled-surface p-1"
          href="https://www.tnfsh.tn.edu.tw/form/Details.aspx?Parser=28,4,28,,,,34"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            class="w-full h-full bg-current"
            style="mask: url({TNFSH_emblem}) center / contain no-repeat;"
          />
        </a>
        <a
          class="btn-icon btn-icon-sm variant-filled-surface p-1"
          href="https://www.facebook.com/TNFSHCEC"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook width="100%" height="100%" />
        </a>
        <a
          class="btn-icon btn-icon-sm variant-filled-surface p-1"
          href="https://www.instagram.com/tnfshcec/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram width="100%" height="100%" />
        </a>
        <a
          class="btn-icon btn-icon-sm variant-filled-surface p-1"
          href="https://github.com/tnfshcec"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github width="100%" height="100%" />
        </a>
        <!-- links -->
      </div>
    </div>
  </div>

  <div class="mx-auto w-full max-w-screen-xl">
    <HomeSection title="最新" action={newPostAction}>
      {#each data.posts.slice(0, 5) as post}
        <PostCard {post} />
      {/each}
      <div class="text-center">
        <a class="btn variant-filled-primary" href="{base}/post">查看全部</a>
      </div>
    </HomeSection>
    <HomeSection title="資訊">
      <div class="flex flex-col gap-6 md:flex-row">
        <GlowImg src={icon} className="w-32 h-32 self-center bg-contain bg-no-repeat flex-none" />
        <div class="space-y-4">
          <h3 class="h3">臺南一中電機社——開啟電機世界的夢想舞台！</h3>
          <p>
            過去，我們以機器人社的身份活躍於校園，以樂高程式機器人為主要探索領域。
            <br />
            如今，<strong>我們以嶄新面貌——電機社</strong>，
            以電腦軟硬體和開發板相關教學和討論作為社團的核心，將啟動更繽紛的社團活動！
          </p>
          <p>
            和其他社團不同，我們的特色在於不僅局限於競程或網管等課程，
            而是專注於探索電腦資訊領域的各個角落，包羅萬象。
            無論你是對電腦軟體、硬體、電子產品還是零組件有著廣泛興趣，
            甚至只是對電機領域抱持好奇心的新手，我們都對你敞開大門，歡迎大家的加入！
          </p>
        </div>
      </div>
    </HomeSection>
  </div>
</div>
