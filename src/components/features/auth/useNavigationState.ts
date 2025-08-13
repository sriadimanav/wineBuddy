// hooks/useNavigationState.ts
import { useMemo } from 'react';

import { HIDE_HEADER_ROUTES, HIDE_NAV_ROUTES, getHeaderTitle } from '@/constants/routes';
import type { User } from '@ts/index';

interface NavigationState {
  showHeader: boolean;
  showBottomNav: boolean;
  headerTitle: string;
}

export const useNavigationState = (
  user: User | null,
  pathname: string,
  isLoading: boolean,
): NavigationState => {
  return useMemo(() => {
    const showHeader = !!(
      user &&
      !HIDE_HEADER_ROUTES.includes(pathname) &&
      (pathname.startsWith('/wine/') || pathname === '/faq')
    );

    const showBottomNav = !isLoading && !HIDE_NAV_ROUTES.includes(pathname);

    const headerTitle = getHeaderTitle(pathname);

    return {
      showHeader,
      showBottomNav,
      headerTitle,
    };
  }, [user, pathname, isLoading]);
};
