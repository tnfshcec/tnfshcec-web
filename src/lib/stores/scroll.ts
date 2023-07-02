import { writable, type Writable } from "svelte/store";

type ScrollEvent = UIEvent & { currentTarget: EventTarget & HTMLDivElement };
type Scroll = { event?: UIEvent; scrollX: number; scrollY: number };

function getScroll(event?: ScrollEvent) {
  const target = event?.currentTarget || {
    scrollLeft: 0,
    scrollTop: 0
  };

  return {
    event,
    scrollX: target?.scrollLeft,
    scrollY: target?.scrollTop
  };
}

function scrollStore() {
  const { subscribe, update }: Writable<Scroll> = writable(getScroll());

  return {
    subscribe,
    fireEvent: (e: ScrollEvent) => update(() => getScroll(e))
  };
}

export const onScroll = scrollStore();
