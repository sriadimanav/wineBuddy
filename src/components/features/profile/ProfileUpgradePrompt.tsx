// components/profile/ProfileUpgradePrompt.tsx
import type { ProfileUpgradePromptProps } from '@ts/index';

export function ProfileUpgradePrompt({ onCreateAccount }: ProfileUpgradePromptProps) {
  return (
    <div className="px-6 py-6">
      <div
        className="rounded-xl p-6 text-white shadow-lg"
        style={{
          background: 'linear-gradient(to right, #ad2831, #800e13)',
        }}>
        <h3 className="text-lg font-semibold mb-2 text-white">Unlock Your Full Wine Journey</h3>
        <p className="text-white opacity-90 text-sm mb-4">
          Create an account to save your favorites, track your wine discoveries, and earn badges!
        </p>
        <button
          onClick={onCreateAccount}
          className="bg-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          style={{ color: '#ad2831' }}>
          Create Your Account
        </button>
      </div>
    </div>
  );
}
