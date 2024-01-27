<script lang="ts">
  export let username: string;
  export let handle: `@${string}`;
  export let comment: string;
  export let usernameHref = "";
</script>

<div class="flex w-72 flex-col gap-2 rounded bg-secondary px-4 py-2">
  <div class="flex items-center gap-2">
    <div class="h-8 w-8 rounded-full bg-primary"></div>
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