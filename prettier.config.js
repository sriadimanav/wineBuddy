//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  //trailingComma: 'all',
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@ui/(.*)$',
    '^@(?!types)(.*)$', // all @ imports except @types
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
}

export default config
