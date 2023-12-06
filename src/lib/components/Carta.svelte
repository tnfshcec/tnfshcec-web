<script lang="ts">
  import { Carta, CartaEditor, CartaViewer } from "carta-md";
  import { code } from "@cartamd/plugin-code";

  import "carta-md/default.css"; /* Default theme */
  import "carta-md/light.css"; /* Markdown input theme */
  import "@cartamd/plugin-code/default.css"

  export let value: string;
  export let type: "viewer" | "editor" = "editor";

  const carta = new Carta({
    extensions: [code()]
  });
</script>

{#if type == "viewer"}
  <CartaViewer {carta} {value} />
{:else}
  <CartaEditor {carta} {value} />
{/if}
