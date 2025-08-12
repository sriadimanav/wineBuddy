import {
  ArrowRight,
  Award,
  Camera,
  ChevronRight,
  //Star,
  Heart,
  //BookOpen,
  Wine,
} from 'lucide-react'
import { useState } from 'react'

import { useScreenSize } from '@/components/hooks/useMediaQueries'

interface OnboardingScreenProps {
  onComplete: () => void
}

const onboardingSteps = [
  {
    id: 1,
    title: 'Welcome to Wine Buddy',
    subtitle: 'Your personal wine discovery companion',
    description:
      'Discover, scan, and save your favorite wines with our comprehensive wine database and expert recommendations.',
    icon: <Wine className="w-16 h-16 text-white" />,
    gradient: 'from-wine-darkest to-wine-dark',
  },
  {
    id: 2,
    title: 'Scan Wine Labels',
    subtitle: 'Instant wine identification',
    description:
      'Point your camera at any wine label or barcode to get detailed information, ratings, and tasting notes.',
    icon: <Camera className="w-16 h-16 text-white" />,
    gradient: 'from-wine-dark to-wine-medium',
  },
  {
    id: 3,
    title: 'Build Your Collection',
    subtitle: 'Save and organize favorites',
    description:
      'Create your personal wine collection, track tastings, and get personalized recommendations.',
    icon: <Heart className="w-16 h-16 text-white" />,
    gradient: 'from-wine-medium to-wine-light',
  },
  {
    id: 4,
    title: 'Earn Wine Badges',
    subtitle: 'Gamified wine journey',
    description:
      'Complete challenges, maintain streaks, and unlock achievements as you explore the world of wine.',
    icon: <Award className="w-16 h-16 text-white" />,
    gradient: 'from-wine-light to-wine-accent',
  },
]

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const screenSize = useScreenSize()

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const step = onboardingSteps[currentStep]
  const isLastStep = currentStep === onboardingSteps.length - 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div
          className="absolute top-20 left-10 w-32 h-32 rounded-full"
          style={{
            backgroundColor: '#ad2831',
            opacity: 0.15,
          }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-24 h-24 rounded-full"
          style={{
            backgroundColor: '#640d14',
            opacity: 0.2,
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full"
          style={{
            backgroundColor: '#800e13',
            opacity: 0.18,
          }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <div className="flex space-x-2">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-wine-accent' : 'bg-gray-200'
                }`}
                style={{ width: screenSize === 'kiosk' ? '32px' : '24px' }}
              />
            ))}
          </div>

          {!isLastStep && (
            <button
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700 transition-colors px-4 py-2 rounded-md"
            >
              Skip
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          {/* Icon */}
          <div
            className="rounded-full p-8 mb-8 shadow-2xl"
            style={{
              background:
                step.id === 1
                  ? 'linear-gradient(135deg, #250902, #38040e)'
                  : step.id === 2
                    ? 'linear-gradient(135deg, #38040e, #640d14)'
                    : step.id === 3
                      ? 'linear-gradient(135deg, #640d14, #800e13)'
                      : 'linear-gradient(135deg, #800e13, #ad2831)',
            }}
          >
            {step.icon}
          </div>

          {/* Content */}
          <div className="max-w-md mx-auto">
            <h1
              className={`font-bold text-gray-900 mb-4 ${
                screenSize === 'kiosk' ? 'text-4xl' : 'text-3xl'
              }`}
            >
              {step.title}
            </h1>

            <h2
              className={`font-medium text-wine-accent mb-6 ${
                screenSize === 'kiosk' ? 'text-xl' : 'text-lg'
              }`}
            >
              {step.subtitle}
            </h2>

            <p
              className={`text-gray-600 leading-relaxed ${
                screenSize === 'kiosk' ? 'text-lg' : 'text-base'
              }`}
            >
              {step.description}
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-6">
          <button
            onClick={handleNext}
            className={`w-full bg-wine-accent hover:bg-wine-light text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center ${
              screenSize === 'kiosk' ? 'py-5 text-lg' : 'py-4'
            }`}
          >
            {isLastStep ? 'Get Started' : 'Continue'}
            {isLastStep ? (
              <ArrowRight className="ml-2 w-5 h-5" />
            ) : (
              <ChevronRight className="ml-2 w-5 h-5" />
            )}
          </button>

          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="w-full mt-3 text-gray-500 hover:text-gray-700 transition-colors py-2"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
