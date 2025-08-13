// components/features/scan/ScanCameraView.tsx
interface ScanCameraViewProps {
  flashOn: boolean;
}

export function ScanCameraView({ flashOn }: ScanCameraViewProps) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
      {/* Mock camera feed pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.1) 10px,
              rgba(255,255,255,0.1) 20px
            )`,
          }}></div>
      </div>

      {/* Flash effect */}
      {flashOn && <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>}
    </div>
  );
}
