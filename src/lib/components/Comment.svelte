<script lang="ts">
  export let username: string;
  export let handle: `@${string}`;
  export let comment: string;
</script>

<div class="flex w-72 flex-col gap-2 rounded bg-secondary px-4 py-2">
  <div class="flex items-center gap-2">
    <div class="rounded-full h-8 w-8 bg-primary"></div>
    <div>
      <span>{username}</span><br />
      <span class="text-primary">{handle}</span>
    </div>
  </div>
  <div class="text-lg">{comment}</div>
</div>
