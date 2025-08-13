// constants/sampleData.ts
export const SAMPLE_USER_DATA = {
  favorites: ['1', '3', '4', 'scan-1'],
  streakCount: 2,
  totalScans: 8,
  badges: ['first-scan', 'wine-explorer'],
} as const;

export const GUEST_USER_DATA = {
  favorites: ['1', '2', '3', '5'],
  streakCount: 3,
  totalScans: 12,
  badges: ['first-scan', 'wine-explorer'],
} as const;
