<script lang="ts">
  import { Carta, CartaEditor, CartaViewer, type CartaExtension } from "carta-md";
  import { code } from "@cartamd/plugin-code";
  import markedFootnote from "marked-footnote";
  import markedSpoiler from "$lib/utils/markedSpoiler";

  import "carta-md/default.css"; /* Default theme */

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

<style global>
  [class*="shj-lang-"] {
    background: transparent !important;
  }

  /* Atom Dark theme */
  /* from https://github.com/speed-highlight/core/blob/main/src/themes/atom-dark.css */

  [class*="shj-lang-"] {
    color: #abb2bf;
    /* background: #161b22; */
  }
  [class*="shj-lang-"]:before {
    color: #6f9aff;
  }

  .shj-syn-deleted,
  .shj-syn-err,
  .shj-syn-var {
    color: #e06c75;
  }
  .shj-syn-section,
  .shj-syn-oper,
  .shj-syn-kwd {
    color: #c678dd;
  }
  .shj-syn-class {
    color: #e5c07b;
  }
  .shj-numbers,
  .shj-syn-cmnt {
    color: #76839a;
  }
  .shj-syn-insert {
    color: #98c379;
  }
  .shj-syn-type {
    color: #56b6c2;
  }
  .shj-syn-num,
  .shj-syn-bool {
    color: #d19a66;
  }
  .shj-syn-str,
  .shj-syn-func {
    color: #61afef;
  }
</style>
