import { fade, fly, type FadeParams, type FlyParams } from "svelte/transition";

export function fadeIn(node: Element, params?: FadeParams) {
  return fade(node, {
    delay: 300,
    duration: 200,
    ...params
  });
}

export function fadeOut(node: Element, params?: FadeParams) {
  return fade(node, {
    duration: 200,
    ...params
  });
}

export function flyIn(node: Element, params?: FlyParams) {
  return fly(node, {
    delay: 300,
    duration: 200,
    ...params
  });
}

export function flyOut(node: Element, params?: FlyParams) {
  return fly(node, {
    duration: 200,
    ...params
  });
}
