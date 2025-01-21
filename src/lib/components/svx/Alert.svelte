<script lang="ts">
  import * as m from "$paraglide/messages";
  import Information from "~icons/mdi/information-outline";
  import Lightbulb from "~icons/mdi/lightbulb-outline";
  import MessageAlert from "~icons/mdi/message-alert-outline";
  import Alert from "~icons/mdi/alert-outline";
  import AlertOctagon from "~icons/mdi/alert-octagon-outline";

  interface Props {
    title: keyof typeof titlesInfo;
    children?: import('svelte').Snippet;
  }

  let { title, children }: Props = $props();

  const titlesInfo = {
    "!NOTE": ["note", m.alert_note(), Information],
    "!TIP": ["tip", m.alert_tip(), Lightbulb],
    "!IMPORTANT": ["important", m.alert_important(), MessageAlert],
    "!WARNING": ["warning", m.alert_warning(), Alert],
    "!CAUTION": ["caution", m.alert_caution(), AlertOctagon]
  } as const;

  const alertInfo = titlesInfo[title];

  const SvelteComponent = $derived(alertInfo[2]);
</script>

<div class="markdown-alert my-5 border-l-4 px-4 markdown-alert-{alertInfo[0]}">
  <span class="icon-flex font-bold">
    <SvelteComponent />
    {alertInfo[1]}
  </span>
  <div class="[&>*:first-child]:mt-0">
    {@render children?.()}
  </div>
</div>

<style>
  .markdown-alert {
    border-color: rgb(var(--alert-color) / 50%);
  }

  .markdown-alert span {
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
