/* eslint-disable */
export default {
  displayName: 'waypoint-api',

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/waypoint-api',
  setupFiles: ['./jest.setup.ts'],
  preset: '../../jest.preset.js',
};
