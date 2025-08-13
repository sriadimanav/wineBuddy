// components/OnboardingScreen.tsx
import { useState } from 'react';

import { ONBOARDING_STEPS } from '@/constants/onboarding';

import { useScreenSize } from '@components/hooks/useMediaQueries';

import type { OnboardingScreenProps } from '@ts/index';

import { OnboardingBackground } from './OnboardingBackground';
import { StepContent } from './StepContent';
import { StepIndicator } from './StepIndicator';
import { StepNavigation } from './StepNavigation';

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const screenSize = useScreenSize();

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentStepData = ONBOARDING_STEPS[currentStep];
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <OnboardingBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <StepIndicator
            steps={ONBOARDING_STEPS}
            currentStep={currentStep}
            screenSize={screenSize}
          />

          {!isLastStep && (
            <button
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700 transition-colors px-4 py-2 rounded-md">
              Skip
            </button>
          )}
        </div>

        {/* Main Content */}
        <StepContent step={currentStepData} screenSize={screenSize} />

        {/* Bottom Actions */}
        <StepNavigation
          currentStep={currentStep}
          totalSteps={ONBOARDING_STEPS.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
          screenSize={screenSize}
        />
      </div>
    </div>
  );
}
