// ===============================
// 📋 TYPE CHECKING & IMPORTS EXPLANATION
// ===============================
// @ts-check
// Enable TypeScript checking for this JavaScript file
// This gives you IntelliSense and type errors in your config file
//
// ===============================
// 🔌 CORE ESLINT PLUGINS and 🛠️ COMPATIBILITY & UTILITY PLUGINS
// ===============================
// Manage ESLint disable comments
import comments from '@eslint-community/eslint-plugin-eslint-comments';
// Fix legacy plugins for flat config
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
// Bridge between old & new config formats
import { FlatCompat } from '@eslint/eslintrc';
// Core JavaScript rules
import js from '@eslint/js';
// Validates import/export syntax & paths
import importPlugin from 'eslint-plugin-import';
// Integrates Prettier formatting
import prettierRecommended from 'eslint-plugin-prettier/recommended';
// React-specific linting rules
import react from 'eslint-plugin-react';
// React Hooks rules (rules of hooks, deps)
import reactHooks from 'eslint-plugin-react-hooks';
// Fast Refresh rules for Vite/React
import reactRefresh from 'eslint-plugin-react-refresh';
// Global variables for different environments
import globals from 'globals';
// Node.js path utilities (node: prefix is modern)
import path from 'node:path';
// Convert import.meta.url to file path
import { fileURLToPath } from 'node:url';
// TypeScript ESLint rules and configs
import tseslint from 'typescript-eslint';

// ===============================
// 📁 ES MODULES __dirname RECREATION
// ===============================

// What this does:
// import.meta.url    → "file:///Users/you/project/eslint.config.js"
// fileURLToPath()    → "/Users/you/project/eslint.config.js"
// path.dirname()     → "/Users/you/project"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended, // Basic JavaScript rules
  //allConfig: js.configs.all,
});

export default tseslint.config(
  // Base configurations
  js.configs.recommended, // Basic JavaScript rules
  ...tseslint.configs.recommended, // TypeScript rules

  // Community configs (minimal)
  ...fixupConfigRules(compat.extends('plugin:@eslint-community/eslint-comments/recommended')),
  react.configs.flat.recommended, // React rules (prop-types, jsx-key, etc.)
  react.configs.flat['jsx-runtime'], // Modern React JSX (no need for React import)
  reactHooks.configs['recommended-latest'], // React Hooks rules
  reactRefresh.configs.vite, // React Fast Refresh for Vite
  importPlugin.flatConfigs.recommended, // Import/export validation

  // Prettier last
  prettierRecommended,

  // Global settings
  {
    languageOptions: {
      /*
        default parser is "espree" which is added by eslint but we are using tseslint.config function that
        automatically sets tseslint.parser or @typescript-eslint/parser as your parser
      */
      ecmaVersion: 'latest', // Use latest JavaScript features (using default value)
      sourceType: 'module', // ES modules (import/export) (using default value)
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Enable JSX parsing
        project: './tsconfig.json', // TypeScript project config
        tsconfigRootDir: import.meta.dirname, // Project root
      },
      globals: {
        ...globals.browser, // Browser globals (window, document, etc.)
        ...globals.es2022, // Modern JavaScript globals
      },
    },
  },

  // Main configuration - MINIMAL RULES
  {
    name: 'wine-buddy-minimal',
    files: ['**/*.{js,jsx,ts,tsx}'],

    plugins: {
      '@eslint-community/eslint-comments': fixupPluginRules(comments),
    },

    settings: {
      react: { version: 'detect' }, // Auto-detect React version
      'import/resolver': {
        typescript: {
          project: './tsconfig.json', // Use tsconfig for path resolution
          alwaysTryTypes: true, // Always try to resolve types
          moduleDirectory: ['node_modules', 'src'], // Custom module directories
        },
      },
    },

    rules: {
      'react-refresh/only-export-components': 'off', // Disable Fast Refresh restriction - allows mixing components with utilities

      // 🎯 TYPESCRIPT - Just 2 essential rules
      '@typescript-eslint/no-unused-vars': 'error', // Catch unused variables
      '@typescript-eslint/no-explicit-any': 'warn', // Discourage 'any' type

      // ⚛️ REACT - Just 2 essential rules
      'react/react-in-jsx-scope': 'off', // React import not required for JSX (modern React)
      'react/jsx-key': 'error', // Require keys in lists
      'react/prop-types': 'off', // Using TypeScript instead of PropTypes
      'react/require-default-props': 'off', // TS optional props (price?: number) replace defaultProps
      'react/default-props-match-prop-types': 'off', // TS catches type errors: price = "0" → error (string vs number)
      'react/no-unescaped-entities': 'warn', // Encourage proper quotes and HTML entities (&rsquo; &ldquo; &amp;)

      // 🪝 REACT HOOKS - Just 1 essential rule
      'react-hooks/rules-of-hooks': 'error', // Hooks must be called at component top level only
      'react-hooks/exhaustive-deps': 'warn', // Warn about missing dependencies

      // 📦 IMPORT - Just 2 essential rules
      'import/no-unresolved': [
        'error',
        {
          ignore: [
            '^virtual:', // ✅ Ignore all Vite virtual modules (like virtual:pwa-register)
          ],
        },
      ],
      'import/order': 'off',
      'import/no-duplicates': 'error', // Merge duplicate imports
      'import/first': 'error', // Imports should be first
      'import/newline-after-import': 'error', // Newline after imports

      // 💬 ESLINT COMMENTS - Just 1 rule
      '@eslint-community/eslint-comments/no-unused-disable': 'error',

      // 🔧 GENERAL - Just 2 essential rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error', // Use let/const instead of var
    },
  },

  // Config files - minimal overrides
  {
    name: 'config-files',
    files: ['**/*.config.{js,ts}', 'eslint.config.js', '.lintstagedrc.cjs', 'commitlint.config.js'],
    languageOptions: {
      globals: globals.node, // Node.js globals
      parser: undefined, // Use default parser (not TypeScript)
      parserOptions: {
        project: null, // Disable TypeScript project analysis
      },
    },
    rules: {
      'no-console': 'off', // Allow console in config files
      '@typescript-eslint/no-explicit-any': 'off', // Allow any in config files
    },
  },

  // Test files - minimal overrides
  {
    name: 'test-files',
    files: ['**/*.test.{js,ts,jsx,tsx}', '**/*.spec.{js,ts,jsx,tsx}'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off', // Allow ! in tests
    },
  },

  // CommonJS files
  {
    name: 'commonjs-files',
    files: ['**/*.cjs'],
    languageOptions: {
      globals: globals.node,
      sourceType: 'script', // CommonJS, not ES modules
      parserOptions: {
        project: null,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  // Global ignores
  {
    ignores: [
      'dist/**', // Build output
      'dev-dist/**', // Vite dev build
      'node_modules/**', // Dependencies
      '.vite/**', // Vite cache
      'routeTree.gen.ts', // TanStack Router generated files
      '**/*.gen.ts', // All generated TypeScript files
      'eslint.config.default.js',
      'eslint.config.tseslint.js',
      'eslint.config.short.js',
      '.lintstagedrc.cjs', // Lint-staged config
      'commitlint.config.js', // Commitlint config
      'pnpm-lock.yaml', // Package lock file
      'vite-env.d.ts', // Vite environment types
      '**/*.d.ts', // All TypeScript declaration files
      'coverage/**', // Test coverage reports
    ],
  },
);
