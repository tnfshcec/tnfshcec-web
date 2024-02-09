<script lang="ts">
  import * as m from "$paraglide/messages";
  import Information from "~icons/mdi/information-outline";
  import Lightbulb from "~icons/mdi/lightbulb-outline";
  import MessageAlert from "~icons/mdi/message-alert-outline";
  import Alert from "~icons/mdi/alert-outline";
  import AlertOctagon from "~icons/mdi/alert-octagon-outline";

  export let title: keyof typeof titlesInfo;

  const titlesInfo = {
    "!NOTE": ["note", m.alert_note(), Information],
    "!TIP": ["tip", m.alert_tip(), Lightbulb],
    "!IMPORTANT": ["important", m.alert_important(), MessageAlert],
    "!WARNING": ["warning", m.alert_warning(), Alert],
    "!CAUTION": ["caution", m.alert_caution(), AlertOctagon]
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
    border-color: rgb(var(--alert-color) / 50%);
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
    --alert-color: var(--success);
  }

  .markdown-alert-warning {
    --alert-color: var(--warning);
  }

  .markdown-alert-caution {
    --alert-color: var(--error);
  }
</style>
