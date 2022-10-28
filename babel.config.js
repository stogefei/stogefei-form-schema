module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@vue/app',
      {
        corejs: 3,
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
        },
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: false,
        corejs: 3,
      },
    ],
  ],
};
