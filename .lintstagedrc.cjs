// .lintstagedrc.cjs
module.exports = {
  // JavaScript/TypeScript files
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],

  // JSON and Markdown files
  '*.{json,md,yml,yaml}': ['prettier --write'],

  // CSS files
  '*.{css,scss}': ['prettier --write'],

  // Package.json (special handling)
  'package.json': ['prettier --write'],
};
