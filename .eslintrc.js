module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-trailing-spaces': 'off',
    'padded-blocks': 'off',
    'no-console': 'off',
    'arrow-parens': 'off',
    'no-return-assign': 'off',
    'no-empty': 'off',
    'consistent-return': 'off',
    'no-shadow': 'off',
    'no-plusplus': 'off',
    'no-case-declarations': 'off',
    'class-methods-use-this': 'off'
  },
  overrides: [
    {
      files: [
        'tests/**/*.test.js'
      ],
      env: {
        mocha: true
      },
      rules: {
        'prefer-arrow-callback': 'off',
        'func-names': 'off',
        'no-loop-func': 'off',
        'no-await-in-loop': 'off',
        'no-restricted-syntax': 'off',
        'max-len': 'off'
      }
    }
  ]
};
