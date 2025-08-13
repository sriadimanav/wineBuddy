// constants/profile.ts
import { Bell, Camera, Heart, HelpCircle, Settings, Shield, Star } from 'lucide-react';

import type { MenuItem, RecentActivity, WinePreference } from '@ts/index';

export const PROFILE_MENU_ITEMS: readonly MenuItem[] = [
  {
    iconComponent: Settings,
    title: 'Account Settings',
    subtitle: 'Update your personal information',
    action: () => console.log('Account Settings'),
  },
  {
    iconComponent: Bell,
    title: 'Notifications',
    subtitle: 'Manage your notification preferences',
    action: () => console.log('Notifications'),
  },
  {
    iconComponent: Shield,
    title: 'Privacy & Security',
    subtitle: 'Control your privacy settings',
    action: () => console.log('Privacy'),
  },
  {
    iconComponent: HelpCircle,
    title: 'Help & Support',
    subtitle: 'Get help or contact support',
    action: () => console.log('Help'),
  },
] as const;

export const DEFAULT_WINE_PREFERENCES: readonly WinePreference[] = [
  {
    label: 'Preferred Wine Type',
    value: 'Red Wines',
  },
  {
    label: 'Price Range',
    value: '$25 - $100',
  },
  {
    label: 'Favorite Region',
    value: 'Bordeaux',
  },
] as const;

export const MOCK_RECENT_ACTIVITIES: readonly RecentActivity[] = [
  {
    iconComponent: Camera,
    iconBgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Scanned Caymus Cabernet',
    timeAgo: '2 hours ago',
  },
  {
    iconComponent: Heart,
    iconBgColor: 'bg-red-100',
    iconColor: 'text-red-500',
    title: 'Added Château Margaux to favorites',
    timeAgo: '1 day ago',
  },
  {
    iconComponent: Star,
    iconBgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-500',
    title: 'Rated Cloudy Bay Sauvignon Blanc',
    timeAgo: '3 days ago',
  },
] as const;

export const APP_VERSION = '1.2.0' as const;
