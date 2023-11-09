<script lang="ts">
  let n = 0;
</script>

<p>游😶育是甲，這是真的!</p>

<button class="btn-accent" on:click={() => n++}> 猜謎: 南一中第一甲是誰? </button>

<p>
  {#each Array(n) as _}
    游😲育<br />
  {/each}
</p>
