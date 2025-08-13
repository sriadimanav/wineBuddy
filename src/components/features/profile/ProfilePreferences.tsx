// components/profile/ProfilePreferences.tsx
import type { ProfilePreferencesProps } from '@ts/index';

export function ProfilePreferences({ preferences }: ProfilePreferencesProps) {
  return (
    <div className="bg-card rounded-xl p-4 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Wine Preferences</h3>
      <div className="space-y-3">
        {preferences.map((preference, index) => (
          <div key={index}>
            <div className="flex items-center justify-between">
              <span className="text-foreground">{preference.label}</span>
              <span className="wine-badge--secondary">{preference.value}</span>
            </div>
            {index < preferences.length - 1 && <div className="h-px bg-border mt-3"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
