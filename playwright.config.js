// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Module 4 End Assignment - Playwright Configuration
 * Configures native diagnostics (screenshots, video, trace) and the
 * Allure reporter listener alongside the built-in HTML reporter.
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,

  // Multiple reporters: HTML for local viewing, Allure for enterprise
  // metric dashboards, list for readable terminal/Jenkins console output.
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', {
      resultsDir: 'allure-results',
      detail: true,
      suiteTitle: true,
    }],
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    actionTimeout: 10 * 1000,

    // --- Native Diagnostics & Tracing (Q1) ---
    // Screenshot captured only when a step/test fails.
    screenshot: 'only-on-failure',
    // Video retained only for failing tests to save space.
    video: 'retain-on-failure',
    // Trace Viewer archive retained on first retry / failure.
    trace: 'retain-on-failure',

    headless: true,
  },

  // Cross-browser headless execution (used by the Jenkins pipeline).
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});
