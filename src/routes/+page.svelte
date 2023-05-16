<script lang="ts">
  import { fadeIn, fadeOut, flyIn, flyOut } from "$lib/utils/transitions";
  export let data: { posts: Promise<App.PostData[]> };
</script>

<section>
  <div
    class="bg-[url('$lib/assets/stormseeker-rX12B5uX7QM-unsplash.jpg')] bg-fixed bg-[0_65%] w-full h-[20em] shadow-inner"
    in:fadeIn
    out:fadeOut
  />
</section>

<section class="my-10 mx-16">
  <div class="grid grid-flow-row justify-items-center">
    <h1 class="h1" in:fadeIn out:fadeOut># 最新</h1>
    {#await data.posts then posts}
      {#each posts.slice(0, 5) as post}
        <a
          class="my-3 p-2 card card-hover variant-soft max-w-[65rem] min-w-[30rem] w-[80%]"
          href={post.url}
          in:flyIn={{ x: 20 }}
          out:flyOut={{ x: -20 }}
        >
          <header class="card-header">
            <span class="text-surface-500">{post?.author} / {post?.date}</span>
            <br />
            <span class="text-2xl font-bold">{post?.title}</span>
          </header>
        </a>
      {/each}
    {/await}
  </div>
</section>
