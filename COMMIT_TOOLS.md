# Commit Message Tools Documentation

## Overview

These packages work together to enforce consistent, structured commit messages
using the Conventional Commits specification. They help maintain a clean git
history, enable automated changelog generation, and improve team collaboration.

---

## Core Packages

### 📝 **`@commitlint/cli`**

**What it does:** A command-line tool that validates commit messages against
predefined rules.

- **Message validation**: Checks if commit messages follow the correct format
- **Git hook integration**: Runs during commit process to block bad messages
- **Error reporting**: Shows exactly what's wrong with invalid commit messages
- **Configurable**: Works with different rule sets and configurations

**Example of what it validates:**

```bash
# ✅ Valid commit messages
feat(auth): add user login functionality
fix(ui): resolve button alignment issue
docs: update installation instructions

# ❌ Invalid commit messages (commitlint will reject these)
"added some stuff"           # No type, no proper format
"FIX: button bug"           # Wrong case (should be lowercase)
"feat: super long commit message that exceeds the maximum character limit and goes on and on without any consideration for readability or conventional commit standards which makes it really hard to understand what the change actually does" # Too long
```

### 🔧 **`@commitlint/config-conventional`**

**What it does:** Provides the Conventional Commits ruleset for commitlint.

- **Rule definitions**: Defines what makes a valid conventional commit
- **Type enforcement**: Enforces specific commit types (feat, fix, docs, etc.)
- **Format validation**: Ensures proper structure and casing
- **Length limits**: Controls subject line and body length

**Conventional Commit Format:**

```
type(scope): description

[optional body]

[optional footer]
```

**Supported commit types:**

```bash
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation changes
style:    # Code style changes (formatting, etc.)
refactor: # Code refactoring
perf:     # Performance improvements
test:     # Adding or updating tests
build:    # Build system changes
ci:       # CI/CD changes
chore:    # Maintenance tasks
revert:   # Revert previous commit
```

**Example rules it enforces:**

```bash
# Type rules
type-enum: [feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert]
type-case: lower-case
type-empty: never

# Subject rules
subject-case: never [sentence-case, start-case, pascal-case, upper-case]
subject-empty: never
subject-full-stop: never (no period at end)
header-max-length: 100 characters

# Scope rules (optional)
scope-case: lower-case
```

### 🎯 **`commitizen`**

**What it does:** An interactive CLI tool that helps you write proper
conventional commits.

- **Interactive prompts**: Guides you through creating well-formed commits
- **Type selection**: Shows available commit types to choose from
- **Scope prompts**: Helps identify what part of codebase changed
- **Message building**: Constructs properly formatted commit messages
- **Error prevention**: Prevents malformed commits by design

**Interactive workflow example:**

```bash
$ git cz  # or npm run commit

? Select the type of change that you're committing:
❯ feat:     A new feature
  fix:      A bug fix
  docs:     Documentation only changes
  style:    Changes that do not affect the meaning of the code
  refactor: A code change that neither fixes a bug nor adds a feature
  perf:     A code change that improves performance
  test:     Adding missing tests or correcting existing tests

? What is the scope of this change (e.g. component or file name): auth

? Write a short, imperative tense description of the change:
add user authentication with OAuth

? Provide a longer description of the change: (press enter to skip)
Implemented OAuth authentication flow with Google and GitHub providers.
Added login/logout functionality and user session management.

? Are there any breaking changes? No

? Does this change affect any open issues? Yes

? Add issue references (e.g. "fix #123", "re #123"): closes #45

# Results in this commit message:
feat(auth): add user authentication with OAuth

Implemented OAuth authentication flow with Google and GitHub providers.
Added login/logout functionality and user session management.

Closes #45
```

### 🎨 **`cz-conventional-changelog`**

**What it does:** A Commitizen adapter that specifically implements Conventional
Commits format.

- **Commitizen adapter**: Tells Commitizen how to format conventional commits
- **Prompt configuration**: Defines the questions and flow for commit creation
- **Validation**: Ensures generated commits follow conventional format
- **Changelog compatibility**: Creates commits that work well with changelog
  generators

**Configuration in package.json:**

