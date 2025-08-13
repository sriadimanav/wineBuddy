// components/auth/GuestLoginButton.tsx
import type { GuestLoginProps } from '@ts/index';

export function GuestLoginButton({ onGuestLogin, isLoading, screenSize }: GuestLoginProps) {
  return (
    <div className="mt-6">
      <button
        onClick={onGuestLogin}
        disabled={isLoading}
        className={`w-full border-2 border-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:border-wine-accent hover:text-wine-accent disabled:opacity-50 disabled:cursor-not-allowed ${
          screenSize === 'kiosk' ? 'py-4 text-lg' : 'py-3'
        }`}>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></div>
            Getting Started...
          </div>
        ) : (
          'Continue as Guest'
        )}
      </button>
      <p className="mt-2 text-xs text-gray-500 text-center">
        Explore the app without creating an account. You can sign up later to save your progress.
      </p>
    </div>
  );
}
