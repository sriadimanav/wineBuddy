// constants/home.ts
import type { WineCategory, WineCategoryType } from '@ts/index';

export const WINE_CATEGORIES: readonly WineCategory[] = [
  {
    id: 'red',
    name: 'Red Wines',
    description: 'Bold & Complex',
    bgColor: 'bg-wine-blush',
    borderColor: 'border-border',
    iconBgColor: 'bg-wine-accent',
    onClickValue: 'Red Wines' as WineCategoryType,
  },
  {
    id: 'white',
    name: 'White Wines',
    description: 'Fresh & Crisp',
    bgColor: 'bg-wine-whisper',
    borderColor: 'border-border',
    iconBgColor: 'bg-wine-light',
    onClickValue: 'White Wines' as WineCategoryType,
  },
  {
    id: 'rose',
    name: 'Rosé Wines',
    description: 'Light & Refreshing',
    bgColor: 'bg-wine-pearl',
    borderColor: 'border-border',
    iconBgColor: 'bg-wine-accent',
    onClickValue: 'Rosé Wines' as WineCategoryType,
  },
  {
    id: 'sparkling',
    name: 'Sparkling',
    description: 'Bubbly & Festive',
    bgColor: 'bg-wine-soft',
    borderColor: 'border-border',
    iconBgColor: 'bg-wine-medium',
    onClickValue: 'Sparkling Wines' as WineCategoryType,
  },
] as const;

export const HOME_CONFIG = {
  DATA_LOADING_DELAY: 1000, // ms
  SEARCH_DEBOUNCE_DELAY: 300, // ms
  MAX_FEATURED_WINES: 10,
  MAX_TRENDING_WINES: 6,
} as const;

export const HOME_MESSAGES = {
  WELCOME_PREFIX: 'Welcome,',
  DISCOVER_SUBTITLE: 'Discover your next favorite wine',
  GUEST_UPGRADE_TITLE: 'Unlock Your Full Wine Journey',
  GUEST_UPGRADE_DESCRIPTION:
    'Create an account to save your favorites, track your wine discoveries, and earn badges!',
  QUICK_SCAN_TITLE: 'Scan a Wine Label',
  QUICK_SCAN_DESCRIPTION: 'Get instant details about any wine',
  NO_SEARCH_RESULTS: 'No wines found matching your search',
} as const;
