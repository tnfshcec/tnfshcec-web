import { fade, fly, type FadeParams, type FlyParams } from "svelte/transition";

const duration = 150;
const delay = 200;

export function fadeIn(node: Element, params?: FadeParams) {
  return fade(node, {
    delay,
    duration,
    ...params
  });
}

export function fadeOut(node: Element, params?: FadeParams) {
  return fade(node, {
    duration,
    ...params
  });
}

export function flyIn(node: Element, params?: FlyParams) {
  return fly(node, {
    delay,
    duration,
    ...params
  });
}

export function flyOut(node: Element, params?: FlyParams) {
  return fly(node, {
    duration,
    ...params
  });
}