```json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

**What it provides:**

```bash
# Structured prompts for:
- Commit type selection (feat, fix, docs, etc.)
- Scope definition (optional)
- Short description (required)
- Long description (optional)
- Breaking changes (optional)
- Issue references (optional)

# Generates properly formatted commits like:
feat(ui): add dark mode toggle

Added dark mode support with theme persistence in localStorage.
Theme preference is now remembered across browser sessions.

BREAKING CHANGE: CSS custom properties structure has changed
Closes #23
```

---

## How They Work Together

### **1. Development Workflow**

```bash
# Instead of regular git commit
git add .
git cz  # Interactive commit creation

# Commitizen (cz-conventional-changelog) guides you through:
# - Selecting type
# - Adding scope
# - Writing description
# - Adding details

# Creates a well-formed commit message
```

### **2. Validation Process**

```bash
# When you commit (with git hooks):
git commit -m "feat(auth): add login"

# Commitlint validates the message:
# ✅ Type is valid (feat)
# ✅ Scope is present (auth)
# ✅ Description follows rules
# ✅ No formatting issues

# If invalid, commit is rejected with helpful error
```

### **3. Integration Setup**

```json
{
  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

**Git hooks (with Lefthook):**

```yaml
commit-msg:
  commands:
    commitlint:
      run: npx commitlint --edit $1
```

---

## Benefits of Using These Tools

### **✅ Consistency**

```bash
# Without tools - inconsistent messages:
"fix stuff"
"Added new feature"
"BUGFIX: login issue"
"refactor(auth): improve performance"

# With tools - consistent format:
"fix(auth): resolve login validation issue"
"feat(ui): add user dashboard"
"refactor(auth): improve authentication performance"
"docs(readme): update installation instructions"
```

### **✅ Automation-Friendly**

```bash
# Enables automatic changelog generation:
feat(auth): add OAuth support        → Features section
fix(ui): resolve mobile layout      → Bug Fixes section
BREAKING CHANGE: API restructure     → Breaking Changes section

# Enables semantic versioning:
feat: new feature     → Minor version bump (1.1.0 → 1.2.0)
fix: bug fix         → Patch version bump (1.1.0 → 1.1.1)
BREAKING CHANGE:     → Major version bump (1.1.0 → 2.0.0)
```

### **✅ Better Collaboration**

```bash
# Clear history for team members:
git log --oneline
feat(search): add fuzzy search functionality
fix(api): handle rate limiting properly
docs(contributing): add development setup guide
test(auth): add integration tests for login flow
```

### **✅ Enhanced Git History**

- **Searchable commits**: Easy to find specific types of changes
- **Clear categorization**: Features vs fixes vs documentation
- **Automated tooling**: Changelog generation, release notes
- **Better code reviews**: Understand changes at a glance

---

## Setup Guide

### **Installation**

```bash
# Install all packages
pnpm add -D @commitlint/cli @commitlint/config-conventional commitizen cz-conventional-changelog

# Or install individually
pnpm add -D @commitlint/cli
pnpm add -D @commitlint/config-conventional
pnpm add -D commitizen
pnpm add -D cz-conventional-changelog
```

### **Configuration Files**

**commitlint.config.js:**

```javascript
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
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
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
  },
};
```

**package.json additions:**

```json
{
  "scripts": {
    "commit": "git-cz",
    "commit:retry": "git-cz --retry"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

**lefthook.yml (Git hooks):**

```yaml
commit-msg:
  commands:
    commitlint:
      run: npx commitlint --edit $1
```

### **Usage Commands**

```bash
# Interactive commit creation
pnpm commit
# or
git cz

# Retry last commit message (if failed)
pnpm commit:retry

# Manual commit (still gets validated)
git commit -m "feat(ui): add dark mode"

# Validate a commit message manually
echo "feat(auth): add login" | npx commitlint

# Validate the last commit
npx commitlint --from HEAD~1 --to HEAD --verbose
```

---

## Real-World Examples

### **Wine Buddy Project Examples**

#### **Feature Additions**

```bash
feat(scan): add wine label recognition
feat(favorites): implement wine collection management
feat(auth): add user authentication with OAuth
feat(ui): add dark mode toggle
feat(search): implement fuzzy wine search
```

#### **Bug Fixes**

```bash
fix(ui): resolve wine card layout on mobile
fix(api): handle wine data loading errors
fix(search): improve wine search accuracy
fix(scan): resolve camera permission issues
fix(auth): fix session timeout handling
```

#### **Documentation**

```bash
docs(readme): update setup instructions
docs(api): add wine scanning endpoint documentation
docs(contributing): add development guidelines
docs(deployment): add production deployment guide
```

#### **Refactoring**

```bash
refactor(components): extract reusable wine card component
refactor(hooks): simplify wine data fetching logic
refactor(auth): restructure authentication flow
refactor(api): optimize wine data service layer
```

#### **Testing**

```bash
test(scan): add unit tests for wine recognition
test(auth): add integration tests for login flow
test(ui): add component tests for wine cards
test(api): add endpoint validation tests
```

#### **Chores & Maintenance**

```bash
chore(deps): update React to latest version
chore(build): optimize production bundle size
chore(config): update ESLint configuration
chore(ci): add automated testing pipeline
```

#### **Performance Improvements**

```bash
perf(scan): optimize image processing speed
perf(ui): implement virtual scrolling for wine lists
perf(api): add caching for wine data requests
perf(build): reduce bundle size by 30%
```

#### **Breaking Changes**

```bash
feat(api): restructure wine data schema

BREAKING CHANGE: Wine data structure has changed.
- `wine.vintage` is now `wine.year`
- `wine.description` is now `wine.notes`
- `wine.imageUrl` is now `wine.image.url`

Migration guide: Update all wine data references to use new schema.
```

---

## Advanced Configuration

### **Custom Commit Types**

```javascript
// commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        // Standard types
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        // Custom types for Wine Buddy
        'wine', // Wine-specific features
        'scan', // Scanning functionality
        'ui', // UI-specific changes
        'data', // Data structure changes
      ],
    ],
  },
};
```

### **Scopes for Wine Buddy**

```bash
# Common scopes for Wine Buddy project
feat(auth): add user authentication
feat(scan): implement wine label detection
feat(favorites): add wine collection
feat(search): implement wine search
feat(ui): add responsive design
feat(api): add wine data endpoints
feat(pwa): add offline support
feat(gamification): add wine badges
```

### **Integration with Changelog Generation**

```json
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
    "version": "conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md"
  }
}
```

---

## Troubleshooting

### **Common Issues**

#### **Commitlint not running**

```bash
# Check if lefthook is installed
npx lefthook run commit-msg

