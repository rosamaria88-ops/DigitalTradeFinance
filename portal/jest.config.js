module.exports = {
  collectCoverageFrom: ['scripts/**/*.{js,}'],
  coverageDirectory: 'reports/coverage/unit',
  testMatch: ['**/*.test.js'],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": 'babel-jest'
  }
};
