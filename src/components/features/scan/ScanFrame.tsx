// components/features/scan/ScanFrame.tsx
import { CheckCircle } from 'lucide-react';

import type { ScanFrameProps } from '@ts/index';

export function ScanFrame({ isScanning, scanProgress, showResult, screenSize }: ScanFrameProps) {
  return (
    <div className="relative z-10 flex-1 flex items-center justify-center px-8">
      <div className="relative">
        {/* Scanning border */}
        <div
          className="border-2 border-white border-opacity-50 rounded-2xl relative overflow-hidden"
          style={{
            width: screenSize === 'kiosk' ? '320px' : '256px',
            height: screenSize === 'kiosk' ? '400px' : '320px',
          }}>
          {/* Corner brackets */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-wine-accent rounded-tl-lg"></div>
          <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-wine-accent rounded-tr-lg"></div>
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-wine-accent rounded-bl-lg"></div>
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-wine-accent rounded-br-lg"></div>

          {/* Scanning line animation */}
          {isScanning && (
            <div className="absolute inset-0">
              <div
                className="w-full h-1 bg-wine-accent shadow-lg animate-pulse absolute"
                style={{ top: `${scanProgress}%` }}></div>
              <div
                className="w-full h-0.5 absolute"
                style={{
                  background: `linear-gradient(to right, transparent, rgb(173, 40, 49), transparent)`,
                  top: `${(scanProgress + 10) % 100}%`,
                  animation: 'scan-line 2s linear infinite',
                }}></div>
            </div>
          )}

          {/* Progress indicator */}
          {isScanning && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black bg-opacity-50 rounded-full p-2">
                <div className="w-full bg-gray-600 rounded-full h-1">
                  <div
                    className="bg-wine-accent h-1 rounded-full transition-all duration-150"
                    style={{ width: `${scanProgress}%` }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Success checkmark */}
          {showResult && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>
          )}

          {/* Crosshair */}
          {!isScanning && !showResult && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-2 border-wine-accent rounded-full opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 w-8 h-0.5 bg-wine-accent transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-0.5 h-8 bg-wine-accent transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
