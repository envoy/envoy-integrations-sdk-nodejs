module.exports = {
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-param-reassign': 'off',
    'no-void': 'off',
    'max-len': ["error", { "code": 120 }],
    'consistent-return': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
  },
  overrides: [
    {
      files: [
        'test/**/*.ts'
      ],
      env: {
        mocha: true
      },
      rules: {
        'prefer-arrow-callback': 'off',
        'func-names': 'off'
      }
    }
  ],
  ignorePatterns: ["*.js"]
};
