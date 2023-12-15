// SAVE CURRENT THEME
import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { useContextStore } from "./contextStore";

export type Theme = "light" | "dark";

export function useThemeStore(theme: Theme) {
  return useContextStore("theme", themeStore, theme);
}

export function serverDetectTheme(request: Request): Theme {
  const requestTheme = request.headers.get("Sec-CH-Prefers-Color-Scheme") as Theme | null;

  return requestTheme ?? "dark";
}

export function pageDetectTheme(serverTheme: Theme): Theme {
  const browserTheme = browser ? window.localStorage.getItem("theme") == "light" : undefined;
  const mediaTheme = browser ? window.matchMedia("(prefers-color-scheme: light)").matches : undefined;

  return (browserTheme ?? mediaTheme ?? serverTheme == "light") ? "light" : "dark";
}

function themeStore(theme?: Theme) {
  const mediaMatch = browser ? window.matchMedia("(prefers-color-scheme: light)") : undefined;

  const { set, subscribe, update } = writable<Theme>(theme ?? "dark");

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
