// hooks/usePWA.ts
import { useEffect, useState } from 'react';
import { isPWAInstalled } from './pwa';

// PWA Install Interface
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface UsePWAReturn {
  deferredPrompt: BeforeInstallPromptEvent | null;
  showInstallBanner: boolean;
  handleInstallClick: () => Promise<void>;
  handleDismissClick: () => void;
  isInstalled: boolean;
}

export const usePWA = (): UsePWAReturn => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(isPWAInstalled());

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();

      const event = e as BeforeInstallPromptEvent;
      setDeferredPrompt(event);

      // Show install banner if not already installed
      if (!isPWAInstalled() && !localStorage.getItem('wine-buddy-install-dismissed')) {
        setShowInstallBanner(true);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      // Show the install prompt
      await deferredPrompt.prompt();

      // Wait for the user to respond
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('User accepted the PWA install prompt');
      } else {
        console.log('User dismissed the PWA install prompt');
      }

      // Clear the prompt
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    } catch (error) {
      console.error('Error during PWA installation:', error);
    }
  };

  const handleDismissClick = () => {
    setShowInstallBanner(false);
    localStorage.setItem('wine-buddy-install-dismissed', 'true');
  };

  return {
    deferredPrompt,
    showInstallBanner,
    handleInstallClick,
    handleDismissClick,
    isInstalled,
  };
};
