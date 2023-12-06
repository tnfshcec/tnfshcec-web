<script lang="ts">
  import { Carta, CartaEditor, CartaViewer, type CartaExtension } from "carta-md";
  import { code } from "@cartamd/plugin-code";
  import markedFootnote from "marked-footnote";
  import markedSpoiler from "$lib/utils/markedSpoiler";

  import "carta-md/default.css"; /* Default theme */
  import "carta-md/light.css"; /* Markdown input theme */
  import "@cartamd/plugin-code/default.css";

  export let value: string;
  export let type: "viewer" | "editor" = "editor";

  const cartaExt: CartaExtension = {
    markedExtensions: [markedFootnote(), markedSpoiler]
  };

  const carta = new Carta({
    extensions: [code(), cartaExt]
  });
</script>

{#if type == "viewer"}
  <CartaViewer {carta} {value} />
{:else}
  <CartaEditor {carta} {value} />
{/if}
