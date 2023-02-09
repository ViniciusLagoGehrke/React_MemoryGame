module.exports = {
  testEnvironment: "jsdom",
  "setupFilesAfterEnv": [
    "<rootDir>/jest.setup.js"
  ],
  collectCoverageFrom: ["<rootDir>/src/components/**/*.tsx", "<rootDir>/src/utis/**/*.ts"]
};