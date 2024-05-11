import nextJest from 'next/jest';
import { Config } from '@jest/types';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config.InitialOptions = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/coverage'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
};

export default createJestConfig(config);
