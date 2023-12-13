import type { Readable } from "svelte/store";

/**
 * get the next update from the store
 */
export function nextUpdate<T>(store: Readable<T>): Promise<T> {
  return new Promise<T>((resolve) => {
    let initCall = true;
    const unsub = store.subscribe((value) => {
      // subscribing to a svelte store triggers
      // an initial callback
      if (initCall) {
        initCall = false;
        return;
      }

      unsub();
      resolve(value);
    });
  });
}
