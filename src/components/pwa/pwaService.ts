// services/pwaService.ts
import { debugLog, isDevelopment, isPWAInstalled } from './pwa';

export class PWAService {
  private static updateSW: ((reloadPage?: boolean) => Promise<void>) | undefined;

  /**
   * Initialize PWA features including service worker registration
   */
  static async initialize(): Promise<void> {
    try {
      if ('serviceWorker' in navigator && !isDevelopment()) {
        // Only in production mode
        const { registerSW } = await import('virtual:pwa-register');

        this.updateSW = registerSW({
          onNeedRefresh: this.handleUpdateAvailable,
          onOfflineReady: this.handleOfflineReady,
          immediate: true,
        });

        debugLog('PWA features initialized successfully');
      } else if (isDevelopment()) {
        debugLog('PWA features disabled in development mode');
      } else {
        debugLog('Service Worker not supported');
      }
    } catch (error) {
      debugLog('PWA registration failed, continuing without PWA features:', error);
      // App continues to work without PWA features
    }
  }

  /**
   * Handle PWA update available
   */
  private static handleUpdateAvailable = (): void => {
    debugLog('PWA update available');
    if (confirm('New version available! Reload to update?')) {
      PWAService.updateSW?.(true);
    }
  };

  /**
   * Handle PWA offline ready
   */
  private static handleOfflineReady = (): void => {
    debugLog('App ready to work offline');
    PWAService.showOfflineToast();
  };

  /**
   * Show offline ready toast notification
   */
  private static showOfflineToast(): void {
    const toast = document.createElement('div');
    toast.textContent = 'Wine Buddy is ready to work offline!';
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: #ad2831;
      color: white;
      padding: 1rem;
      border-radius: 0.5rem;
      text-align: center;
      z-index: 10000;
      font-size: 14px;
      animation: slideUpAndFade 0.3s ease-out;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  /**
   * Setup service worker message listeners
   */
  static setupServiceWorkerListeners(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', event => {
        if (event.data && event.data.type === 'SW_UPDATE_AVAILABLE') {
          if (confirm('New version of Wine Buddy is available! Update now?')) {
            window.location.reload();
          }
        }
      });
    }
  }

  /**
   * Log PWA installation status
   */
  static logInstallationStatus(): void {
    if (isPWAInstalled()) {
      debugLog('Wine Buddy is running as installed PWA');
    } else {
      debugLog('Wine Buddy is running in browser mode');
    }
  }

  /**
   * Initialize all PWA features after DOM is ready
   */
  static async initializeWhenReady(): Promise<void> {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        PWAService.initialize();
        PWAService.setupServiceWorkerListeners();
      });
    } else {
      await PWAService.initialize();
      PWAService.setupServiceWorkerListeners();
    }

    // Log status on window load
    window.addEventListener('load', PWAService.logInstallationStatus);
  }
}
