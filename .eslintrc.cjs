module.exports = {
  root: true,
  env: { browser: true, node: true, es2022: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'boundaries', 'simple-import-sort'],
  settings: {
    react: { version: 'detect' },
    'import/resolver': { typescript: { project: './tsconfig.json' } },
    'boundaries/include': ['src/**/*'],
    'boundaries/elements': [
      { type: 'common', pattern: 'src/features/common', mode: 'folder' },
      {
        type: 'feature',
        pattern: 'src/features/*',
        mode: 'folder',
        capture: ['feature'],
      },
      { type: 'shared', pattern: 'src/shared', mode: 'folder' },
      { type: 'app', pattern: 'src/app', mode: 'folder' },
      { type: 'page', pattern: 'src/pages', mode: 'folder' },
      { type: 'styles', pattern: 'src/styles', mode: 'folder' },
    ],
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    '.codex/',
  ],
  rules: {
    'boundaries/element-types': [
      'error',
      {
        default: 'allow',
        rules: [
          {
            from: ['feature'],
            disallow: ['feature'],
            allow: [['feature', { feature: '${from.feature}' }], 'common'],
          },
          { from: ['shared'], disallow: ['feature', 'page'] },
        ],
      },
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react', '^@?\\w'],
          ['^@/'],
          ['^\\.'],
          ['^\\u0000'],
          ['^.+\\.(css|less)$'],
          ['^.+\\.svg'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'max-len': [
      'error',
      {
        code: 100,
        ignoreComments: true,
        ignorePattern: '^import\\s|^export\\s.*from',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never', tsx: 'never', js: 'never', jsx: 'never' },
    ],
    'import/prefer-default-export': 'off',
    'import/order': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.ts', '**/*.test.tsx', 'tests/**', '*.ts'],
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': [
      'error',
      { namedComponents: ['function-declaration', 'arrow-function'] },
    ],
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state', 'request'] },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, variables: false, classes: true, typedefs: false },
    ],
    'no-void': ['error', { allowAsStatement: true }],
  },
};
