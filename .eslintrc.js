// 0 - off
// 1 - warn
// 2 - error

module.exports = {
  env: {
    browser: false,
    commonjs: true,
    node: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base', 'eslint-config-prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['prettier', 'eslint-plugin-prettier', 'jest'],
  rules: {
    semi: [0, 'never'],
    'consistent-return': 0,
    'no-continue': 0,
    'no-plusplus': 0,
    'no-sequences': 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
    'prettier/prettier': [
      1,
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 80,
        semi: false,
        endOfLine: 'lf',
        arrowParens: 'avoid',
      },
    ],
    'no-unused-vars': [
      1,
      {
        argsIgnorePattern: 'res|next|^err',
      },
    ],
    'prefer-const': [
      0,
      {
        destructuring: 'all',
      },
    ],
    'no-return-assign': [1, 'except-parens'],
    quotes: [
      1,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'no-param-reassign': [
      1,
      {
        props: false,
      },
    ],
  },
}
