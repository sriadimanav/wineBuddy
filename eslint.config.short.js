// @ts-check
import comments from '@eslint-community/eslint-plugin-eslint-comments';
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Base configurations
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Community configs (minimal)
  comments.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  importPlugin.flatConfigs.recommended,

  // Prettier last
  prettierRecommended,

  // Global settings
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
  },

  // Main configuration - MINIMAL RULES
  {
    name: 'wine-buddy-minimal',
    files: ['**/*.{js,jsx,ts,tsx}'],

    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },

    rules: {
      // 🎯 TYPESCRIPT - Just 2 essential rules
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',

      // ⚛️ REACT - Just 2 essential rules
      'react/react-in-jsx-scope': 'off',
      'react/jsx-key': 'error',

      // 🪝 REACT HOOKS - Just 1 essential rule
      'react-hooks/rules-of-hooks': 'error',

      // 📦 IMPORT - Just 2 essential rules
      'import/no-unresolved': 'error',
      'import/order': ['error', { 'newlines-between': 'always' }],

      // 💬 ESLINT COMMENTS - Just 1 rule
      '@eslint-community/eslint-comments/no-unused-disable': 'error',

      // 🔧 GENERAL - Just 2 essential rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
    },
  },

  // Config files - minimal overrides
  {
    name: 'config-files',
    files: ['**/*.config.{js,ts}', 'eslint.config.js'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Test files - minimal overrides
  {
    name: 'test-files',
    files: ['**/*.test.{js,ts,jsx,tsx}', '**/*.spec.{js,ts,jsx,tsx}'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Global ignores
  {
    ignores: ['dist/**', 'node_modules/**', '.vite/**', 'routeTree.gen.ts', '**/*.gen.ts'],
  },
);
