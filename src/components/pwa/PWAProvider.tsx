// components/pwa/PWAProvider.tsx
import { useEffect } from 'react';
import { PWAInstallBanner } from './PWAInstallBanner';
import { PWAStatus } from './PWAStatus';
import { PWAService } from './pwaService';

interface PWAProviderProps {
  children: React.ReactNode;
}

export function PWAProvider({ children }: PWAProviderProps) {
  useEffect(() => {
    // Initialize PWA services
    PWAService.initializeWhenReady();
  }, []);

  return (
    <>
      {children}
      <PWAInstallBanner />
      <PWAStatus />

      {/* PWA Splash Screen Styles - Updated for Light Wine Rosé */}
      <style>{`
        @media (display-mode: standalone) {
          body {
            user-select: none;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
          }
        }
        
        /* iOS splash screen - Updated for rosé color scheme */
        @media (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
          .splash-screen {
            background: linear-gradient(135deg, #ad2831, #800e13);
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
          }
        }
        
        /* Enhanced visual richness for rosé theme */
        .wine-app-background {
          background: 
            radial-gradient(circle at 20% 80%, rgba(173, 40, 49, 0.015) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(100, 13, 20, 0.015) 0%, transparent 50%),
            linear-gradient(180deg, #fdf8f8 0%, #faf2f3 100%);
        }
        
        /* Light wine rosé themed scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #faf2f3;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #f0e1e3;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #ad2831;
        }
        
        /* Slide up animation for install banner */
        @keyframes slideUpAndFade {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
