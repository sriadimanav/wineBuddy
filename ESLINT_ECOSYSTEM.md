# ESLint Ecosystem Documentation

## Overview

This document explains the ESLint packages and tools used in modern
TypeScript/React projects, based on the specific versions in your Wine Buddy
project.

---

## Core ESLint Packages

### 🔍 **`eslint`** (v9.33.0)

**What it does:** The main ESLint engine that analyzes your
JavaScript/TypeScript code for problems.

- **Core functionality**: Parses code, applies rules, reports issues
- **Problem detection**: Finds bugs, style issues, and problematic patterns
- **Configurable**: Extensible through plugins and custom rules
- **Auto-fixing**: Can automatically fix many issues

**Example of what it catches:**

```javascript
// ESLint will catch these issues:
var unusedVariable = 'hello';     // ❌ Unused variable
if (true) return;                 // ❌ Missing curly braces
const obj = { a: 1, a: 2 };      // ❌ Duplicate object keys
function test() {                 // ❌ Missing return statement
  console.log('test');
}
```

### 🔧 **`@eslint/js`** (v9.33.0)

**What it does:** Provides ESLint's built-in JavaScript rule configurations.

- **Recommended configs**: Pre-configured rule sets for common scenarios
- **Built-in rules**: Core JavaScript linting rules
- **Foundation**: Base layer for other configurations

**Example usage:**

```javascript
import js from '@eslint/js';

export default [
  js.configs.recommended, // Uses ESLint's recommended JavaScript rules
  // Your custom config here
];
```

---

## TypeScript Integration

### 🔍 **`@typescript-eslint/parser`** (v8.39.1)

**What it does:** Tells ESLint how to read and understand TypeScript syntax.

- **Default behavior**: ESLint can only parse plain JavaScript by default
- **Problem**: TypeScript has syntax that JavaScript doesn't have (interfaces,
  type annotations, generics, etc.)
- **Solution**: This parser converts TypeScript code into a format ESLint can
  understand

**Example of what it handles:**

```typescript
// Without the parser, ESLint would throw errors on this TypeScript syntax:
interface User {
  name: string;
  age: number;
}

const user: User = { name: 'John', age: 30 };
function greet<T>(item: T): T {
  return item;
}
type Status = 'loading' | 'success' | 'error';
```

### 🔧 **`@typescript-eslint/eslint-plugin`** (v8.39.1)

**What it does:** Provides TypeScript-specific ESLint rules.

- **Adds new rules** specifically designed for TypeScript
- **Replaces JavaScript rules** with TypeScript-aware versions
- **Provides type-aware linting** (rules that understand your types)

**Example rules it provides:**

```typescript
// @typescript-eslint/no-unused-vars - better than the JS version
const unusedVar = 'hello'; // ❌ Will catch this

// @typescript-eslint/no-explicit-any - discourages 'any' type
const data: any = getData(); // ⚠️ Will warn about this

// @typescript-eslint/prefer-const - suggests const when possible
let name = 'John'; // 💡 Suggests using 'const' instead

// @typescript-eslint/no-non-null-assertion - warns about ! operator
const value = getValue()!; // ⚠️ Warns about potential runtime error
```

---

## React Ecosystem

### ⚛️ **`eslint-plugin-react`** (v7.37.5)

**What it does:** Provides React-specific linting rules for JSX and React
patterns.

- **JSX validation**: Ensures proper JSX syntax and usage
- **React best practices**: Enforces React coding standards
- **Component rules**: Rules for React component patterns

**Example rules it provides:**

```jsx
// react/jsx-uses-vars - ensures JSX variables are marked as used
const Button = () => <button>Click</button>; // ✅ Used in JSX

// react/jsx-key - requires keys in lists
{items.map(item => <div>{item.name}</div>)} // ❌ Missing key
{items.map(item => <div key={item.id}>{item.name}</div>)} // ✅ Has key

// react/no-unescaped-entities - prevents unescaped entities
<div>Don't do this</div> // ❌ Unescaped apostrophe
<div>Don&apos;t do this</div> // ✅ Properly escaped
```

### 🪝 **`eslint-plugin-react-hooks`** (v5.2.0)

**What it does:** Enforces the Rules of Hooks for React Hooks usage.

- **Hook rules**: Ensures hooks are called correctly
- **Dependency arrays**: Validates useEffect dependencies
- **Hook order**: Prevents conditional hook calls

**Example rules it provides:**

```jsx
// react-hooks/rules-of-hooks - hooks must be called in the same order
function Component({ condition }) {
  if (condition) {
    const [state] = useState(); // ❌ Conditional hook call
  }

  const [state] = useState();   // ✅ Always called

  return <div>{state}</div>;
}

// react-hooks/exhaustive-deps - validates useEffect dependencies
function Component({ userId }) {
  useEffect(() => {
    fetchUser(userId);
  }, []); // ❌ Missing userId dependency

  useEffect(() => {
    fetchUser(userId);
  }, [userId]); // ✅ Complete dependencies
}
```

