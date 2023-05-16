<script lang="ts">
  import { fadeIn, fadeOut, flyIn, flyOut } from "$lib/utils/transitions";

  export let data: { posts: Promise<App.PostData[]> };
</script>

<div
  class="bg-[url('$lib/assets/stormseeker-rX12B5uX7QM-unsplash.jpg')] bg-fixed bg-[0_65%] w-full h-[25em] shadow-inner"
  in:fadeIn
  out:fadeOut
/>

<div class="my-10 mx-auto max-w-[65rem] min-w-[30rem] w-[80%] space-y-3">
  <h1 class="h1" in:fadeIn out:fadeOut># 最新</h1>

  {#await data.posts then posts}
    {#each posts.slice(0, 5) as post}
      <a
        class="block p-2 w-full card card-hover variant-soft"
        href={post.url}
        in:flyIn={{ x: 20 }}
        out:flyOut={{ x: -20 }}
      >
        <header class="card-header">
          <span class="block text-surface-500">
            {post.author || ""}
            {post.author && post.date ? "/" : ""}
            {post.date || ""}
          </span>
          <span class="block text-2xl font-bold">{post.title}</span>
        </header>
      </a>
    {/each}
  {/await}
  <!-- 最新 -->

  <hr class="!border-dotted !my-8" />

  <h1 class="h1" in:fadeIn out:fadeOut># 關於</h1>

  <p class="p-4 w-full card variant-soft">
    電機社～Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa
    sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur
    officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor
    minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt
    ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate.
    Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua
    reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat
    ullamco ut ea consectetur et est culpa et culpa duis.
  </p>
</div>
