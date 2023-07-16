<script lang="ts">
  import { CodeBlock } from "@skeletonlabs/skeleton";

  export let properties: Record<string, unknown>;
</script>

<CodeBlock {...properties} />
