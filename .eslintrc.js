module.exports = {
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'no-param-reassign': 'off',
    'no-void': 'off',
    'max-len': 'off',
    'consistent-return': 'off',
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    'function-paren-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  overrides: [
    {
      files: ['test/**/*.ts'],
      env: {
        mocha: true,
      },
      rules: {
        'prefer-arrow-callback': 'off',
        'func-names': 'off',
      },
    },
  ],
  ignorePatterns: ['*.js', '*.d.ts'],
};
