// components/onboarding/StepContent.tsx
import { STEP_GRADIENTS } from '@/constants/onboarding';

import type { StepContentProps } from '@ts/index';

export function StepContent({ step, screenSize }: StepContentProps) {
  const IconComponent = step.iconComponent;

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
      {/* Icon */}
      <div
        className="rounded-full p-8 mb-8 shadow-2xl"
        style={{
          background: STEP_GRADIENTS[step.id as keyof typeof STEP_GRADIENTS],
        }}>
        <IconComponent className="w-16 h-16 text-white" />
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto">
        <h1
          className={`font-bold text-gray-900 mb-4 ${
            screenSize === 'kiosk' ? 'text-4xl' : 'text-3xl'
          }`}>
          {step.title}
        </h1>

        <h2
          className={`font-medium text-wine-accent mb-6 ${
            screenSize === 'kiosk' ? 'text-xl' : 'text-lg'
          }`}>
          {step.subtitle}
        </h2>

        <p
          className={`text-gray-600 leading-relaxed ${
            screenSize === 'kiosk' ? 'text-lg' : 'text-base'
          }`}>
          {step.description}
        </p>
      </div>
    </div>
  );
}
