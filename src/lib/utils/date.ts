import { getLocale } from "$paraglide/runtime";

/**
 * Validates if the string passed in is a valid `Date`.
 * If the string is NOT a valid date (e.g. is `undefined`, empty string),
 * the return `null`. Otherwise, a `Date` object is returned.
 *
 * @returns A `Date` if string is valid. Else `null`.
 */
export function validDate(string?: string) {
  const dateObj = new Date(string ?? "");
  return isNaN(dateObj.valueOf()) ? null : dateObj;
}

/**
 * Converts a date-string to a locale specific text.
 *
 * @returns Locale text of the date. Returns the original string if date-string is not valid.
 */
export function localeDate(string?: string) {
  const valid = validDate(string);
  return valid
    ? valid.toLocaleString(getLocale(), {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : string;
}
