// types/onboarding.ts
import type { LucideIcon } from 'lucide-react';

export interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  iconComponent: LucideIcon;
  gradient: string;
}

export interface OnboardingScreenProps {
  onComplete: () => void;
}

export interface StepIndicatorProps {
  steps: readonly OnboardingStep[];
  currentStep: number;
  screenSize: string;
}

export interface StepContentProps {
  step: OnboardingStep;
  screenSize: string;
}

export interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  screenSize: string;
}
