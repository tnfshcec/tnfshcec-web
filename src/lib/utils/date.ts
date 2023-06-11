export function localeDate(s: string | undefined) {
  const date = new Date(s || "");

  return isNaN(date.valueOf())
    ? s
    : date.toLocaleString("zh-TW", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
}
