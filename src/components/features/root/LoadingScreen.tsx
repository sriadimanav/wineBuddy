// components/common/LoadingScreen.tsx
import { Wine } from 'lucide-react';

import type { ScreenSize } from '@components/hooks/useMediaQueries';

interface LoadingScreenProps {
  screenSize: ScreenSize;
  message?: string;
}

export function LoadingScreen({
  screenSize,
  message = 'Loading Wine Buddy...',
}: LoadingScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse text-wine-accent text-center">
        <Wine className={`mx-auto mb-2 ${screenSize === 'kiosk' ? 'w-10 h-10' : 'w-8 h-8'}`} />
        <p className={`text-muted-foreground ${screenSize === 'kiosk' ? 'text-base' : 'text-sm'}`}>
          {message}
        </p>
      </div>
    </div>
  );
}
