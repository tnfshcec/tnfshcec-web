<script lang="ts">
  export let data: { posts: Promise<App.PostData[]> };
</script>

<section>
  <div
    class="bg-[url('$lib/assets/stormseeker-rX12B5uX7QM-unsplash.jpg')] bg-fixed bg-[0_65%] w-full h-[20em] shadow-inner"
  />
</section>

<section class="my-10 mx-16">
  <div class="flex flex-col justify-center">
    {#await data.posts then posts}
      {#each posts as post}
        <a class="my-5 card card-hover variant-soft" href={post.url}>
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
