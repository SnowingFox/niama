const path = require('path');

module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser',
    project: path.resolve(__dirname, './tsconfig.json'),
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:vue/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/vue',
  ],
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  rules: {
    'max-lines-per-function': ['error', { max: 25, skipBlankLines: true, skipComments: true }],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': ['error', { classes: false, functions: false, variables: false }],
    '@typescript-eslint/prefer-regexp-exec': 'off',
  },
  globals: {
    ga: true,
    cordova: true,
    __statics: true,
    process: true,
    Capacitor: true,
    chrome: true,
  },
};
