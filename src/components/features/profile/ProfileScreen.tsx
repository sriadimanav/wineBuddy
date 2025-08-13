// components/ProfileScreen.tsx
import {
  APP_VERSION,
  DEFAULT_WINE_PREFERENCES,
  MOCK_RECENT_ACTIVITIES,
  PROFILE_MENU_ITEMS,
} from '@/constants/profile';

import type { ProfileScreenProps } from '@ts/index';

import { ProfileActions } from './ProfileActions';
import { ProfileActivity } from './ProfileActivity';
import { ProfileAppInfo } from './ProfileAppInfo';
import { ProfileHeader } from './ProfileHeader';
import { ProfileMenu } from './ProfileMenu';
import { ProfilePreferences } from './ProfilePreferences';
import { ProfileUpgradePrompt } from './ProfileUpgradePrompt';
import { useProfile } from './useProfile';
import { useProfileActions } from './useProfileActions';

export function ProfileScreen({ user, onLogout }: ProfileScreenProps) {
  const { stats } = useProfile(user);
  const { resetApp, handleCreateAccount } = useProfileActions();

  return (
    <div className="bg-background pb-20">
      {/* Header */}
      <ProfileHeader user={user} stats={stats} />

      {/* Guest User Upgrade Prompt */}
      {user.isGuest && <ProfileUpgradePrompt onCreateAccount={handleCreateAccount} />}

      {/* Menu Items */}
      <div className={`px-6 space-y-4 ${user.isGuest ? 'pb-6' : 'py-6'}`}>
        <ProfileMenu menuItems={PROFILE_MENU_ITEMS} />

        {/* Preferences */}
        <ProfilePreferences preferences={DEFAULT_WINE_PREFERENCES} />

        {/* Recent Activity */}
        <ProfileActivity activities={MOCK_RECENT_ACTIVITIES} />

        {/* App Info */}
        <ProfileAppInfo appVersion={APP_VERSION} />

        {/* Actions */}
        <ProfileActions onLogout={onLogout} onResetApp={resetApp} />
      </div>
    </div>
  );
}
