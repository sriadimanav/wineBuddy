// components/features/scan/ScanHeader.tsx
import { Flashlight, FlashlightOff, X } from 'lucide-react';

import type { ScanHeaderProps } from '@ts/scan';

export function ScanHeader({ onBack, onToggleFlash, flashOn, screenSize }: ScanHeaderProps) {
  return (
    <div className="relative z-10 flex items-center justify-between p-4 bg-black bg-opacity-50">
      <button
        onClick={onBack}
        className="p-3 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">
        <X className={screenSize === 'kiosk' ? 'w-7 h-7' : 'w-6 h-6'} />
      </button>

      <h1 className={`font-semibold ${screenSize === 'kiosk' ? 'text-xl' : 'text-lg'}`}>
        Scan Wine
      </h1>

      <button
        onClick={onToggleFlash}
        className="p-3 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">
        {flashOn ? (
          <FlashlightOff className={screenSize === 'kiosk' ? 'w-7 h-7' : 'w-6 h-6'} />
        ) : (
          <Flashlight className={screenSize === 'kiosk' ? 'w-7 h-7' : 'w-6 h-6'} />
        )}
      </button>
    </div>
  );
}
