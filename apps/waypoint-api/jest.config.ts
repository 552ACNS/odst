/* eslint-disable */
export default {
  displayName: 'waypoint-api',

  globals: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/waypoint-api',
  setupFiles: ['./jest.setup.ts'],
  preset: '../../jest.preset.js',
};