# Reinstall git hooks
npx lefthook install
```

#### **Commitizen not working**

```bash
# Ensure config is in package.json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}

# Try running directly
npx git-cz
```

#### **Invalid commit format**

```bash
# Common mistakes:
"Feat: add new feature"     # ❌ Capital F
"feat:add new feature"      # ❌ Missing space after colon
"feat(UI): add component"   # ❌ Capital scope
"feat(auth):add login"      # ❌ Missing space

# Correct format:
"feat(auth): add login"     # ✅
```

### **Best Practices**

1. **Use imperative mood**: "add feature" not "added feature"
2. **Keep subject line under 50 characters** when possible
3. **Use body to explain what and why**, not how
4. **Reference issues in footer**: "Closes #123"
5. **Use breaking change footer** for breaking changes

---

## Benefits Summary

| Tool                              | Purpose                            | Benefit                                    |
| --------------------------------- | ---------------------------------- | ------------------------------------------ |
| `@commitlint/cli`                 | Validates commit messages          | Prevents bad commits from entering history |
| `@commitlint/config-conventional` | Provides conventional commit rules | Ensures consistent format across team      |
| `commitizen`                      | Interactive commit creation        | Guides developers to write good commits    |
| `cz-conventional-changelog`       | Conventional commits adapter       | Structures commits for automation          |

### **Project Impact**

- **📈 Better git history**: Clear, searchable, and meaningful
- **🤖 Automation ready**: Changelog and version generation
- **👥 Team consistency**: Everyone follows the same format
- **🔍 Enhanced debugging**: Easy to find when issues were introduced
- **📝 Improved documentation**: Commits serve as project documentation

These tools transform your commit messages from chaotic notes into structured,
meaningful project history that enables automation, better collaboration, and
clearer communication about changes!
