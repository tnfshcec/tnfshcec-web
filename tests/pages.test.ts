import { test, expect } from "@playwright/test";

test("can access landing page", async ({ page }) => {
  const res = await page.goto("/");

  expect(res?.ok()).toBe(true);
});

test("can access landing page in alternative languages", async ({ page }) => {
  const resEn = await page.goto("/en");
  const resJa = await page.goto("/ja");

  expect(resEn?.ok()).toBe(true);
  expect(resJa?.ok()).toBe(true);
});

test("can render elements.md", async ({ page }) => {
  const res = await page.goto("/post/test/elements");

  expect(res?.ok()).toBe(true);
});

test("can render elements.md in alternative languages", async ({ page }) => {
  const resEn = await page.goto("/en/post/test/elements");
  const resJa = await page.goto("/ja/post/test/elements");

  expect(resEn?.ok()).toBe(true);
  expect(resJa?.ok()).toBe(true);
});
