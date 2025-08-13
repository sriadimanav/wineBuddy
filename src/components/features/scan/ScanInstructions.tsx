// components/features/scan/ScanInstructions.tsx
import { Camera, RotateCcw } from 'lucide-react';

import type { ScanInstructionsProps } from '@ts/index';

export function ScanInstructions({
  scanningText,
  isScanning,
  showResult,
  scanProgress,
  onStartScan,
  onResetScan,
  screenSize,
}: ScanInstructionsProps) {
  return (
    <div className="relative z-10 text-center px-8 pb-32">
      <p className={`mb-6 ${screenSize === 'kiosk' ? 'text-xl' : 'text-lg'}`}>{scanningText}</p>

      {isScanning && (
        <div className="mb-4">
          <div className="text-wine-accent font-semibold">{scanProgress}%</div>
        </div>
      )}

      {!isScanning && !showResult && (
        <div className="space-y-6">
          <button
            onClick={onStartScan}
            className={`bg-wine-accent hover:bg-wine-light text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl flex items-center justify-center mx-auto ${
              screenSize === 'kiosk' ? 'px-8 py-4 text-lg' : 'px-6 py-3'
            }`}>
            <Camera className="mr-2 w-5 h-5" />
            Start Scanning
          </button>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-300">
            <div className="flex items-center">
              <Camera className="w-4 h-4 mr-2" />
              Wine Label
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 bg-white rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-black"></div>
              </div>
              Barcode
            </div>
          </div>
        </div>
      )}

      {isScanning && (
        <button
          onClick={onResetScan}
          className="text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-lg transition-colors flex items-center justify-center mx-auto">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </button>
      )}

      {showResult && (
        <div className="text-green-400 space-y-2">
          <div className="text-2xl">🍷</div>
          <p className="text-lg font-semibold">Wine Found!</p>
          <p className="text-sm text-gray-300">Redirecting to wine details...</p>
        </div>
      )}
    </div>
  );
}
