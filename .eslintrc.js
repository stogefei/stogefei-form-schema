module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      tsx: true,
    },
    sourceType: 'module',
  },
  extends: [
    require.resolve('./plugins-config/js-standard.js'),
    require.resolve('./plugins-config/ts-standard.js'),
    require.resolve('./plugins-config/vue-standard.js'),
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'vue/no-v-html': 0,
    'import/extensions': [
      'error',
      'never',
      {
        js: 'never',
        json: 'always',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        vue: 'always',
      },
    ],
    'linebreak-style': ['off', 'windows'],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      rules: {
        'comma-dangle': [
          'error',
          {
            arrays: 'never',
            objects: 'never',
            imports: 'never',
            exports: 'never',
            functions: 'never',
          },
        ],
      },
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    'import/extensions': [
      '.js',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
      '.json',
    ],
  },
};
