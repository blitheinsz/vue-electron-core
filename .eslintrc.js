module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: 'off',
    'comma-dangle': 'off',
    'func-names': 'off',
    'prefer-destructuring': 'off',
    'object-curly-newline': 'off',
    'no-restricted-syntax': 0,
    'no-plusplus': 0,
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'max-len': [
        'error',
        150
    ],
    'vue/require-valid-default-prop': 'off',
    'vue/script-indent': [
        'error',
        4,
        {
            baseIndent: 1
        }
    ],
    'vue/html-indent': [
        'error',
        4
    ],
    'vue/max-attributes-per-line': [
        'off'
    ],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  },
  parserOptions: {
    parser: 'typescript-eslint-parser',
  },
};
