// components/pwa/PWAInstallBanner.tsx
import { usePWA } from './usePWA';

export function PWAInstallBanner() {
  const { showInstallBanner, deferredPrompt, handleInstallClick, handleDismissClick } = usePWA();

  if (!showInstallBanner || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-wine-accent text-accent-foreground p-4 rounded-lg shadow-lg z-50 animate-slide-up wine-glass-card">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">Install Wine Buddy</h3>
          <p className="text-xs opacity-90">Get quick access and use offline</p>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={handleInstallClick}
            className="bg-white text-wine-accent px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors wine-hover-lift">
            Install
          </button>
          <button
            onClick={handleDismissClick}
            className="text-white/80 hover:text-white transition-colors p-1"
            aria-label="Dismiss install banner">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
