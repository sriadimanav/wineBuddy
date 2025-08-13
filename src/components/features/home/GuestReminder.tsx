// components/features/home/GuestReminder.tsx
import { HOME_MESSAGES } from '@/constants/home';
import type { GuestReminderProps } from '@ts/home';

export function GuestReminder({ onSignUpClick }: GuestReminderProps) {
  return (
    <div className="bg-wine-blush border border-border rounded-xl p-4 wine-rosé-card">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-wine-accent mb-1">You're exploring as a guest</h3>
          <p className="text-sm text-muted-foreground">{HOME_MESSAGES.GUEST_UPGRADE_DESCRIPTION}</p>
        </div>
        <button
          onClick={onSignUpClick}
          className="bg-wine-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-wine-light transition-colors ml-4">
          Sign Up
        </button>
      </div>
    </div>
  );
}
