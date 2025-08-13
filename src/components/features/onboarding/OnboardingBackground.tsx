// components/onboarding/OnboardingBackground.tsx
export function OnboardingBackground() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute top-20 left-10 w-32 h-32 rounded-full"
        style={{
          backgroundColor: '#ad2831',
          opacity: 0.15,
        }}
      />
      <div
        className="absolute bottom-20 right-10 w-24 h-24 rounded-full"
        style={{
          backgroundColor: '#640d14',
          opacity: 0.2,
        }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full"
        style={{
          backgroundColor: '#800e13',
          opacity: 0.18,
        }}
      />
    </div>
  );
}
