import { browser } from "$app/environment";

export function scrollOffset() {
  if (!browser) return 80; // top navbar is 80px tall (5rem)
  return parseFloat(window.getComputedStyle(document.documentElement).scrollPaddingTop);
}
