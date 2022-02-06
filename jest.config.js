/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  modulePaths: ['<rootDir>/src/'],
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsх?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
