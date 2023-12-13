// SPOILER ELEMENT FOR MARKDOWN RENDERING
import type { MarkedExtension, TokenizerAndRendererExtension } from "marked";

const spoiler: TokenizerAndRendererExtension = {
  name: "spoiler",
  level: "inline", // Is this a block-level or inline-level tokenizer?
  start: (src) => src.match(/\|/)?.index, // Hint to Marked.js to stop and check for a match
  tokenizer: (src, tokens) => {
    const rule = /^\|\|([^\|\n]+)\|\|(?:\n|$)/; // Regex for the complete token, anchor to string start
    const match = rule.exec(src);
    if (match) {
      // Token to generate
      return {
        type: "spoiler", // Should match "name" above
        raw: match[0], // Text to consume from the source
        content: match[1]
      };
    }
  },
  renderer: (token) => {
    return `<span class="spoiler">${token.content}</span>`;
  }
};

export default { extensions: [spoiler] } as MarkedExtension;
