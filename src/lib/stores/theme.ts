// SAVE CURRENT THEME
import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { useContextStore } from "./contextStore";

export type Theme = "light" | "dark";

/**
 * Get the current {@link Theme} from the `Context`.
 * Creates the store if not found.
 *
 * @see {@link useContextStore()}
 *
 * @param lang The default theme used if creating a new store, usually only specified in `+layout.svelte`.
 */
export function useThemeStore(theme: Theme) {
  return useContextStore("theme", themeStore, theme);
}

/**
 * Detect user's current theme by the request header *on the server*.
 * @param request The {@link Request} object, containing the headers
 */
export function serverDetectTheme(request: Request): Theme {
  const requestTheme = request.headers.get("Sec-CH-Prefers-Color-Scheme") as Theme | null;

  return requestTheme ?? "dark";
}

/**
 * Detect user's current theme by client data and the result from {@link serverDetectTheme}.
 *
 * Note that though this function is intended to be run on the 'page',
 * it may still run on the server for SSR.
 *
 * @param serverTheme Theme detected from the server, with consideration of the request header
 */
export function pageDetectTheme(serverTheme: Theme): Theme {
  const browserTheme = browser ? window.localStorage.getItem("theme") == "light" : undefined;
  const mediaTheme = browser
    ? window.matchMedia("(prefers-color-scheme: light)").matches
    : undefined;

  return browserTheme ?? mediaTheme ?? serverTheme == "light" ? "light" : "dark";
}

/**
 * Create a theme store with an optional default value,
 * setup side effects e.g. setting the `dark` class
 */
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
