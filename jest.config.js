module.exports = {
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'json', 'mjs'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: [
    '<rootDir>/**/*.test.(js|jsx|ts|tsx|mjs)',
    '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
// module.exports = {
//   testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$',
//   transform: {
//     '^.+\\.jsx?$': 'babel-jest',
//     '^.+\\.mjs$': 'babel-jest',
//   },
//   testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
//   moduleFileExtensions: ['js', 'jsx', 'mjs'],
// };
