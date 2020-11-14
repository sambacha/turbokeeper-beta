// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  verbose: true,
  testURL: 'https://localhost/',
  moduleNameMapper: {
    '~react/(.*)': '<rootDir>/node_modules/$1',
    'styled-components': '<rootDir>/node_modules/styled-components',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: [
    '<rootDir>/extension-app/utils/tests/setup-tests.js',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'clover',
  ],
  collectCoverageFrom: [
    'extension-app/**/*.js',
    '!extension-app/app.js',
    '!extension-app/controller.js',
    '!extension-app/utils/system/system-constants.js',
    '!extension-app/utils/tests/jest-raw-loader.js',
    '!extension-app/utils/tests/jest-static-loader.js',
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.hbs$': '<rootDir>/extension-app/utils/tests/jest-raw-loader.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/extension-app/utils/tests/jest-static-loader.js',
  },
};
