import { writable } from "svelte/store";

export function once<T>(value?: T) {
  const { set, update, subscribe } = writable<T>(value);

  return {
    set,
    update,
    subscribe,
    once: () =>
      new Promise<T>((resolve) => {
        let initCall = true;
        const unsub = subscribe((value) => {
          if (initCall) {
            initCall = false;
            return;
          }

          unsub();
          resolve(value);
        });
      })
  };
}
