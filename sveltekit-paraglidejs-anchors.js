import path from "path";
import { parse } from "svelte/compiler";
import { walk } from "estree-walker";
import MagicString from "magic-string";

/**
 * @typedef {object} ParaglideAnchorsOptions
 * @property {string} paraglideRuntimePath
 * @property {string} localizeFuncImportName
 * @property {string[]} transformElements,
 * @property {string[]} transformComponents,
 * @property {boolean} excludeExternalModules
 * @property {(filename: string) => boolean} excludeExternalModulesPredicate
 * @property {boolean} skipLocalizedHref
 * @property {(expression: string) => boolean} skipLocalizedHrefPredicate
 */

/**
 *  @param {ParaglideAnchorsOptions} options
 *  @returns {import("svelte/compiler").PreprocessorGroup}
 */
export function paraglideAnchors(options = {}) {
  const {
    paraglideRuntimePath = "$lib/paraglide/runtime",
    localizeFuncImportName = "_paraglidejs_anchors_localizeHref",
    transformElements = ["a"],
    transformComponents = [],
    excludeExternalModules = true,
    excludeExternalModulesPredicate = (filename) => filename.includes("/node_modules/"),
    skipLocalizedHref = true,
    skipLocalizedHrefPredicate = (expression) => expression.includes("localizeHref(")
  } = options;

  return {
    name: "paraglide-anchors",
    markup: ({ content, filename }) => {
      if (excludeExternalModules && excludeExternalModulesPredicate(filename)) {
        return;
      }

      const ast = parse(content, { filename, modern: true });
      const s = new MagicString(content);

      let transformedHref = false;

      walk(ast, {
        enter: (/** @type {import("svelte/compiler").AST.SvelteNode} */ node) => {
          if (
            (node.type === "RegularElement" && transformElements.includes(node.name)) ||
            (node.type === "Component" && transformComponents.includes(node.name))
          ) {
            const hrefAttr = node.attributes.find((a) => a.name === "href");
            if (!hrefAttr) return;

            // console.log(hrefAttr)

            const hrefValue = hrefAttr.value;

            if (hrefValue.type === "ExpressionTag") {
              // href={expression} or {href}
              let expressionContent = "";

              if (
                skipLocalizedHref &&
                skipLocalizedHrefPredicate(s.slice(hrefValue.start + 1, hrefValue.end - 1))
              ) {
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
                `href={${localizeFuncImportName}(${expressionContent})}`
              );

              transformedHref = true;
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

              transformedHref = true;
              // console.log(s.slice(leftQuote, rightQuote));
            }
          }
        }
      });

      if (transformedHref) {
        walk(ast, {
          enter: (/** @type {import("svelte/compiler").AST.Script} */ node) => {
            if (node.type === "Script" && node.context === "default") {
              s.appendLeft(
                node.content.start,
                `\nimport { localizeHref as ${localizeFuncImportName} } from "${paraglideRuntimePath}";`
              );
            }
          }
        });
      }

      return {
        code: s.toString(),
        map: s.generateMap()
      };
    }
  };
}
