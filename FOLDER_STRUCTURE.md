# Wine Buddy - Folder Structure Documentation

## Overview

Wine Buddy is a React-based Progressive Web App (PWA) for wine discovery and collection management. The application follows a modular, feature-based architecture with TypeScript, TanStack Router, and Tailwind CSS.

## Project Architecture

```
src/
├── components/                 # Reusable components and feature modules
│   ├── features/              # Feature-specific components
│   │   ├── auth/              # Authentication & user management
│   │   ├── faq/               # FAQ and help system
│   │   ├── favorites/         # Wine favorites management
│   │   ├── home/              # Home screen components
│   │   ├── onboarding/        # User onboarding flow
│   │   ├── profile/           # User profile management
│   │   ├── root/              # Root-level app components
│   │   ├── scan/              # Wine scanning functionality
│   │   └── wineDetail/        # Wine detail views
│   ├── hooks/                 # Custom React hooks
│   ├── layout/                # Layout components
│   ├── pwa/                   # Progressive Web App utilities
│   ├── ui/                    # Base UI components
│   └── utils/                 # Component utilities
├── constants/                 # Application constants
├── routes/                    # TanStack Router route definitions
├── styles/                    # CSS and styling system
├── theme/                     # Theme configuration
├── ts/                        # TypeScript type definitions
├── utils/                     # General utilities
├── config/                    # Application configuration
└── main.tsx                   # Application entry point
```

## Detailed Structure

### 🎯 Components (`/components`)

#### Features (`/components/features`)

Each feature follows a consistent structure with components, hooks, and utilities:

**Authentication (`/auth`)**

- `AuthScreen.tsx` - Main authentication interface
- `AuthForm.tsx` - Login/signup form component
- `AuthHeader.tsx` - Authentication screen header
- `authService.ts` - Authentication service layer
- `authGuards.ts` - Route protection guards
- `useAuthForm.ts` - Form state management hook

**Home (`/home`)**

- `HomeScreen.tsx` - Main dashboard interface
- `FeaturedWinesSection.tsx` - Featured wines display
- `TrendingWinesSection.tsx` - Trending wines carousel
- `GamificationSection.tsx` - User achievements and stats
- `QuickScanCTA.tsx` - Quick scan call-to-action
- `useHomeActions.ts` - Home screen actions hook
- `wineDataService.ts` - Wine data management

**Favorites (`/favorites`)**

- `FavoritesScreen.tsx` - Favorites management interface
- `WineCard.tsx` - Wine card component (list view)
- `WineGridCard.tsx` - Wine card component (grid view)
- `EditModeActionBar.tsx` - Bulk edit controls
- `useFavorites.ts` - Favorites state management

**Scanning (`/scan`)**

- `ScanScreen.tsx` - Camera interface for wine scanning
- `ScanFrame.tsx` - Scanning overlay and progress
- `ScanInstructions.tsx` - User guidance during scanning
- `useScanLogic.ts` - Scanning state and logic

**Wine Details (`/wineDetail`)**

- `WineDetailScreen.tsx` - Detailed wine information
- `WineHero.tsx` - Wine header with image and basic info
- `TastingNotes.tsx` - Taste and aroma profiles
- `FoodPairing.tsx` - Food pairing suggestions
- `useWineDetail.ts` - Wine detail state management

**Profile (`/profile`)**

- `ProfileScreen.tsx` - User profile interface
- `ProfileHeader.tsx` - Profile information display
- `ProfileMenu.tsx` - Settings and navigation menu
- `useProfile.ts` - Profile data management

**FAQ (`/faq`)**

- `FAQScreen.tsx` - Help and support interface
- `FAQCategory.tsx` - FAQ category grouping
- `FAQSearch.tsx` - Search functionality
- `useFAQSearch.ts` - Search and filtering logic

**Onboarding (`/onboarding`)**

- `OnboardingScreen.tsx` - App introduction flow
- `StepContent.tsx` - Individual onboarding steps
- `StepNavigation.tsx` - Step navigation controls

#### Layout (`/components/layout`)

- `BottomNav.tsx` - Bottom navigation bar
- `ResponsiveLayout.tsx` - Responsive grid system
- `AppErrorBoundary.tsx` - Error boundary component

#### UI Components (`/components/ui`)

- `Button.tsx` - Reusable button component
- `Input.tsx` - Form input component
- `Badge.tsx` - Status badges
- `ImageWithFallback.tsx` - Image with error handling

#### Hooks (`/components/hooks`)

- `useMediaQueries.ts` - Responsive breakpoint hooks

