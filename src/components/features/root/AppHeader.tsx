// components/layout/AppHeader.tsx
import { ArrowLeft } from 'lucide-react';

import type { ScreenSize } from '@components/hooks/useMediaQueries';

interface AppHeaderProps {
  title: string;
  onGoBack: () => void;
  screenSize: ScreenSize;
}

export function AppHeader({ title, onGoBack, screenSize }: AppHeaderProps) {
  return (
    <div className="bg-card border-b border-border px-4 py-4 flex items-center sticky top-0 z-40 shadow-sm">
      <button
        onClick={onGoBack}
        className="p-2 rounded-lg hover:bg-secondary transition-colors flex items-center justify-center text-foreground mr-2"
        aria-label="Go back">
        <ArrowLeft size={screenSize === 'kiosk' ? 24 : 20} />
      </button>
      <h1
        className={`font-semibold text-foreground ${
          screenSize === 'kiosk' ? 'text-xl' : 'text-lg'
        }`}>
        {title}
      </h1>
    </div>
  );
}
