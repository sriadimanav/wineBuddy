// constants/routes.ts
export const HIDE_NAV_ROUTES = ['/onboarding', '/auth'];
export const HIDE_HEADER_ROUTES = ['/onboarding', '/auth', '/'];

export const getHeaderTitle = (pathname: string): string => {
  if (pathname === '/faq') return 'FAQ';
  if (pathname.startsWith('/wine/')) return 'Wine Details';
  return '';
};
