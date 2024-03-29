import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';

const cypressJsonConfig = {
  testFiles: [
    '../integration/highPriorityTests/*.ts',
    '../integration/mediumPriorityTests/*.ts',
    '../integration/lowPriorityTests/*.ts',
  ],
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  video: true,
  videosFolder: '../../dist/cypress/apps/waypoint-e2e/videos',
  screenshotsFolder: '../../dist/cypress/apps/waypoint-e2e/screenshots',
  chromeWebSecurity: false,
  specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
  supportFile: 'src/support/e2e.ts',
};
export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    ...cypressJsonConfig,
  },
});
