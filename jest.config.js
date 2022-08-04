module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/.next/"], // files that will be ignored
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"], // documents that will execute before test
  transform: {
    "^.+\\.(js|ts|jsx|tsx)$": "<rootDir>/node_modules/babel-jest"  // extensions that will be translated by babel-jest
  },
  testEnvironment: 'jsdom',  // enviroment that the test will be executed so it can knows how to behave
  moduleNameMapper: {
    "\\.(scss|css|sass)$": "identity-obj-proxy",  // how tests will deal with these extensions
  }
};