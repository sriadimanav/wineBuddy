// components/features/scan/useScanLogic.ts
import { useState } from 'react';

import { MOCK_SCAN_RESULTS, SCAN_CONFIG, SCAN_TEXTS } from '@/constants/scan';
import type { ScanResult, ScanState } from '@ts/index';

export const useScanLogic = () => {
  const [scanState, setScanState] = useState<ScanState>({
    isScanning: false,
    scanningText: SCAN_TEXTS.initial,
    showResult: false,
    scanProgress: 0,
  });

  const [flashOn, setFlashOn] = useState(false);

  const startScan = async (): Promise<ScanResult> => {
    setScanState({
      isScanning: true,
      scanningText: SCAN_TEXTS.scanning,
      showResult: false,
      scanProgress: 0,
    });

    // Simulate scanning progress
    const progressInterval = setInterval(() => {
      setScanState(prev => {
        if (prev.scanProgress >= 100) {
          clearInterval(progressInterval);
          return prev;
        }
        return { ...prev, scanProgress: prev.scanProgress + SCAN_CONFIG.PROGRESS_INCREMENT };
      });
    }, SCAN_CONFIG.PROGRESS_INTERVAL);

    // Simulate scanning process with different stages
    await new Promise(resolve => setTimeout(resolve, SCAN_CONFIG.SCAN_STAGES.DETECTION_DELAY));
    setScanState(prev => ({ ...prev, scanningText: SCAN_TEXTS.detected }));

    await new Promise(resolve => setTimeout(resolve, SCAN_CONFIG.SCAN_STAGES.ANALYSIS_DELAY));
    setScanState(prev => ({ ...prev, scanningText: SCAN_TEXTS.analyzing }));

    await new Promise(resolve => setTimeout(resolve, SCAN_CONFIG.SCAN_STAGES.COMPLETION_DELAY));

    // Complete scanning
    setScanState(prev => ({
      ...prev,
      isScanning: false,
      showResult: true,
      scanningText: SCAN_TEXTS.found,
    }));

    // Return random wine from mock results
    const randomWine = MOCK_SCAN_RESULTS[Math.floor(Math.random() * MOCK_SCAN_RESULTS.length)];

    return {
      wine: randomWine,
      success: true,
    };
  };

  const resetScan = () => {
    setScanState({
      isScanning: false,
      showResult: false,
      scanProgress: 0,
      scanningText: SCAN_TEXTS.initial,
    });
  };

  const toggleFlash = () => {
    setFlashOn(prev => !prev);
  };

  return {
    scanState,
    flashOn,
    startScan,
    resetScan,
    toggleFlash,
  };
};
