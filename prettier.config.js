//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all', // Enabled for better git diffs
  useTabs: false,
  endOfLine: 'lf',
  quoteProps: 'as-needed',
  bracketSpacing: true,

  // Import order plugin
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  // plugins: ['@ianvs/prettier-plugin-sort-imports'],

  // Import sorting configuration
  importOrder: [
    '^(react|react-dom)(.*)$', // React imports first
    '<THIRD_PARTY_MODULES>', // Third party libraries
    '^@/(.*)$', // all @ imports
    '^@components/(.*)$', // Component imports
    '^@ts/(.*)$', // Type imports
    '^[./]', // Relative imports
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderCaseInsensitive: true,

  // File-specific overrides
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 80,
        tabWidth: 2,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'always',
      },
    },
  ],
};

export default config;
