import {
  Camera,
  CheckCircle,
  Flashlight,
  FlashlightOff,
  Image as ImageIcon,
  RotateCcw,
  X,
} from 'lucide-react';
import { useState } from 'react';
import type { Wine } from '../routes/__root';
import { useScreenSize } from './hooks/useMediaQueries';

interface ScanScreenProps {
  onWineFound: (wine: Wine) => void;
  onBack: () => void;
}

// Mock scan results
const mockScanResults: Wine[] = [
  {
    id: 'scan-1',
    name: 'Caymus Cabernet Sauvignon 2020',
    winery: 'Caymus Vineyards',
    vintage: 2020,
    region: 'Napa Valley, California',
    description:
      'Rich and concentrated Cabernet Sauvignon with dark fruit flavors and smooth tannins.',
    grapeVariety: ['Cabernet Sauvignon'],
    color: 'Deep Purple',
    alcoholContent: 14.5,
    sugarContent: 'Dry',
    taste: ['Blackberry', 'Cassis', 'Vanilla', 'Oak'],
    aroma: ['Dark Fruits', 'Cedar', 'Spice'],
    foodPairing: ['Grilled Steak', 'Lamb Chops', 'Dark Chocolate'],
    rating: 4.4,
    reviews: 156,
    sommelierNotes: 'Excellent everyday Cabernet with consistent quality year after year.',
    image: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=300&h=400&fit=crop',
  },
  {
    id: 'scan-2',
    name: "Kendall-Jackson Vintner's Reserve Chardonnay",
    winery: 'Kendall-Jackson',
    vintage: 2021,
    region: 'California, USA',
    description: 'Balanced Chardonnay with tropical fruit flavors and a hint of oak.',
    grapeVariety: ['Chardonnay'],
    color: 'Golden Yellow',
    alcoholContent: 13.5,
    sugarContent: 'Dry',
    taste: ['Pineapple', 'Pear', 'Vanilla', 'Butter'],
    aroma: ['Tropical Fruits', 'Citrus', 'Oak'],
    foodPairing: ['Roasted Chicken', 'Seafood', 'Creamy Pasta'],
    rating: 4.2,
    reviews: 203,
    sommelierNotes: 'A reliable crowd-pleaser with perfect balance of fruit and oak.',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?w=300&h=400&fit=crop',
  },
];

export function ScanScreen({ onWineFound, onBack }: ScanScreenProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [scanningText, setScanningText] = useState('Point your camera at a wine label or barcode');
  const [showResult, setShowResult] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const screenSize = useScreenSize();

  const startScan = () => {
    setIsScanning(true);
    setScanningText('Scanning...');
    setScanProgress(0);

    // Simulate scanning progress
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    // Simulate scanning process
    setTimeout(() => {
      setScanningText('Wine detected! Analyzing...');
    }, 1500);

    setTimeout(() => {
      setScanningText('Getting wine details...');
    }, 3000);

    setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
      setScanningText('Wine Found!');

      // Show random wine from mock results
      const randomWine = mockScanResults[Math.floor(Math.random() * mockScanResults.length)];
      setTimeout(() => {
        onWineFound(randomWine);
      }, 1500);
    }, 4500);
  };

  const resetScan = () => {
    setIsScanning(false);
    setShowResult(false);
    setScanProgress(0);
    setScanningText('Point your camera at a wine label or barcode');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Camera View Simulation */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
        {/* Mock camera feed pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.1) 10px,
              rgba(255,255,255,0.1) 20px
            )`,
            }}></div>
        </div>

        {/* Flash effect */}
        {flashOn && <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>}
      </div>

      {/* Header */}
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
          onClick={() => setFlashOn(!flashOn)}
          className="p-3 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">
          {flashOn ? (
            <FlashlightOff className={screenSize === 'kiosk' ? 'w-7 h-7' : 'w-6 h-6'} />
          ) : (
            <Flashlight className={screenSize === 'kiosk' ? 'w-7 h-7' : 'w-6 h-6'} />
          )}
        </button>
      </div>

      {/* Scanning Frame */}
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

      {/* Instructions */}
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
              onClick={startScan}
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
            onClick={resetScan}
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

      {/* Bottom alternative options */}
      {!isScanning && !showResult && (
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
      )}

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
