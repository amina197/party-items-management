import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    rules: {
      quotes: ['error', 'single'],
      eqeqeq: ['error', 'always'],
      'dot-notation': ['error', { 'allowKeywords': false }],
      'no-console': ['error', { allow: ['error'] }],
      'no-else-return': ['error'],
      'no-empty-function': ['error', { allow: 'constructors' }]
    },
  },
  {
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