#### PWA (`/components/pwa`)

- `PWAProvider.tsx` - PWA functionality provider
- `usePWA.ts` - PWA installation hooks
- `pwaService.ts` - Service worker management

### 🛣️ Routes (`/routes`)

TanStack Router file-based routing:

- `__root.tsx` - Root layout and navigation
- `index.tsx` - Home route
- `auth.tsx` - Authentication route
- `favorites.tsx` - Favorites route
- `profile.tsx` - Profile route
- `scan.tsx` - Scanning route
- `wine/$id.tsx` - Dynamic wine detail routes
- `faq.tsx` - FAQ route
- `onboarding.tsx` - Onboarding route

### 🎨 Styles (`/styles`)

Modular CSS architecture with Tailwind CSS v4:

```
styles/
├── base/                      # Base styles and resets
│   ├── reset.css             # CSS reset
│   ├── variables.css         # CSS custom properties
│   └── typography.css        # Typography utilities
├── components/               # Component-specific styles
│   ├── buttons.css           # Button variants
│   ├── cards.css             # Card components
│   ├── badges.css            # Badge styles
│   ├── forms.css             # Form elements
│   └── ...
├── theme/                    # Theme system
│   ├── colors.css            # Color utilities
│   ├── wine-gradients.css    # Wine-themed gradients
│   └── shadows.css           # Shadow definitions
├── layout/                   # Layout utilities
├── effects/                  # Special effects (glass, textures)
├── features/                 # Feature-specific styles
├── pwa/                      # PWA-specific styles
└── utils/                    # Utility classes
```

### 🎯 Theme System (`/theme`)

- `wine-theme.ts` - Comprehensive theme configuration
- Includes colors, typography, spacing, shadows, and animations
- Wine-inspired color palette with rosé accent scheme

### 📝 Types (`/ts`)

TypeScript definitions organized by feature:

- `auth.ts` - Authentication types
- `wine.ts` - Wine data types
- `user.ts` - User profile types
- `favorites.ts` - Favorites management types
- `home.ts` - Home screen types
- `profile.ts` - Profile types
- `scan.ts` - Scanning types
- And more...

### 📋 Constants (`/constants`)

Application-wide constants:

- `faq.ts` - FAQ data
- `home.ts` - Home screen configuration
- `onboarding.ts` - Onboarding steps
- `profile.ts` - Profile menu items
- `scan.ts` - Scanning configuration
- `wineDatabase.ts` - Mock wine data
- `favorites.ts` - Sample favorites data

### ⚙️ Configuration (`/config`)

- `app.ts` - Application configuration

### 🛠️ Utils (`/utils`)

- `asyncUtils.ts` - Async operation helpers
- `theme-utils.ts` - Theme integration utilities
- `tailwindMerge.ts` - Tailwind class merging

## Key Features

### 🎨 Design System

- **Wine-themed color palette** with rosé accent scheme
- **Responsive design** for mobile, tablet, desktop, and kiosk
- **Glass morphism effects** and wine-inspired textures
- **Consistent component library** with Tailwind CSS

### 🔐 Authentication

- Login/signup forms with validation
- Guest user support
- Route protection with auth guards
- Persistent user sessions

### 📱 Progressive Web App

- Service worker integration
- Offline support
- Install prompts
- Native app-like experience

### 🍷 Wine Features

- Wine scanning with camera
- Detailed wine information
- Favorites management
- Food pairing suggestions
- Tasting notes
- Wine discovery and trending sections

### 🎮 Gamification

- User achievements and badges
- Scanning streaks
- Progress tracking
- Leaderboards

### 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimizations
- Kiosk mode support
- Adaptive layouts and components

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Routing**: TanStack Router (file-based)
- **Styling**: Tailwind CSS v4 with custom theme
- **State Management**: React hooks and context
- **PWA**: Service workers and manifest
- **Build Tool**: Vite
- **Icons**: Lucide React

## Development Patterns

### Component Organization

- Feature-based folder structure
- Co-located hooks and utilities
- Consistent naming conventions
- TypeScript for type safety

### State Management

- Custom hooks for feature state
- React Context for global state
- Local storage for persistence
- Service layer for data operations

### Styling Architecture

- CSS modules with Tailwind utilities
- Custom CSS properties for theming
- Component-specific style files
- Utility-first approach

### Code Quality

- TypeScript strict mode
- Consistent file structure
- Reusable component patterns
- Error boundaries and fallbacks

This structure provides a scalable, maintainable codebase for the Wine Buddy application with clear separation of concerns and excellent developer experience.
