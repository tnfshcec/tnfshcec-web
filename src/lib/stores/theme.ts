// SAVE CURRENT THEME
import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { useContextStore } from "./contextStore";

export type Theme = "light" | "dark";

export function useThemeStore() {
  return useContextStore("theme", themeStore);
}

export function detectTheme(): Theme {

}

function themeStore() {
  const storageTheme = browser ? window.localStorage.getItem("theme") : undefined;
  const mediaMatch = browser ? window.matchMedia("(prefers-color-scheme: light)") : undefined;

  const { set, subscribe, update } = writable<Theme>(
    storageTheme === "light" || mediaMatch?.matches ? "light" : "dark"
  );

  subscribe((theme) => {
    if (!browser) return;

    window.localStorage.setItem("theme", theme);
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  });

  mediaMatch?.addEventListener("change", (e) => set(e.matches ? "light" : "dark"));

  return {
    subscribe,
    set,
    toggle: () => update((current) => (current === "light" ? "dark" : "light"))
  };
}