### 🔄 **`eslint-plugin-react-refresh`** (v0.4.20)

**What it does:** Ensures React Fast Refresh works correctly with your
components.

- **Fast Refresh compatibility**: Validates components for hot reloading
- **Export rules**: Ensures proper component exports
- **HMR optimization**: Improves development experience

**Example rules it provides:**

```jsx
// react-refresh/only-export-components - only export React components
export const data = { name: 'John' }; // ❌ Non-component export
export const Component = () => <div>Hello</div>; // ✅ Component export

// Ensures components are properly named for Fast Refresh
const component = () => <div>Hello</div>; // ❌ Lowercase name
const Component = () => <div>Hello</div>; // ✅ PascalCase name
```

---

## Import Management

### 📦 **`eslint-plugin-import`** (v2.32.0)

**What it does:** Provides rules for ES6+ import/export statements and module
dependencies.

- **Import validation**: Ensures imported modules exist
- **Export checking**: Validates export statements
- **Dependency management**: Prevents circular dependencies
- **Import organization**: Controls import structure and ordering

**Example rules it provides:**

```javascript
// import/no-unresolved - ensures imported modules exist
// ❌ Module not found
// import/no-duplicates - prevents duplicate imports
import { useState } from 'react';
import { useEffect } from 'react';
// ❌ CSS imports should be last
import React from 'react';

import { something } from './non-existent-file';
// ❌ Should combine these

// import/order - enforces import ordering
import './styles.css';

// ❌ React should be first

// import/no-cycle - prevents circular dependencies
// file-a.js imports file-b.js which imports file-a.js ❌
```

### 🔗 **`eslint-import-resolver-typescript`** (v4.4.4)

**What it does:** Teaches eslint-plugin-import how to resolve TypeScript imports
and path mappings.

- **Path mapping**: Understands tsconfig.json path aliases
- **TypeScript resolution**: Resolves .ts/.tsx files
- **Module resolution**: Follows TypeScript's resolution algorithm

**Example of what it resolves:**

```typescript
// These TypeScript patterns work with the resolver:
import { User } from '@/types/user';

// ✅ Understands path mapping
import { Button } from '@components/ui';

// ✅ Knows about .ts extension
import type { Config } from './config';
// ✅ Understands aliases
import { utils } from './utils';

// ✅ Understands type imports
```

---

## Code Formatting Integration

### 🎨 **`prettier`** (v3.6.2)

**What it does:** Automatically formats your code to ensure consistent style.

- **Code formatting**: Handles indentation, spacing, line breaks
- **Style consistency**: Ensures uniform code appearance
- **Opinionated**: Makes style decisions so you don't have to

**Example of what it formats:**

```javascript
// Before Prettier
const obj={name:'John',age:30,city:'New York'}
function test(a,b,c){return a+b+c}

// After Prettier
const obj = {
  name: 'John',
  age: 30,
  city: 'New York',
};
function test(a, b, c) {
  return a + b + c;
}
```

### 💅 **`eslint-plugin-prettier`** (v5.5.4)

**What it does:** Integrates Prettier with ESLint as a linting rule.

- **Formatting as linting**: Treats formatting issues as ESLint errors
- **Integration**: Combines ESLint and Prettier workflows
- **Auto-fixing**: Can fix formatting issues through ESLint

**Example usage:**

```javascript
// Shows Prettier formatting issues as ESLint errors
const badlyFormatted = { name: 'John', age: 30 }; // ❌ ESLint error: Prettier formatting

// ESLint --fix will apply Prettier formatting
```

### 🤝 **`eslint-config-prettier`** (v10.1.8)

**What it does:** Disables all ESLint rules that conflict with Prettier.

- **Conflict resolution**: Turns off formatting rules that clash with Prettier
- **Compatibility**: Ensures ESLint and Prettier work together
- **Clean separation**: ESLint handles logic, Prettier handles formatting

**Example of conflicts it resolves:**

```javascript
// These ESLint rules would conflict with Prettier:
'semi': 'error',              // ❌ Conflicts with Prettier's semicolon handling
'quotes': 'error',            // ❌ Conflicts with Prettier's quote handling
'indent': 'error',            // ❌ Conflicts with Prettier's indentation

// eslint-config-prettier disables these automatically
```

---

## Compatibility & Migration

### 🔄 **`@eslint/compat`** (v1.3.2)

**What it does:** Provides compatibility utilities for migrating from legacy
ESLint configs to flat config.

- **Legacy support**: Helps use old-style configs in new flat config
- **Plugin fixup**: Converts legacy plugins to flat config format
- **Migration bridge**: Eases transition to new ESLint format

**Example usage:**

