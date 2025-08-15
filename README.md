# Wine Buddy 🍷

A modern Progressive Web App for wine discovery, scanning, and collection
management built with React 19, TypeScript, and TanStack Router.

**Author**: Aditya Srivastava  
**Repository**: https://github.com/sriadimanav/wineBuddy  
**License**: MIT

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Guide](#development-guide)
- [Styling System](#styling-system)
- [State Management](#state-management)
- [Routing](#routing)
- [PWA Features](#pwa-features)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

Wine Buddy is a comprehensive wine discovery platform that allows users to:

- Scan wine labels using their device camera
- Build and manage their wine collection
- Discover new wines with personalized recommendations
- Track tasting notes and food pairings
- Earn achievements through gamification
- Access detailed wine information and sommelier notes

## ✨ Features

### Core Features

- 📷 **Wine Scanning**: AI-powered label recognition
- 🍷 **Wine Database**: Comprehensive wine information
- ❤️ **Favorites Management**: Save and organize wines
- 🔍 **Discovery**: Trending wines and recommendations
- 📝 **Tasting Notes**: Personal wine reviews and notes
- 🍽️ **Food Pairings**: Curated pairing suggestions

### User Experience

- 🏆 **Gamification**: Achievements, badges, and streaks
- 👤 **User Profiles**: Personal wine journey tracking
- 📱 **Responsive Design**: Mobile, tablet, desktop, kiosk
- 🌙 **Progressive Web App**: Offline support and installation
- 🎨 **Wine-themed UI**: Beautiful, consistent design system

### Technical Features

- ⚡ **Fast Performance**: Vite build system
- 🔒 **Type Safety**: Full TypeScript coverage
- 📐 **Scalable Architecture**: Feature-based organization
- 🎭 **Error Handling**: Comprehensive error boundaries
- 🔄 **State Management**: React hooks and context

## 🛠️ Tech Stack

| Category     | Technology                                 |
| ------------ | ------------------------------------------ |
| **Frontend** | React 19, TypeScript, Vite 7               |
| **Routing**  | TanStack Router (file-based)               |
| **Styling**  | Tailwind CSS v4, CSS Custom Properties     |
| **State**    | React Hooks, TanStack Query, Local Storage |
| **Icons**    | Lucide React                               |
| **PWA**      | Service Workers, Web Manifest              |
| **Build**    | Vite, TypeScript, ESLint, pnpm             |
| **Testing**  | Vitest, Testing Library                    |

## 📁 Project Structure

```
src/
├── components/              # React components
│   ├── features/           # Feature-specific components
│   │   ├── auth/          # Authentication
│   │   ├── home/          # Dashboard
│   │   ├── scan/          # Wine scanning
│   │   ├── favorites/     # Collection management
│   │   ├── wineDetail/    # Wine information
│   │   └── profile/       # User profile
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   └── hooks/             # Custom React hooks
├── routes/                 # TanStack Router routes
├── styles/                 # CSS and theme system
├── theme/                  # Design system configuration
├── ts/                     # TypeScript type definitions
├── constants/              # Application constants
├── utils/                  # Utility functions
└── config/                 # App configuration
```

For detailed structure documentation, see
[FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md).

## 🎯 Project Configuration

### Package Manager

This project uses **pnpm** (Performant NPM) for faster installations and better
disk space efficiency.

```bash
# Verify versions
node --version  # Should be 22.18.0
pnpm --version  # Should be 10.14.0+
```

### Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
// Instead of: ../../../components/ui/Button
// Available aliases:
// src/styles/*
import route from '@routes/...';
// src/ts/*
import style from '@styles/...';

import something from '@/...';

// src/*
import Component from '@components/...';
import { Button } from '@components/ui/Button';

// src/components/*
import type from '@ts/...';

// src/routes/*
```

### Development Tools

- **Vite 7**: Fast build tool with HMR
- **TanStack Router**: File-based routing with TypeScript
- **Tailwind CSS v4**: Utility-first CSS framework
- **Vitest**: Fast unit testing
- **PWA Plugin**: Service worker and manifest generation

## 🚀 Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd wine-buddy
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm run dev
   ```

4. **Open your browser** Navigate to `http://localhost:5173`

### Environment Setup

Create a `.env.local` file for local development:

```env
# Development flags
VITE_DEV_MODE=true
VITE_ENABLE_MOCK_DATA=true

# API endpoints (when available)
VITE_API_BASE_URL=http://localhost:3001

# PWA settings
VITE_PWA_ENABLED=true
```

## 👨‍💻 Development Guide

### Adding New Features

1. **Create feature folder structure**

   ```
   src/components/features/newFeature/
   ├── NewFeatureScreen.tsx      # Main component
   ├── components/               # Sub-components
   ├── hooks/                    # Feature hooks
   ├── utils/                    # Feature utilities
   └── index.ts                  # Exports
   ```

2. **Add TypeScript types**

   ```typescript
   // src/ts/newFeature.ts
   export interface NewFeatureProps {
     // Define props
   }
   ```

3. **Create route**

   ```typescript
   // src/routes/newFeature.tsx
   export const Route = createFileRoute('/newFeature')({
     component: NewFeatureScreen,
   });
   ```

4. **Add navigation** Update `BottomNav.tsx` or relevant navigation components.

### Component Guidelines

**Naming Conventions**

- Components: `PascalCase` (e.g., `WineCard.tsx`)
- Hooks: `camelCase` with `use` prefix (e.g., `useWineData.ts`)
- Utilities: `camelCase` (e.g., `wineUtils.ts`)
- Types: `PascalCase` with descriptive names

**Component Structure**

```typescript
// Component imports
import React from 'react';
import { SomeIcon } from 'lucide-react';

// Type imports
import type { ComponentProps } from '@ts/index';

// Utility imports
import { wineClasses } from '@/utils/theme-utils';

interface Props extends ComponentProps {
  customProp: string;
}

export function ComponentName({ customProp, ...props }: Props) {
  // Hooks
  const [state, setState] = useState();

  // Event handlers
  const handleClick = () => {
    // Handle event
  };

  // Render
  return (
    <div className={wineClasses.card.default}>
      {/* Component content */}
    </div>
  );
}
```

### Custom Hooks Patterns

```typescript
// src/components/features/example/useExampleData.ts
export const useExampleData = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch logic
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
```

## 🎨 Styling System

### Theme Usage

```typescript
import { wineClasses, wineColors } from '@/utils/theme-utils';

// Using predefined classes
<button className={wineClasses.button.primary}>
  Click me
</button>

// Using theme colors
<div style={{ backgroundColor: wineColors.wine('accent') }}>
  Wine accent background
</div>
```

### Custom Components

```css
/* Custom component styles */
.wine-custom-component {
  background-color: var(--color-wine-accent);
  color: var(--color-accent-foreground);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  box-shadow: var(--shadow-wine-soft);
}
```

### Responsive Design

```typescript
// Using responsive utilities
<div className="mobile-grid-1 tablet-grid-2 desktop-grid-3 kiosk-grid-4">
  {/* Responsive grid */}
</div>

// Using breakpoint hooks
const { screenSize } = useScreenSize();
const isMobile = screenSize === 'mobile';
```

## 🔄 State Management

### Local Component State

```typescript
const [wines, setWines] = useState<Wine[]>([]);
```

### Custom Hooks for Feature State

```typescript
const { favoriteWines, toggleFavorite } = useFavorites(user);
```

### Global State with Context

```typescript
const { user, updateUser } = useAuth();
```

### Persistent State

```typescript
// Using auth service for user data
authService.saveUser(userData);
const user = authService.getUser();
```

## 🛣️ Routing

### File-based Routing

Routes are automatically generated from the `routes/` folder structure:

```
routes/
├── __root.tsx              # Layout wrapper
├── index.tsx               # / (home)
├── auth.tsx                # /auth
├── favorites.tsx           # /favorites
├── profile.tsx             # /profile
├── scan.tsx                # /scan
└── wine/
    └── $id.tsx             # /wine/[id]
```

### Route Protection

```typescript
// In route files
export const Route = createFileRoute('/protected')({
  beforeLoad: () => {
    requireAuth(); // Route guard
  },
  component: ProtectedComponent,
});
```

### Navigation

```typescript
import { useNavigate } from '@tanstack/react-router';

const navigate = useNavigate();

// Navigate to route
navigate({ to: '/wine/$id', params: { id: wineId } });
```

## 📱 PWA Features

### Service Worker

- Automatic registration in production
- Offline caching strategies
- Background sync capabilities

### Installation

- Install prompts on supported devices
- App icon and splash screen configuration
- Standalone mode optimizations

### Offline Support

- Cached resources for offline viewing
- Graceful degradation when offline
- Sync data when connection restored

## 🧪 Testing

### Running Tests

```bash
# Run unit tests
pnpm run test

# Run tests in watch mode
pnpm run test -- --watch

# Run tests with coverage
pnpm run test -- --coverage

# Type checking
pnpm run type-check

# Lint code
pnpm run lint

# Fix linting issues
pnpm run lint-fix

# Format code
pnpm run format

# Check formatting
pnpm run format:check

# Run all validations
pnpm run validate
```

### Testing Patterns

```typescript
// Component testing example
import { render, screen } from '@testing-library/react';
import { WineCard } from './WineCard';

test('renders wine card with correct information', () => {
  const mockWine = { /* mock data */ };
  render(<WineCard wine={mockWine} />);

  expect(screen.getByText(mockWine.name)).toBeInTheDocument();
});
```

## 🚀 Deployment

### Build for Production

```bash
pnpm run build
```

### Preview Production Build

```bash
pnpm run preview
```

### Bundle Analysis

```bash
# Analyze bundle with automatic port
pnpm run analyze:auto-port

# Analyze bundle on specific port
pnpm run analyze

# Generate JSON analysis report
pnpm run analyze:json
```

### Deployment Checklist

- [ ] Environment variables configured
- [ ] PWA manifest updated
- [ ] Service worker functioning
- [ ] Performance optimized
- [ ] Error tracking enabled

## 🤝 Contributing

### Development Workflow

1. **Create feature branch**

   ```bash
   git checkout -b feature/wine-rating-system
   ```

2. **Make changes following conventions**
   - Use TypeScript for all new code
   - Follow existing component patterns
   - Add appropriate error handling
   - Update types as needed

3. **Test your changes**

   ```bash
   pnpm run test
   pnpm run build
   pnpm run validate
   ```

4. **Submit pull request**
   - Clear description of changes
   - Screenshots for UI changes
   - Updated documentation if needed

### Code Quality Standards

- **TypeScript**: Strict mode enabled with comprehensive path aliases
- **ESLint**: TanStack configuration with custom rules
- **Prettier**: Automated formatting with import sorting
- **Components**: Functional components with hooks
- **Error Handling**: Comprehensive error boundaries
- **Performance**: Optimized for mobile devices
- **PWA**: Full Progressive Web App support

### Development Scripts

```bash
# Development
pnpm run dev          # Start dev server on port 3000
pnpm run start        # Alias for dev

# Build & Preview
pnpm run build        # Build for production (includes TypeScript compilation)
pnpm run preview      # Preview production build on port 3001
pnpm run serve        # Serve built files

# Code Quality
pnpm run lint         # Lint code
pnpm run lint-fix     # Fix linting issues
pnpm run format       # Format code with Prettier
pnpm run format:check # Check if code is formatted
pnpm run type-check   # TypeScript type checking
pnpm run validate     # Run all checks (type, lint, format, test)

# Testing
pnpm run test         # Run tests with Vitest

# Utilities
pnpm run clean        # Clean all generated files
pnpm run clean:cache  # Clean cache only
pnpm run analyze      # Bundle size analysis
```

### Git Conventions

```
feat: add wine rating system
fix: resolve scanning camera permissions
docs: update API documentation
style: improve wine card hover effects
refactor: extract wine data service
test: add wine search functionality tests
```

## 📚 Additional Resources

- [TanStack Router Documentation](https://tanstack.com/router)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [PWA Documentation](https://web.dev/progressive-web-apps)

## 📄 License

[MIT License](LICENSE) - see the LICENSE file for details.

## 🔧 Troubleshooting

### Common Issues

**Build Errors**

```bash
# Clear node modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Clean cache
pnpm run clean:cache

# Full clean
pnpm run clean
```

**TypeScript Errors**

```bash
# Generate route types and check
pnpm run type-check

# Watch for type errors
pnpm run type-check:watch
```

**PWA Not Working**

- Check service worker registration
- Verify manifest.json configuration
- Test in production build

**Camera Permissions**

- Ensure HTTPS in production
- Check browser compatibility
- Verify camera API support

---

**Happy coding! 🍷✨**

For questions or support, please check the documentation or create an issue in
the repository.
