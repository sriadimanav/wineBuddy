// components/profile/ProfileActions.tsx
import { LogOut, Settings } from 'lucide-react';

import type { ProfileActionsProps } from '@ts/index';

export function ProfileActions({ onLogout, onResetApp }: ProfileActionsProps) {
  return (
    <>
      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center px-4 py-3 text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors">
        <LogOut size={16} className="mr-2" />
        Sign Out
      </button>

      {/* Development Reset Button */}
      <button
        onClick={onResetApp}
        className="w-full flex items-center justify-center px-4 py-3 text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors mt-2">
        <Settings size={16} className="mr-2" />
        Reset App (Dev)
      </button>
    </>
  );
}
