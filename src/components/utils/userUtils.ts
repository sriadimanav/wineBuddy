// utils/userUtils.ts
import { GUEST_USER_DATA, SAMPLE_USER_DATA } from '@/constants/sampleData';
import type { User } from '@ts/index';

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const createUserWithSamples = (baseUser: User): User => ({
  ...baseUser,
  favorites: baseUser.favorites.length > 0 ? baseUser.favorites : [...SAMPLE_USER_DATA.favorites],
  streakCount: baseUser.streakCount > 0 ? baseUser.streakCount : SAMPLE_USER_DATA.streakCount,
  totalScans: baseUser.totalScans > 0 ? baseUser.totalScans : SAMPLE_USER_DATA.totalScans,
  badges: baseUser.badges.length > 0 ? baseUser.badges : [...SAMPLE_USER_DATA.badges],
});

export const createGuestUser = (): User => ({
  id: `guest-${generateId()}`,
  name: 'Wine Explorer',
  email: 'guest@winebuddy.com',
  favorites: [...GUEST_USER_DATA.favorites],
  streakCount: GUEST_USER_DATA.streakCount,
  totalScans: GUEST_USER_DATA.totalScans,
  badges: [...GUEST_USER_DATA.badges],
  isGuest: true,
});

export const extractNameFromEmail = (email: string): string => {
  return email.split('@')[0];
};
