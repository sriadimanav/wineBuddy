// routes/__root.tsx
import * as React from 'react';

import { authService } from '@components/features/auth/authService';
import { useNavigationState } from '@components/features/auth/useNavigationState';
import { AppHeader } from '@components/features/root/AppHeader';
import { LoadingScreen } from '@components/features/root/LoadingScreen';
import { NotFound } from '@components/features/root/NotFound';
import { useScreenSize } from '@components/hooks/useMediaQueries';
import { BottomNav } from '@components/layout/BottomNav';
import { ResponsiveLayout } from '@components/layout/ResponsiveLayout';
import { Outlet, createRootRoute, useLocation, useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export interface Wine {
  id: string;
  name: string;
  winery: string;
  vintage: number;
  region: string;
  description: string;
  grapeVariety: string[];
  color: string;
  alcoholContent: number;
  sugarContent: string;
  taste: string[];
  aroma: string[];
  foodPairing: string[];
  rating: number;
  reviews: number;
  sommelierNotes: string;
  image: string;
  price?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  favorites: string[];
  streakCount: number;
  totalScans: number;
  badges: string[];
  isGuest?: boolean;
}

function RootComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const screenSize = useScreenSize();
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState<User | null>(null);

  // Get navigation state
  const { showHeader, showBottomNav, headerTitle } = useNavigationState(
    user,
    location.pathname,
    isLoading,
  );

  React.useEffect(() => {
    const savedUser = authService.getUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const handleGoBack = React.useCallback(() => {
    navigate({ to: '/' });
  }, [navigate]);

  // Show loading while checking user state
  if (isLoading) {
    return <LoadingScreen screenSize={screenSize} />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-background)',
        paddingBottom: showBottomNav ? (screenSize === 'kiosk' ? '80px' : '64px') : '0',
      }}>
      {/* Header */}
      {showHeader && (
        <AppHeader onGoBack={handleGoBack} title={headerTitle} screenSize={screenSize} />
      )}

      {/* Main Content */}
      <ResponsiveLayout>
        <Outlet />
      </ResponsiveLayout>

      {/* Bottom Navigation */}
      {showBottomNav && <BottomNav />}

      <TanStackRouterDevtools />
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});
