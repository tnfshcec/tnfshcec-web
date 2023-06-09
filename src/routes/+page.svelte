<script lang="ts">
  import { fadeIn, fadeOut } from "$lib/utils/transitions";
  import HomeSection from "$lib/homeSection.svelte";
  import PostCard from "$lib/postCard.svelte";

  export let data: { posts: App.PostData[] };
</script>

<div
  class="bg-[url('$lib/assets/stormseeker-rX12B5uX7QM-unsplash.jpg')] bg-fixed bg-[0_65%] w-full h-[25em] shadow-inner"
  in:fadeIn
  out:fadeOut
/>

<div class="my-10 mx-auto max-w-[65rem] min-w-[20rem] w-[80%]">
  <HomeSection title="最新">
    {#each data.posts.slice(0, 5) as post}
      <PostCard {post} />
    {/each}
  </HomeSection>

  <hr class="!border-dotted my-8" />

  <HomeSection title="關於">
    電機社～新樓醫院心臟科 Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit
    enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim
    cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet
    voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit
    irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris
    cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt
    duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim.
    Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
  </HomeSection>
</div>
