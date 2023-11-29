<script lang="ts">
  import { Carta, CartaEditor, CartaViewer } from "carta-md";

  export let value: string;
  export let type: "viewer" | "editor" = "editor";

  const carta = new Carta({});
</script>

{#if type == "viewer"}
  <CartaViewer {carta} {value} />
{:else}
  <CartaEditor {carta} {value} />
{/if}
