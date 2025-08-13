// components/features/scan/ScanAlternatives.tsx
import { Image as ImageIcon } from 'lucide-react';

import type { ScanAlternativesProps } from '@ts/scan';

export function ScanAlternatives({ isScanning, showResult }: ScanAlternativesProps) {
  if (isScanning || showResult) {
    return null;
  }

  return (
    <div className="absolute bottom-6 left-6 right-6 z-10">
      <div className="bg-black bg-opacity-70 rounded-2xl p-4 backdrop-blur-sm border border-white border-opacity-20">
        <p className="text-center text-sm text-gray-300 mb-3">Can't scan? Try these options:</p>
        <div className="flex space-x-3">
          <button className="flex-1 text-white hover:bg-white hover:bg-opacity-20 px-4 py-3 rounded-lg transition-colors flex items-center justify-center">
            <ImageIcon className="w-4 h-4 mr-2" />
            Upload Photo
          </button>
          <button className="flex-1 text-white hover:bg-white hover:bg-opacity-20 px-4 py-3 rounded-lg transition-colors">
            Manual Search
          </button>
        </div>
      </div>
    </div>
  );
}
