// types/layout.ts
import type { ReactNode } from 'react';

export type ScreenSize = 'mobile' | 'tablet' | 'desktop' | 'kiosk';

export interface LayoutProps {
  className?: string;
  children: ReactNode;
}
