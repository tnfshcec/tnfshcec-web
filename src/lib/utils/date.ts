/**
 * Returns a locale date string from `date`.
 * If `date` is invalid, returns `fallback` instead.
 * The default `fallback` is `undefined`.
 */
export function localeDate(date: Date): string | undefined;
export function localeDate<T>(date: Date, fallback: T): string | T;

export function localeDate<T>(date: Date, fallback?: T) {
  return isNaN(date.valueOf())
    ? fallback
    : date.toLocaleString("zh-TW", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
}

/**
 * Return a locale date string from another `string`.
 * If the `date` string is invalid, itself is returned.
 */
export function localeDateFromString(date: string): string {
  return localeDate(new Date(date), date);
}

/**
 * Returns an ISO 8601 date string (HTML Date String) from a `Date`.
 * If `date` is invalid, `fallback` is returned.
 * The default `fallback` is `undefiend`
 */
export function isoDateString(date: Date): string | undefined;
export function isoDateString<T>(date: Date, fallback: T): string | T;

export function isoDateString<T>(date: Date, fallback?: T) {
  return isNaN(date.valueOf()) ? fallback : date.toISOString().substring(0, 10);
}

// eggrror404 sama is so nb
