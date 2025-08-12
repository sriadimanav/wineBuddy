import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'

// Import the generated route tree
import { routeTree } from './routeTree.gen.ts'

//import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import './styles/globals.css'
import { debugLog, isDevelopment, isOnline, isPWAInstalled } from './utils/pwa'

// PWA Install Interface
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

// PWA Install Banner Component
function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallBanner, setShowInstallBanner] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()

      const event = e as BeforeInstallPromptEvent
      setDeferredPrompt(event)

      // Show install banner if not already installed
      if (
        !isPWAInstalled() &&
        !localStorage.getItem('wine-buddy-install-dismissed')
      ) {
        setShowInstallBanner(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      )
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('User accepted the PWA install prompt')
    } else {
      console.log('User dismissed the PWA install prompt')
    }

    // Clear the prompt
    setDeferredPrompt(null)
    setShowInstallBanner(false)
  }

  const handleDismissClick = () => {
    setShowInstallBanner(false)
    localStorage.setItem('wine-buddy-install-dismissed', 'true')
  }

  if (!showInstallBanner || !deferredPrompt) {
    return null
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
            className="bg-white text-wine-accent px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors wine-hover-lift"
          >
            Install
          </button>
          <button
            onClick={handleDismissClick}
            className="text-white/80 hover:text-white transition-colors p-1"
          >
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
  )
}

// PWA Status Component for debugging
function PWAStatus() {
  const [onlineStatus, setOnlineStatus] = useState(isOnline())
  const [installed, setInstalled] = useState(isPWAInstalled())

  useEffect(() => {
    // Monitor online/offline status
    const handleOnline = () => setOnlineStatus(true)
    const handleOffline = () => setOnlineStatus(false)

    // Check installation status periodically
    const checkInstallation = () => setInstalled(isPWAInstalled())

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check installation status on app state changes
    window.addEventListener('beforeinstallprompt', checkInstallation)
    window.addEventListener('appinstalled', checkInstallation)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('beforeinstallprompt', checkInstallation)
      window.removeEventListener('appinstalled', checkInstallation)
    }
  }, [])

  // Only show status in development
  if (!isDevelopment()) {
    return null
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
  )
}

//

const queryClient = new QueryClient()

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
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
      `}</style>
      </ErrorBoundary>
    </StrictMode>,
  )
}

// PWA Registration - Optional and Safe
let updateSW: ((reloadPage?: boolean) => Promise<void>) | undefined

// Initialize PWA features if available
const initializePWA = async () => {
  try {
    if ('serviceWorker' in navigator && !isDevelopment()) {
      // Only in production mode
      const { registerSW } = await import('virtual:pwa-register')

      updateSW = registerSW({
        onNeedRefresh() {
          debugLog('PWA update available')
          if (confirm('New version available! Reload to update?')) {
            updateSW?.(true)
          }
        },
        onOfflineReady() {
          debugLog('App ready to work offline')
          // Show a subtle notification that app works offline
          const toast = document.createElement('div')
          toast.textContent = 'Wine Buddy is ready to work offline!'
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
          `
          document.body.appendChild(toast)
          setTimeout(() => {
            toast.remove()
          }, 3000)
        },
        immediate: true,
      })

      debugLog('PWA features initialized successfully')
    } else if (isDevelopment()) {
      debugLog('PWA features disabled in development mode')
    } else {
      debugLog('Service Worker not supported')
    }
  } catch (error) {
    debugLog('PWA registration failed, continuing without PWA features:', error)
    // App continues to work without PWA features
  }
}

// Initialize PWA after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePWA)
} else {
  initializePWA()
}

// PWA install prompt
window.addEventListener('load', () => {
  // Check if app is already installed
  if (isPWAInstalled()) {
    debugLog('Wine Buddy is running as installed PWA')
  } else {
    debugLog('Wine Buddy is running in browser mode')
  }
})

// Service worker update check
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SW_UPDATE_AVAILABLE') {
      if (confirm('New version of Wine Buddy is available! Update now?')) {
        window.location.reload()
      }
    }
  })
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
