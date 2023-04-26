<script lang="ts">
	let n: number = 0;
</script>

<section class="banner">
	<div class="banner-img" />
</section>

<section class="content">
	游😶育是甲，這是真的!<br />

	<button on:click={() => n++}>猜謎: 南一中第一甲是誰?</button>

	{#each Array(n) as _}
		<br /> 游😲育
	{/each}
</section>

<style>
	.banner-img {
		background: url('$lib/stormseeker-rX12B5uX7QM-unsplash.jpg') fixed 0 65%;
		width: 100%;
		height: 20em;
		box-shadow: inset 0 0 50px 2px black;
	}

  .content {
    margin: 3em 10em;
  }
</style>
