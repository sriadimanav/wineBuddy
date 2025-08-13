// components/features/scan/ScanScreen.tsx
import { SCAN_CONFIG } from '@/constants/scan';
import { useScreenSize } from '@components/hooks/useMediaQueries';
import type { ScanScreenProps } from '@ts/scan';

import { ScanAlternatives } from './ScanAlternatives';
import { ScanCameraView } from './ScanCameraView';
import { ScanFrame } from './ScanFrame';
import { ScanHeader } from './ScanHeader';
import { ScanInstructions } from './ScanInstructions';
import { useScanLogic } from './useScanLogic';

export function ScanScreen({ onWineFound, onBack }: ScanScreenProps) {
  const screenSize = useScreenSize();
  const { scanState, flashOn, startScan, resetScan, toggleFlash } = useScanLogic();

  const handleStartScan = async () => {
    try {
      const result = await startScan();
      if (result.success) {
        // Wait a moment to show success state
        setTimeout(() => {
          onWineFound(result.wine);
        }, SCAN_CONFIG.SUCCESS_DISPLAY_TIME);
      }
    } catch (error) {
      console.error('Scan failed:', error);
      resetScan();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Camera View Simulation */}
      <ScanCameraView flashOn={flashOn} />

      {/* Header */}
      <ScanHeader
        onBack={onBack}
        onToggleFlash={toggleFlash}
        flashOn={flashOn}
        screenSize={screenSize}
      />

      {/* Scanning Frame */}
      <ScanFrame
        isScanning={scanState.isScanning}
        scanProgress={scanState.scanProgress}
        showResult={scanState.showResult}
        screenSize={screenSize}
      />

      {/* Instructions */}
      <ScanInstructions
        scanningText={scanState.scanningText}
        isScanning={scanState.isScanning}
        showResult={scanState.showResult}
        scanProgress={scanState.scanProgress}
        onStartScan={handleStartScan}
        onResetScan={resetScan}
        screenSize={screenSize}
      />

      {/* Bottom alternative options */}
      <ScanAlternatives isScanning={scanState.isScanning} showResult={scanState.showResult} />

      {/* CSS for scan line animation */}
      <style>{`
        @keyframes scan-line {
          0% { top: 0; opacity: 1; }
          50% { opacity: 0.5; }
          100% { top: 100%; opacity: 1; }
        }
      `}</style>
    </div>
  );
}
