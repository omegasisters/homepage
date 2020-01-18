module.exports = {
  "collectCoverage": true,
  "collectCoverageFrom": [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/tests/**"
  ],
  "coverageReporters": [
    "html"
  ],
  "roots": [
    "./__tests__"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}
