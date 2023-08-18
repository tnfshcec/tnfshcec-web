<script lang="ts">
  import { Facebook, Instagram } from "@inqling/svelte-icons/simple-icons";
  import HomeSection, { type SectionAction } from "$lib/components/homeSection.svelte";
  import PostCard from "$lib/components/postCard.svelte";

  import { fadeIn, fadeOut } from "$lib/utils/transitions";
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";

  import storm from "$lib/assets/stormseeker-rX12B5uX7QM-unsplash.jpg";
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
      style="background-image: url({storm}); background-position: 50% 30%;"
    />
    <div class="space-y-2">
      <h1 class="h1">電機社～新樓醫院心臟科</h1>
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
          <Facebook class="text-inherit" />
        </a>
        <a
          class="btn-icon btn-icon-sm variant-filled-surface p-1"
          href="https://www.instagram.com/tnfshcec/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram class="text-inherit" />
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
        <a class="btn variant-filled-primary" href="{base}/posts" in:fadeIn out:fadeOut>查看全部</a>
      </div>
    </HomeSection>
  </div>
</div>
