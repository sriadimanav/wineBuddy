// guards/authGuards.ts
import { redirect } from '@tanstack/react-router';

import { authService } from './authService';

export const requireOnboarding = () => {
  const hasSeenOnboarding = authService.hasCompletedOnboarding();

  if (!hasSeenOnboarding) {
    throw redirect({ to: '/onboarding' });
  }
};

export const requireNoAuth = () => {
  const savedUser = authService.getUser();

  if (savedUser) {
    throw redirect({ to: '/' });
  }
};

export const requireAuth = () => {
  const savedUser = authService.getUser();

  if (!savedUser) {
    throw redirect({ to: '/auth' });
  }

  return savedUser;
};

export const createAuthGuard = () => {
  requireOnboarding();
  requireNoAuth();
};
