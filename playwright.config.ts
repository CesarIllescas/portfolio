import { defineConfig, devices } from '@playwright/test';
import { readFileSync } from 'node:fs';

// Read the actual built asset prefix, including project repositories on PR builds.
const builtBase = readFileSync('dist/index.html', 'utf8').match(/href="([^"]*)assets\/[^" ]+\.css"/)?.[1] || '/';

export default defineConfig({
  testDir: './e2e',
  outputDir: 'artifacts/playwright',
  reporter: [['list'], ['html', { outputFolder: 'artifacts/playwright-report', open: 'never' }]],
  use: {
    baseURL: process.env.E2E_BASE_URL || `http://127.0.0.1:4173${builtBase}`,
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}),
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
  },
});
