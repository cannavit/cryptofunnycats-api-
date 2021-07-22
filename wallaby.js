module.exports = function (wallaby) {
  return {
    files: [
      {
        pattern: 'node_modules/babel-polyfill/dist/polyfill.js',
        instrument: false,
      },
      'src/**/*.js',
    ],

    tests: ['test/**/*test.js'],

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
    },
  };
};
