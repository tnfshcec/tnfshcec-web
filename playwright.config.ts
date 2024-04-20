import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  webServer: {
    env: { ORIGIN: "https://www.tnfshcec.com" },
    command: "npm run build && npm run preview",
    port: 4173
  },
  testDir: "tests",
  testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
