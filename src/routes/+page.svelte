<script lang="ts">
  import HomeSection from "$lib/homeSection.svelte";
  import PostCard from "$lib/postCard.svelte";

  import storm from "$lib/assets/stormseeker-rX12B5uX7QM-unsplash.jpg";
  import { fadeIn, fadeOut } from "$lib/utils/transitions";

  export let data: { posts: App.PostData[] };
</script>

<div class="m-10 space-y-8">
  <div
    class="flex flex-col gap-4 p-3 mx-auto w-full max-w-3xl text-center md:flex-row md:gap-8 md:text-left"
    in:fadeIn
    out:fadeOut
  >
    <div
      class="flex-shrink-0 my-auto mx-auto w-28 h-28 rounded-full"
      style="background-image: url({storm}); background-position: 50% 30%; background-size: 300px;"
    />
    <div>
      <h2 class="h2">電機社～新樓醫院心臟科</h2>
      Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
    </div>
  </div>

  <div class="mx-auto w-full max-w-5xl min-w-[15rem]">
    <HomeSection title="最新">
      {#each data.posts.slice(0, 5) as post}
        <PostCard {post} />
      {/each}
    </HomeSection>
  </div>
</div>
