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

export function htmlDateString(s: string | undefined): string | undefined;
export function htmlDateString(date: Date): string;

export function htmlDateString(arg: Date | string | undefined) {
  let date: Date;

  if (arg instanceof Date) {
    date = arg;
  } else {
    date = new Date(arg || "");
  }

  return isNaN(date.valueOf()) ? arg : date.toISOString().substring(0, 10);
}
