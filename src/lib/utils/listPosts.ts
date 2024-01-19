// TODO: storing the sorted array (making `limit` arg useful)
export function listSortedPosts(): App.PostData[] {
  return Object.entries<App.PostData>(
    import.meta.glob("/cec/*.{md,svex}", { eager: true, import: "metadata" })
  )
    .map(([path, data]) => {
      data.url = path.substring(5, path.lastIndexOf("."));
      return data;
    })
    .sort((a, b) => {
      const pin = +(b.pinned ?? 0) - +(a.pinned ?? 0);

      if (pin != 0) {
        return pin;
      }

      const dateA = a.date ? Date.parse(a.date) : 0;
      const dateB = b.date ? Date.parse(b.date) : 0;

      return dateB - dateA;
    });
}
