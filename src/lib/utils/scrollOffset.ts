import { browser } from "$app/environment";

/**
 * return the height of nav bar ( or defult 80 ) for the scroll offset
 */
export function scrollOffset() {
  if (!browser) return 80; // top navbar is 80px tall (5rem)
  return parseFloat(window.getComputedStyle(document.documentElement).scrollPaddingTop);
}
