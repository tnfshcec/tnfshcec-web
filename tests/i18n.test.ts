import { test, expect } from "@playwright/test";

import { locales } from "$paraglide/runtime";

test("has anchors prefixed with locales", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}`);
    const anchors = await page.locator("a").all();

    for (const anchor of anchors) {
      const visible = await anchor.isVisible();
      if (!visible) {
        // skip if the anchor is not visible
        continue;
      }

      const href = await anchor.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#")) {
        // skip if href is null, external link, or hash link
        continue;
      }

      expect(href).toMatch(new RegExp(`^/${locale}/?`));
    }
  }
});