<script lang="ts">
  let n: number = 0;
</script>

<section>
  <div
    class="bg-[url('$lib/stormseeker-rX12B5uX7QM-unsplash.jpg')] bg-fixed bg-[0_65%] w-full h-[20em] shadow-inner"
  />
</section>

<section class="my-10 mx-16">
  游😶育是甲，這是真的!<br />

  <button
    class="p-3 my-2 bg-gray-300 rounded-md border-2 transition-all hover:border-blue-400"
    on:click={() => n++}>猜謎: 南一中第一甲是誰?</button
  >

  {#each Array(n) as _}
    <br /> 游😲育
  {/each}
</section>

<style>
  .banner-img {
    background: url("$lib/stormseeker-rX12B5uX7QM-unsplash.jpg") fixed 0 65%;
    width: 100%;
    height: 20em;
    box-shadow: inset 0 0 50px 2px black;
  }

  .content {
    margin: 3em 10em;
  }
</style>
