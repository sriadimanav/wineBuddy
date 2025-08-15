// commitlint.config.js
/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],

  rules: {
    // Type rules
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only changes
        'style', // Changes that do not affect the meaning of the code
        'refactor', // Code change that neither fixes a bug nor adds a feature
        'perf', // Code change that improves performance
        'test', // Adding missing tests or correcting existing tests
        'build', // Changes that affect the build system or external dependencies
        'ci', // Changes to CI configuration files and scripts
        'chore', // Other changes that don't modify src or test files
        'revert', // Reverts a previous commit
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],

    // Scope rules
    'scope-case': [2, 'always', 'lower-case'],
    'scope-empty': [0], // Allow empty scopes
    'scope-enum': [
      2,
      'always',
      [
        // Wine Buddy specific scopes
        'auth', // Authentication & user management
        'scan', // Wine scanning functionality
        'favorites', // Wine favorites management
        'search', // Wine search & filtering
        'ui', // User interface components
        'api', // API & data services
        'pwa', // Progressive Web App features
        'config', // Configuration & build tools
        'profile', // User profile management
        'home', // Home screen features
        'onboarding', // User onboarding flow
        'gamification', // Badges, achievements, etc.
        'data', // Data management & storage
        'hooks', // Custom React hooks
        'utils', // Utility functions
        'types', // TypeScript type definitions
        'tests', // Test-related changes
        'docs', // Documentation
        'deps', // Dependencies updates
      ],
    ],

    // Subject rules
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 72],
    'subject-min-length': [2, 'always', 10],

    // Header rules
    'header-max-length': [2, 'always', 100],
    'header-min-length': [2, 'always', 15],

    // Body rules
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],

    // Footer rules
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
  },

  // cz-git prompt configuration
  prompt: {
    useEmoji: true,
    emojiAlign: 'center',
    confirmColorize: true,
    maxHeaderLength: 100,
    maxSubjectLength: 72,
    minSubjectLength: 10,

    // Custom messages for Wine Buddy
    messages: {
      type: '🍷 What type of change are you making to Wine Buddy?',
      scope: '🎯 What part of Wine Buddy does this affect:',
      customScope: '📝 Enter a custom scope for your Wine Buddy change:',
      subject: '✨ Write a short description of your change:\n',
      body: '📖 Provide more details about your Wine Buddy change (optional):\n',
      breaking: '⚠️  List any BREAKING CHANGES that affect Wine Buddy users:\n',
      footerPrefixesSelect: '🎫 Select the type of issue this affects (optional):',
      customFooterPrefix: '🏷️  Input custom issue prefix:',
      footer: '🎫 Reference any GitHub issues (e.g., #31, #34):\n',
      confirmCommit: '🚀 Ready to commit this Wine Buddy improvement?',
    },

    // Wine Buddy themed commit types
    types: [
      {
        value: 'feat',
        name: '🚀 feat:     Add a new feature to Wine Buddy',
        emoji: '🚀',
      },
      {
        value: 'fix',
        name: '🐛 fix:      Fix a bug in Wine Buddy',
        emoji: '🐛',
      },
      {
        value: 'docs',
        name: '📚 docs:     Update Wine Buddy documentation',
        emoji: '📚',
      },
      {
        value: 'style',
        name: '💄 style:    Improve Wine Buddy styling/formatting',
        emoji: '💄',
      },
      {
        value: 'refactor',
        name: '♻️  refactor: Refactor Wine Buddy code structure',
        emoji: '♻️',
      },
      {
        value: 'perf',
        name: '⚡ perf:     Improve Wine Buddy performance',
        emoji: '⚡',
      },
      {
        value: 'test',
        name: '✅ test:     Add/update Wine Buddy tests',
        emoji: '✅',
      },
      {
        value: 'build',
        name: '📦 build:    Update Wine Buddy build system',
        emoji: '📦',
      },
      {
        value: 'ci',
        name: '🎡 ci:       Update Wine Buddy CI/CD',
        emoji: '🎡',
      },
      {
        value: 'chore',
        name: '🔨 chore:    Wine Buddy maintenance tasks',
        emoji: '🔨',
      },
      {
        value: 'revert',
        name: '⏪ revert:   Revert a Wine Buddy change',
        emoji: '⏪',
      },
    ],

    // Wine Buddy specific scopes with descriptions
    scopes: [
      { name: 'auth', description: 'Authentication & user management' },
      { name: 'scan', description: 'Wine scanning functionality' },
      { name: 'favorites', description: 'Wine favorites management' },
      { name: 'search', description: 'Wine search & filtering' },
      { name: 'ui', description: 'User interface components' },
      { name: 'api', description: 'API & data services' },
      { name: 'pwa', description: 'Progressive Web App features' },
      { name: 'config', description: 'Configuration & build tools' },
      { name: 'profile', description: 'User profile management' },
      { name: 'home', description: 'Home screen features' },
      { name: 'onboarding', description: 'User onboarding flow' },
      { name: 'gamification', description: 'Badges, achievements, etc.' },
      { name: 'data', description: 'Data management & storage' },
      { name: 'hooks', description: 'Custom React hooks' },
      { name: 'utils', description: 'Utility functions' },
      { name: 'types', description: 'TypeScript type definitions' },
      { name: 'tests', description: 'Test-related changes' },
      { name: 'docs', description: 'Documentation' },
      { name: 'deps', description: 'Dependencies updates' },
    ],

    allowCustomScopes: true,
    allowEmptyScopes: true,
    allowBreakingChanges: ['feat', 'fix'],
    skipQuestions: [],

    // Issue prefixes
    issuePrefixes: [
      { value: 'closes', name: 'closes:   ISSUES has been processed' },
      { value: 'fixes', name: 'fixes:    ISSUES has been fixed' },
      { value: 'refs', name: 'refs:     Referenced ISSUES' },
      { value: 'related', name: 'related:  ISSUES is related' },
    ],
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,

    // UI customization
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    breaklineNumber: 100,
    breaklineChar: '|',
    customIssuePrefixAlign: 'top',
    emptyIssuePrefixAlias: 'skip',
    customIssuePrefixAlias: 'custom',
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: '',
  },
};
