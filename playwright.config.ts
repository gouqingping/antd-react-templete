import {type PlaywrightTestConfig, devices} from '@playwright/test';
const config: PlaywrightTestConfig = {
  workers: 6,
  retries: 3,
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']},
    },
    {
      name: 'webkit',
      use: {...devices['Desktop Safari']},
    },
  ],
};
export default config;
