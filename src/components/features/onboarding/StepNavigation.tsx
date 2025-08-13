// components/onboarding/StepNavigation.tsx
import { NAVIGATION_ICONS } from '@/constants/onboarding';
import type { StepNavigationProps } from '@ts/index';

export function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  screenSize,
}: StepNavigationProps) {
  const isLastStep = currentStep === totalSteps - 1;
  const ContinueIcon = isLastStep ? NAVIGATION_ICONS.getStarted : NAVIGATION_ICONS.continue;

  return (
    <div className="p-6">
      <button
        onClick={onNext}
        className={`w-full bg-wine-accent hover:bg-wine-light text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center ${
          screenSize === 'kiosk' ? 'py-5 text-lg' : 'py-4'
        }`}>
        {isLastStep ? 'Get Started' : 'Continue'}
        <ContinueIcon className="ml-2 w-5 h-5" />
      </button>

      {currentStep > 0 && (
        <button
          onClick={onPrevious}
          className="w-full mt-3 text-gray-500 hover:text-gray-700 transition-colors py-2">
          Back
        </button>
      )}
    </div>
  );
}
