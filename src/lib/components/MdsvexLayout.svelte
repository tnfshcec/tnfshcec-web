<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<script module>
  import alert from "./svx/Alert.svelte";
  import codeblock from "./svx/CodeBlock.svelte";
  import img from "./svx/Image.svelte";
  export { alert, codeblock, img };
</script>

{@render children?.()}
