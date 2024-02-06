<script lang="ts">
  import Information from "~icons/mdi/information-outline";
  import Lightbulb from "~icons/mdi/lightbulb-outline";
  import MessageAlert from "~icons/mdi/message-alert-outline";
  import Alert from "~icons/mdi/alert-outline";
  import AlertOctagon from "~icons/mdi/alert-octagon-outline";

  export let title: keyof typeof titlesInfo;

  const titlesInfo = {
    "!NOTE": ["note", "Note", Information],
    "!TIP": ["tip", "Tip", Lightbulb],
    "!IMPORTANT": ["important", "Important", MessageAlert],
    "!WARNING": ["warning", "Warning", Alert],
    "!CAUTION": ["caution", "Caution", AlertOctagon]
  } as const;

  const alertInfo = titlesInfo[title];
</script>

<div class="markdown-alert border-l-4 px-4 markdown-alert-{alertInfo[0]} [&>*]:m-0">
  <p class="icon-flex font-bold">
    <svelte:component this={alertInfo[2]} />
    {alertInfo[1]}
  </p>
  <slot />
</div>

<style>
  .markdown-alert {
    border-color: rgb(var(--alert-color));
  }

  .markdown-alert p {
    color: rgb(var(--alert-color));
  }

  .markdown-alert-note {
    --alert-color: var(--primary);
  }

  .markdown-alert-tip {
    --alert-color: var(--accent);
  }

  .markdown-alert-important {
    --alert-color: var(--accent);
  }

  .markdown-alert-warning {
    --alert-color: var(--accent);
  }

  .markdown-alert-caution {
    --alert-color: var(--accent);
  }
</style>
