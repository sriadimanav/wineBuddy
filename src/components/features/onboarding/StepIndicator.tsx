// components/onboarding/StepIndicator.tsx
import type { StepIndicatorProps } from '@ts/index';

export function StepIndicator({ steps, currentStep, screenSize }: StepIndicatorProps) {
  return (
    <div className="flex space-x-2">
      {steps.map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index <= currentStep ? 'bg-wine-accent' : 'bg-gray-200'
          }`}
          style={{ width: screenSize === 'kiosk' ? '32px' : '24px' }}
        />
      ))}
    </div>
  );
}
