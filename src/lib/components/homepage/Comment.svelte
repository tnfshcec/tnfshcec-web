<script lang="ts">
  export let username: string;
  export let handle: `@${string}`;
  export let comment: string;

  import { useI18nStores } from "$lib/stores/i18n";
  const { m } = useI18nStores();
</script>

<div class="flex w-72 flex-col gap-2 rounded bg-secondary px-4 py-2">
  <div class="flex items-center gap-2">
    <div class="h-8 w-8 rounded-full bg-primary"></div>
    <div>
      <!-- 使用条件判断，如果是 linkuser_yuan()，则创建超链接 -->
      {#if username === $m.user_yuan()}
        <span><a href="https://genshin.hoyoverse.com/zh-tw/">{username}</a></span><br />
      {:else if username === $m.user_yun()}
        <span><a href="https://www.12339.gov.cn/h5_index">{username}</a></span><br />
      {:else}
        <span>{username}</span><br />
      {/if}
      <span class="text-primary">{handle}</span>
    </div>
  </div>
  <div class="text-lg">{comment}</div>
</div>