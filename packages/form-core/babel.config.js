module.exports = {
  compact: false,
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
    [
      'import',
      { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true },
      'ant-design-vue',
    ],
    ['@vue/babel-plugin-jsx', { mergeProps: false }],
  ],
};
