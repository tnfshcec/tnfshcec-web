import { parse } from "svelte/compiler";
import { walk } from "estree-walker";
import MagicString from "magic-string";

/** @returns {import("svelte/compiler").PreprocessorGroup} */
export function paraglideAnchors() {
  return {
    name: "paraglide-anchors",
    markup: ({ content, filename }) => {
      const ast = parse(content, { filename, modern: true });
      const s = new MagicString(content);

      walk(ast, {
        enter: (
          /** @type {import("svelte/compiler").AST.SvelteNode | import("svelte/compiler").AST.Script} */ node
        ) => {
          if (node.type === "Script" && node.context === "default") {
            s.appendLeft(
              node.content.start,
              '\nimport { localizeHref as _paraglidejs_anchors_localizeHref } from "$paraglide/runtime";'
            );
          }
          if (node.type === "RegularElement" && node.name === "a") {
            const hrefAttr = node.attributes.find((a) => a.name === "href");
            if (!hrefAttr) return;

            // console.log(hrefAttr)

            const hrefValue = hrefAttr.value;

            if (hrefValue.type === "ExpressionTag") {
              // href={expression} or {href}
              let expressionContent = "";

              if (s.slice(hrefValue.start, hrefValue.end).includes("localizeHref")) {
                // assume it is localized
                return;
              } else if (hrefValue.start - hrefAttr.start <= 1) {
                // {href}, hrefValue -> href
                expressionContent = "href";
              } else {
                // href={expression}, hrefValue -> {expression}
                expressionContent = s.slice(hrefValue.start + 1, hrefValue.end - 1);
              }

              s.update(
                hrefAttr.start,
                hrefAttr.end,
                `href={_paraglidejs_anchors_localizeHref(${expressionContent})}`
              );

              // console.log(s.slice(hrefAttr.start, hrefAttr.end));
            } else if (hrefValue.length) {
              // href="something"
              const leftQuote = hrefValue[0].start - 1;
              const rightQuote = hrefAttr.end;

              // empty string
              if (rightQuote - leftQuote <= 2) return;

              const reconstruct = hrefValue
                .map((node) => {
                  if (node.type === "Text") return node.raw;
                  if (node.type === "ExpressionTag")
                    return `\$\{${s.slice(node.start + 1, node.end - 1)}\}`;
                })
                .join("");

              s.update(
                leftQuote,
                rightQuote,
                `{_paraglidejs_anchors_localizeHref(\`${reconstruct}\`)}`
              );

              // console.log(s.slice(leftQuote, rightQuote));
            }
          }
        }
      });

      return {
        code: s.toString(),
        map: s.generateMap()
      };
    }
  };
}
