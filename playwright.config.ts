import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    env: { ORIGIN: "https://www.tnfshcec.com" },
    command: "npm run build && npm run preview",
    port: 4173,
    timeout: 120 * 1000 // double the default
  },
  testDir: "tests",
  testMatch: /(.+\.)?(test|spec)\.[jt]s/
});
