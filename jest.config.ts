import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
  forceExit: true
}

export default config
