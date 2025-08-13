// types/scan.ts
import type { Wine } from './wine';

export interface ScanScreenProps {
  onWineFound: (wine: Wine) => void;
  onBack: () => void;
}

export interface ScanHeaderProps {
  onBack: () => void;
  onToggleFlash: () => void;
  flashOn: boolean;
  screenSize: string;
}

export interface ScanFrameProps {
  isScanning: boolean;
  scanProgress: number;
  showResult: boolean;
  screenSize: string;
}

export interface ScanInstructionsProps {
  scanningText: string;
  isScanning: boolean;
  showResult: boolean;
  scanProgress: number;
  onStartScan: () => void;
  onResetScan: () => void;
  screenSize: string;
}

export interface ScanAlternativesProps {
  isScanning: boolean;
  showResult: boolean;
}

export interface ScanResult {
  wine: Wine;
  success: boolean;
}

export interface ScanState {
  isScanning: boolean;
  scanningText: string;
  showResult: boolean;
  scanProgress: number;
}
