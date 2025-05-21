import { test, expect } from "@playwright/test";

test("can extract figures properly", async ({ page }) => {
  const res = await page.goto("/post/test/imagetest");

  expect(res?.ok()).toBe(true);

  // the figures' parent shouldn't be <p>
  const figures = await page.locator("figure").all();
  for (const figure of figures) {
    const parentTag = await figure.evaluate((el) => el.parentElement?.tagName);
    expect(parentTag).not.toBe("p");
  }

  // the figures should be followed by a <p>
  const figureParagraphs = await page.locator("figure + p").count();
  expect(figureParagraphs).toBe(figures.length);
});
