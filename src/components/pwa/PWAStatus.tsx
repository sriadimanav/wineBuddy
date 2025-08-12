// components/pwa/PWAStatus.tsx
import { useEffect, useState } from 'react';
import { isDevelopment, isOnline, isPWAInstalled } from './pwa';

export function PWAStatus() {
  const [onlineStatus, setOnlineStatus] = useState(isOnline());
  const [installed, setInstalled] = useState(isPWAInstalled());

  useEffect(() => {
    // Monitor online/offline status
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);

    // Check installation status periodically
    const checkInstallation = () => setInstalled(isPWAInstalled());

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check installation status on app state changes
    window.addEventListener('beforeinstallprompt', checkInstallation);
    window.addEventListener('appinstalled', checkInstallation);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', checkInstallation);
      window.removeEventListener('appinstalled', checkInstallation);
    };
  }, []);

  // Only show status in development
  if (!isDevelopment()) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-card text-card-foreground text-xs p-2 rounded-lg shadow-lg z-50 border border-border wine-glass-card">
      <div className="text-wine-accent font-medium mb-1">🍷 Wine Buddy Dev</div>
      <div className="flex items-center gap-2">
        <span>Online:</span>
        <span className={onlineStatus ? 'text-green-600' : 'text-red-500'}>
          {onlineStatus ? '✅' : '❌'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span>PWA:</span>
        <span className={installed ? 'text-green-600' : 'text-yellow-600'}>
          {installed ? '✅' : '❌'}
        </span>
      </div>
    </div>
  );
}
