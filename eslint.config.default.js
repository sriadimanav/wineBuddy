// @ts-check
//import jsxA11y from 'eslint-plugin-jsx-a11y';
import comments from '@eslint-community/eslint-plugin-eslint-comments';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { tanstackConfig } from '@tanstack/eslint-config';
import importPlugin from 'eslint-plugin-import';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  //allConfig: js.configs.all,
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Start with TanStack's solid foundation
  ...tanstackConfig,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  comments.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  ...fixupConfigRules(compat.extends('plugin:@typescript-eslint/recommended')),
  prettierRecommended,

  {
    name: 'wine-buddy-custom-config',
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.es2022,
        // Vite globals
        import: 'readonly',
        // Test globals
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
      },
    },

    // Explicit plugin registration (like your React Native config)
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      import: importPlugin,
      '@eslint-community/eslint-comments': comments,
      '@typescript-eslint': tseslint.plugin,
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },

    rules: {
      // Override/enhance rules from compat.extends configs

      // TypeScript rules (enhance from compat.extends)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/prefer-const': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',

      // React specific rules (enhance from compat.extends)
      'react/jsx-uses-react': 'off', // Not needed with new JSX transform
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off', // Using TypeScript for prop validation
      'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
      'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/self-closing-comp': 'error',
      'react/jsx-pascal-case': 'error',
      'react/no-array-index-key': 'warn',
      'react/no-unescaped-entities': 'error',
      'react/jsx-key': 'error',
      'react/no-children-prop': 'error',

      // React Hooks rules (from compat.extends)
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Import rules (enhance from compat.extends)
      'import/no-unresolved': ['error', { commonjs: true, amd: true }],
      'import/named': 'error',
      'import/namespace': 'error',
      'import/default': 'error',
      'import/export': 'error',
      'import/no-named-as-default': 'warn',
      'import/no-named-as-default-member': 'warn',
      'import/no-duplicates': 'error',
      'import/no-dynamic-require': 'warn',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react-dom',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@components/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@routes/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@ts/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'react-dom'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-anonymous-default-export': 'warn',

      // Accessibility rules (from compat.extends)
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/interactive-supports-focus': 'warn',
      'jsx-a11y/label-has-associated-control': 'error',
      'jsx-a11y/no-autofocus': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',

      // ESLint Comments rules
      '@eslint-community/eslint-comments/no-unused-disable': 'error',
      '@eslint-community/eslint-comments/disable-enable-pair': 'error',

      // General code quality (build on compat.extends configs)
      'no-unused-vars': 'off', // Handled by TypeScript rule above
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],

      // Best practices
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      radix: 'error',
      yoda: 'error',

      // Stylistic rules (minimal since Prettier handles most)
      'comma-dangle': ['error', 'always-multiline'],
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'jsx-quotes': ['error', 'prefer-double'],
    },
  },
  // File-specific configurations using compat approach
  {
    name: 'config-files-overrides',
    files: [
      '**/*.config.{js,ts,mjs,cjs}',
      'vite.config.ts',
      'vitest.config.ts',
      'prettier.config.js',
      'eslint.config.js',
    ],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: fixupPluginRules(importPlugin),
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'import/no-default-export': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  {
    name: 'test-files-overrides',
    files: [
      '**/*.test.{js,ts,jsx,tsx}',
      '**/*.spec.{js,ts,jsx,tsx}',
      '**/__tests__/**/*.{js,ts,jsx,tsx}',
    ],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: fixupPluginRules(react),
      import: fixupPluginRules(importPlugin),
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'import/no-extraneous-dependencies': 'off',
      'react/display-name': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },

  {
    name: 'route-files-overrides',
    files: ['src/routes/**/*.tsx', 'src/routes/**/*.ts'],
    plugins: {
      react: fixupPluginRules(react),
      import: fixupPluginRules(importPlugin),
    },
    rules: {
      'import/no-default-export': 'off', // Routes need default exports
      'react/display-name': 'off', // Route components don't need display names
      'react/jsx-uses-react': 'off',
    },
  },

  {
    name: 'type-definition-files',
    files: ['**/*.d.ts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: fixupPluginRules(importPlugin),
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'import/no-default-export': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },

  // You can also use compat.extends for specific community configs
  ...fixupConfigRules(
    compat
      .extends
      // Add any community configs that don't have flat config support yet
      // Example: 'some-community-config/recommended'
      (),
  ),

  // Global ignores
  {
    name: 'global-ignores',
    ignores: [
      // Build outputs
      'dist/**',
      'build/**',
      'dev-dist/**',
      'coverage/**',
      'coverage/*',

      // Dependencies
      'node_modules/**',

      // Cache directories
      '.vite/**',
      '.turbo/**',

      // Generated files
      'routeTree.gen.ts',
      '**/*.gen.ts',

      // Tool directories
      '.lefthook/**',
      '__tests__/*',
      '__tests__/*.js',
      'jest/*.js',

      // Config directories
      'config/*.js',

      // Public assets
      'public/**',

      // Package manager files
      'pnpm-lock.yaml',

      // IDE files
      '.vscode/**',
    ],
  },
];
