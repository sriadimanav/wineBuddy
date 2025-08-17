// commitlint.config.js
import { defineConfig } from 'cz-git';

/** @type {import('cz-git').UserConfig} */
export default defineConfig({
  extends: ['@commitlint/config-conventional'],

  // ✅ Commitlint rules
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only changes
        'style', // Formatting only
        'refactor', // Code restructuring
        'perf', // Performance improvement
        'test', // Tests
        'build', // Build system or deps
        'ci', // CI/CD
        'chore', // Maintenance tasks
        'revert', // Revert commits
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-max-length': [2, 'always', 72],
    'header-max-length': [2, 'always', 100],
    'scope-enum': [0], // 👈 Disabled for now — allows any scope during early development
    'scope-empty': [0], // allow empty scopes
  },

  // ✅ cz-git prompt config (Wine Buddy style)
  prompt: {
    useEmoji: true,
    emojiAlign: 'center',
    confirmColorize: true,
    maxHeaderLength: 100,
    maxSubjectLength: 72,

    messages: {
      type: '🍷 What type of change are you making to Wine Buddy?',
      scope: '🎯 Which part of Wine Buddy does this affect? (or enter custom)',
      subject: '✨ Write a short description of your change:\n',
      body: '📖 Provide more details (optional):\n',
      breaking: '⚠️  List any BREAKING CHANGES (optional):\n',
      footer: '🎫 Reference any issues (e.g. #31, #34):\n',
      confirmCommit: '🚀 Ready to commit this Wine Buddy change?',
    },

    types: [
      { value: 'feat', name: '🚀 feat:     Add a new feature', emoji: '🚀' },
      { value: 'fix', name: '🐛 fix:      Fix a bug', emoji: '🐛' },
      { value: 'docs', name: '📚 docs:     Documentation', emoji: '📚' },
      { value: 'style', name: '💄 style:    Styling/formatting', emoji: '💄' },
      { value: 'refactor', name: '♻️ refactor: Refactor code', emoji: '♻️' },
      { value: 'perf', name: '⚡ perf:     Improve performance', emoji: '⚡' },
      { value: 'test', name: '✅ test:     Add/update tests', emoji: '✅' },
      { value: 'build', name: '📦 build:    Build/dependency changes', emoji: '📦' },
      { value: 'ci', name: '🎡 ci:       CI/CD changes', emoji: '🎡' },
      { value: 'chore', name: '🔧 chore:    Maintenance tasks', emoji: '🔧' },
      { value: 'revert', name: '⏪ revert:   Revert a commit', emoji: '⏪' },
    ],

    scopes: [
      // 📦 App domain scopes
      { name: 'auth', description: 'Authentication & user management' },
      { name: 'scan', description: 'Wine scanning functionality' },
      { name: 'favorites', description: 'Favorites management' },
      { name: 'search', description: 'Search & filtering' },
      { name: 'ui', description: 'UI components' },
      { name: 'api', description: 'API & services' },
      { name: 'config', description: 'Configuration & tooling' },
      { name: 'profile', description: 'User profile' },
      { name: 'home', description: 'Home screen' },
      { name: 'onboarding', description: 'User onboarding flow' },
      { name: 'gamification', description: 'Badges, achievements' },
      { name: 'data', description: 'Data & storage' },
      { name: 'hooks', description: 'Custom React hooks' },
      { name: 'utils', description: 'Utility functions' },
      { name: 'types', description: 'TypeScript types' },
      { name: 'tests', description: 'Test-related' },
      { name: 'docs', description: 'Documentation' },
      { name: 'deps', description: 'Dependencies' },

      // 🔧 Generic tooling scopes (added to avoid errors on meta commits)
      { name: 'commit', description: 'Commit or git workflow related' },
      { name: 'release', description: 'Release process or versioning' },
    ],

    allowCustomScopes: true, // 👈 Enabled for now (flexible in early dev)
    allowEmptyScopes: true,
    allowBreakingChanges: ['feat', 'fix'],
  },
});
