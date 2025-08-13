// components/features/home/QuickScanCTA.tsx
import { Camera } from 'lucide-react';

import { HOME_MESSAGES } from '@/constants/home';
import { useScreenSize } from '@components/hooks/useMediaQueries';
import type { QuickScanCTAProps } from '@ts/home';

export function QuickScanCTA({ onScanClick }: QuickScanCTAProps) {
  const screenSize = useScreenSize();

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #38040e, #ad2831)',
        borderRadius: '1rem',
        padding: '1.5rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
      {/* Decorative elements */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full transform translate-x-16 -translate-y-16"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 70%, transparent 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-20 h-20 rounded-full transform -translate-x-10 translate-y-10"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className={`font-bold mb-2 ${screenSize === 'kiosk' ? 'text-xl' : 'text-lg'}`}>
              {HOME_MESSAGES.QUICK_SCAN_TITLE}
            </h3>
            <p className={`opacity-90 mb-4 ${screenSize === 'kiosk' ? 'text-base' : 'text-sm'}`}>
              {HOME_MESSAGES.QUICK_SCAN_DESCRIPTION}
            </p>
            <button
              onClick={onScanClick}
              className={`bg-card text-wine-dark font-semibold rounded-xl hover:bg-secondary transition-all flex items-center shadow-lg ${
                screenSize === 'kiosk' ? 'px-6 py-3 text-lg' : 'px-4 py-2'
              }`}>
              <Camera className="w-5 h-5 mr-2" />
              Scan Now
            </button>
          </div>
          <div className="ml-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
              <Camera className="w-8 h-8 text-white drop-shadow-lg" />
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full flex items-center justify-center">🍷</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
