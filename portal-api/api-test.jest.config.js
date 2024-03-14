const commonConfig = require('./jest.common.config');

module.exports = {
  ...commonConfig,
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coverageDirectory: 'generated_reports/coverage/api-test',
  testMatch: ['**/utilisation-report-service/*.api-test.{js,ts}'],
  setupFilesAfterEnv: ['./api-test-setup.jest.config.js'],
  testTimeout: 5000,
};
