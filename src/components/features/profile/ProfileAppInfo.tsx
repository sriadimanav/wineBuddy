// components/profile/ProfileAppInfo.tsx
import { ChevronRight } from 'lucide-react';

import type { ProfileAppInfoProps } from '@ts/index';

export function ProfileAppInfo({ appVersion }: ProfileAppInfoProps) {
  return (
    <div className="bg-card rounded-xl p-4 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">About</h3>
      <div className="space-y-3 text-sm text-muted-foreground">
        <div className="flex justify-between">
          <span>App Version</span>
          <span>{appVersion}</span>
        </div>
        <div className="h-px bg-border"></div>
        <button className="flex justify-between w-full text-left hover:text-foreground transition-colors">
          <span>Terms of Service</span>
          <ChevronRight size={16} />
        </button>
        <div className="h-px bg-border"></div>
        <button className="flex justify-between w-full text-left hover:text-foreground transition-colors">
          <span>Privacy Policy</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
