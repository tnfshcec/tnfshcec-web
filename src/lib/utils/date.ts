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
