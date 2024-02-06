<script lang="ts">
  const mTitles = {
    "!NOTE": "Note",
    "!TIP": "Tip",
    "!IMPORTANT": "Important",
    "!WARNING": "Warning",
    "!CAUTION": "Caution"
  };

  export let title: keyof typeof mTitles;
</script>

<div class="markdown-alert border-l-2 px-4">
  <p class="m-0 font-bold">
    {mTitles[title]}
  </p>
  <slot />
</div>
