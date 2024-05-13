module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint-config-love',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'import'],
  rules: {
    'import/order': [
      'error',
      {
        groups: ['external', 'builtin', ['sibling', 'parent'], 'index'],
        pathGroups: [
          {
            pattern: 'components',
            group: 'internal',
          },
          {
            pattern: 'data',
            group: 'internal',
          },
          {
            pattern: 'app/ **',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'lib',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'react/prop-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
