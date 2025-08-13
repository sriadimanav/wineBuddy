// constants/onboarding.ts
import { ArrowRight, Award, Camera, ChevronRight, Heart, Wine } from 'lucide-react';

import type { OnboardingStep } from '@ts/index';

export const ONBOARDING_STEPS: readonly OnboardingStep[] = [
  {
    id: 1,
    title: 'Welcome to Wine Buddy',
    subtitle: 'Your personal wine discovery companion',
    description:
      'Discover, scan, and save your favorite wines with our comprehensive wine database and expert recommendations.',
    iconComponent: Wine,
    gradient: 'from-wine-darkest to-wine-dark',
  },
  {
    id: 2,
    title: 'Scan Wine Labels',
    subtitle: 'Instant wine identification',
    description:
      'Point your camera at any wine label or barcode to get detailed information, ratings, and tasting notes.',
    iconComponent: Camera,
    gradient: 'from-wine-dark to-wine-medium',
  },
  {
    id: 3,
    title: 'Build Your Collection',
    subtitle: 'Save and organize favorites',
    description:
      'Create your personal wine collection, track tastings, and get personalized recommendations.',
    iconComponent: Heart,
    gradient: 'from-wine-medium to-wine-light',
  },
  {
    id: 4,
    title: 'Earn Wine Badges',
    subtitle: 'Gamified wine journey',
    description:
      'Complete challenges, maintain streaks, and unlock achievements as you explore the world of wine.',
    iconComponent: Award,
    gradient: 'from-wine-light to-wine-accent',
  },
] as const;

export const STEP_GRADIENTS = {
  1: 'linear-gradient(135deg, #250902, #38040e)',
  2: 'linear-gradient(135deg, #38040e, #640d14)',
  3: 'linear-gradient(135deg, #640d14, #800e13)',
  4: 'linear-gradient(135deg, #800e13, #ad2831)',
} as const;

export const NAVIGATION_ICONS = {
  continue: ChevronRight,
  getStarted: ArrowRight,
} as const;
