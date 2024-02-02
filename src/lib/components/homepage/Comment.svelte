<script lang="ts">
  export let username: string;
  export let handle: `@${string}`;
  export let comment: string;
  export let usernameHref = "";
</script>

<div class="flex w-72 flex-col gap-2 rounded bg-secondary px-4 py-2">
  <div class="flex items-center gap-2">
    <div class="comment-pfp h-8 w-8 rounded-full"></div>
    <div>
      <span>
        {#if usernameHref}
          <a href={usernameHref}>{username}</a>
        {:else}
          {username}
        {/if}
      </span>
      <br />
      <span class="text-primary">{handle}</span>
    </div>
  </div>
  <div class="text-lg">{comment}</div>
</div>

<style>
  .comment-pfp {
    background-attachment: fixed;
    background-size: 100% 100%;
    background-image: radial-gradient(circle at 83.01% 47.05%, rgb(var(--primary)), transparent 81%),
      radial-gradient(circle at 37.72% 81.87%, rgb(var(--secondary) / 0.5), transparent 19%),
      radial-gradient(circle at 82.02% 97.01%, rgb(var(--accent)), transparent 63%),
      radial-gradient(circle at 28.02% 57.03%, rgb(var(--accent)), transparent 33%),
      radial-gradient(circle at 50% 50%, rgb(var(--text)), rgb(var(--text)) 100%);
  }
</style>
