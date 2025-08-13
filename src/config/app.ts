// config/app.ts
export const APP_CONFIG = {
  DEMO_DELAY: {
    AUTH: 1000,
    GUEST_LOGIN: 500,
  },
  VALIDATION: {
    MIN_PASSWORD_LENGTH: 6,
    EMAIL_REGEX: /\S+@\S+\.\S+/,
  },
  STORAGE_KEYS: {
    USER: 'wine-buddy-user',
    ONBOARDING: 'wine-buddy-onboarding-complete',
  },
} as const;
