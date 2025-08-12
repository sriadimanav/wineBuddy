//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  printWidth: 100,
  //semi: false,
  singleQuote: true,
  tabWidth: 2,
  //trailingComma: 'all',
  plugins: ['prettier-plugin-organize-imports'],
};

export default config;
