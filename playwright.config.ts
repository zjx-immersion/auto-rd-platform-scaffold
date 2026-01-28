import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright配置文件
 * Phase6测试配置
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:7003',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }, // 全屏
      },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:7003',
    reuseExistingServer: true,
    timeout: 120000,
  },
})
