// types/profile.ts
import type { LucideIcon } from 'lucide-react';

import type { User } from '@/ts/user';

export interface ProfileScreenProps {
  user: User;
  onLogout: () => void;
}

export interface ProfileHeaderProps {
  user: User;
  stats: ProfileStat[];
}

export interface ProfileMenuProps {
  menuItems: readonly MenuItem[];
}

export interface ProfileUpgradePromptProps {
  onCreateAccount: () => void;
}

export interface ProfilePreferencesProps {
  preferences: readonly WinePreference[];
}

export interface ProfileActivityProps {
  activities: readonly RecentActivity[];
}

export interface ProfileAppInfoProps {
  appVersion: string;
}

export interface ProfileActionsProps {
  onLogout: () => void;
  onResetApp: () => void;
}

export interface MenuItem {
  iconComponent: LucideIcon;
  title: string;
  subtitle: string;
  action: () => void;
}

export interface ProfileStat {
  label: string;
  value: string;
  iconComponent: LucideIcon;
  iconColor: string;
}

export interface WinePreference {
  label: string;
  value: string;
}

export interface RecentActivity {
  iconComponent: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  title: string;
  timeAgo: string;
}
