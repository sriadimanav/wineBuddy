// services/authService.ts
import { APP_CONFIG } from '@/config/app';
import type { User } from '@ts/index';

export const authService = {
  saveUser: (user: User): void => {
    try {
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save user to localStorage:', error);
    }
  },

  getUser: (): User | null => {
    try {
      const saved = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to get user from localStorage:', error);
      return null;
    }
  },

  clearUser: (): void => {
    try {
      localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.USER);
    } catch (error) {
      console.error('Failed to clear user from localStorage:', error);
    }
  },

  hasCompletedOnboarding: (): boolean => {
    try {
      return !!localStorage.getItem(APP_CONFIG.STORAGE_KEYS.ONBOARDING);
    } catch (error) {
      console.error('Failed to check onboarding status:', error);
      return false;
    }
  },

  setOnboardingComplete: (): void => {
    try {
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.ONBOARDING, 'true');
    } catch (error) {
      console.error('Failed to set onboarding complete:', error);
    }
  },
};