```javascript
import { fixupPluginRules, fixupConfigRules } from '@eslint/compat';

// Fix legacy plugins
plugins: {
  react: fixupPluginRules(react), // Converts legacy plugin format
}

// Fix legacy configs
...fixupConfigRules(compat.extends('some-legacy-config'))
```

### 📋 **`@eslint/eslintrc`** (v3.3.1)

**What it does:** Provides the FlatCompat utility for converting .eslintrc
configs to flat config.

- **Config conversion**: Converts old .eslintrc style to flat config
- **Community config support**: Use community configs that haven't migrated yet
- **Backward compatibility**: Bridge between old and new config formats

**Example usage:**

```javascript
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Convert legacy configs
...compat.extends('plugin:react/recommended')
```

### 🌍 **`globals`** (v16.3.0)

**What it does:** Provides definitions for global variables in different
environments.

- **Environment globals**: Defines browser, Node.js, and other environment
  globals
- **Prevents errors**: Stops ESLint from complaining about legitimate globals
- **Environment detection**: Knows which globals exist in which environments

**Example usage:**

```javascript
import globals from 'globals';

languageOptions: {
  globals: {
    ...globals.browser,    // window, document, console, etc.
    ...globals.node,       // process, __dirname, Buffer, etc.
    ...globals.es2022,     // Promise, Set, Map, etc.
  }
}
```

---

## Community Extensions

### 💬 **`@eslint-community/eslint-plugin-eslint-comments`** (v4.5.0)

**What it does:** Provides rules for ESLint directive comments (like
`// eslint-disable`).

- **Comment validation**: Ensures ESLint directives are used correctly
- **Unused directives**: Finds unnecessary eslint-disable comments
- **Best practices**: Enforces good practices for ESLint comments

**Example rules it provides:**

```javascript
// @eslint-community/eslint-comments/no-unused-disable
// eslint-disable-next-line no-console
const x = 1; // ❌ Unused disable directive

// @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable no-console */
console.log('test');
// ❌ Missing eslint-enable comment
```

---

## Development Workflow (Legacy)

### 🐕 **`husky`** (v9.1.7)

**What it does:** Manages Git hooks to run scripts before commits, pushes, etc.

- **Git hook management**: Installs and manages Git hooks
- **Pre-commit checks**: Run linting/testing before commits
- **Workflow automation**: Automates quality checks

**Example usage:**

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm test"
    }
  }
}
```

### 🎭 **`lint-staged`** (v16.1.5)

**What it does:** Runs linters only on Git staged files for faster feedback.

- **Staged files only**: Only lints files you're about to commit
- **Performance**: Faster than linting entire codebase
- **Integration**: Works with husky for pre-commit hooks

**Example usage:**

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

---

## Package Relationships

### 🤝 **How They Work Together**

1. **ESLint** analyzes your code using **TypeScript parser** and **plugins**
2. **Import resolver** helps ESLint understand your TypeScript imports
3. **Prettier** formats your code consistently
4. **Config packages** ensure ESLint and Prettier don't conflict
5. **Compat packages** help migrate to modern ESLint flat config
6. **Git hooks** (husky + lint-staged) run checks before commits

### 📊 **Dependency Flow**

```
eslint (core)
├── @eslint/js (built-in configs)
├── @typescript-eslint/parser (TypeScript parsing)
├── @typescript-eslint/eslint-plugin (TypeScript rules)
├── eslint-plugin-react (React rules)
├── eslint-plugin-react-hooks (Hook rules)
├── eslint-plugin-react-refresh (Fast Refresh rules)
├── eslint-plugin-import (Import/export rules)
│   └── eslint-import-resolver-typescript (TypeScript resolution)
├── prettier (code formatting)
├── eslint-plugin-prettier (Prettier integration)
├── eslint-config-prettier (conflict resolution)
├── @eslint/compat (legacy compatibility)
├── @eslint/eslintrc (config conversion)
├── globals (environment globals)
├── @eslint-community/eslint-plugin-eslint-comments (comment rules)
├── husky (Git hooks)
└── lint-staged (staged file processing)
```

---

## Modern vs Legacy

### ✅ **Modern Approach (Recommended)**

- Use **Lefthook** instead of Husky (faster, more reliable)
- Use **flat config** instead of .eslintrc
- Use **native plugin formats** when available

### ⚠️ **Legacy Support**

- **Husky + lint-staged** still work but Lefthook is better
- **@eslint/compat** helps bridge old configs to new flat config
- **fixupPluginRules** converts legacy plugins

---

## Quick Reference

### 🚀 **Essential Commands**

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Run all checks
npm run validate
```

### 📝 **Key Files**

- `eslint.config.js` - Main ESLint configuration
- `prettier.config.js` - Prettier configuration
- `.editorconfig` - Cross-editor settings
- `lefthook.yml` - Git hooks configuration
- `tsconfig.json` - TypeScript configuration (affects ESLint)

This ecosystem provides comprehensive code quality, formatting, and workflow
automation for modern TypeScript/React projects!
