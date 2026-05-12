import { Suspense } from 'react';

function SimpleRegressionPlaceholder() {
  return (
    <div
      className="regression-projection-card relative overflow-hidden rounded-2xl border border-[rgba(52,211,153,0.18)] bg-[rgba(15,15,15,0.8)] shadow-lg backdrop-blur-sm"
      aria-label="Interactive visualization placeholder"
    >
      {/* Card Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 sm:p-5 bg-gradient-to-b from-[rgba(2,6,4,0.9)] to-transparent pointer-events-none">
        <p className="text-xs sm:text-sm font-mono text-[#34d399] font-semibold tracking-wide">
          // matrix geometry
        </p>
      </div>

      {/* Canvas Container - Placeholder */}
      <div className="canvas-wrapper relative w-full h-full min-h-[280px] sm:min-h-[330px] lg:min-h-[430px] flex items-center justify-center">
        <div className="canvas-fallback flex items-center justify-center">
          <p className="text-[#34d399] text-sm font-mono">3D Visualization Loading...</p>
        </div>
      </div>

      {/* Formula Overlay */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
        <div className="bg-[rgba(2,6,4,0.88)] backdrop-blur-md border border-[rgba(52,211,153,0.2)] rounded-full px-4 py-2 sm:px-5 sm:py-2.5">
          <p className="font-mono text-xs sm:text-sm text-center whitespace-nowrap">
            <span className="text-[#f8fafc]">y</span>
            <span className="text-[#a0a0a0]"> = </span>
            <span className="text-[#22c55e]">ŷ</span>
            <span className="text-[#a0a0a0]"> + </span>
            <span className="text-[#fb923c]">e</span>
          </p>
        </div>
      </div>

      {/* Card Footer - Tags */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-3 sm:p-4 bg-gradient-to-t from-[rgba(2,6,4,0.95)] to-transparent flex flex-wrap gap-2 justify-center">
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-[rgba(248,250,252,0.08)] text-[#d1fae5] border border-[rgba(52,211,153,0.15)]">
          y observed
        </span>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-[rgba(34,197,94,0.08)] text-[#d1fae5] border border-[rgba(52,211,153,0.15)]">
          ŷ predicted
        </span>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-[rgba(251,146,60,0.08)] text-[#d1fae5] border border-[rgba(52,211,153,0.15)]">
          e residual
        </span>
      </div>
    </div>
  );
}

export function RegressionProjectionCard() {
  return (
    <Suspense fallback={<div className="regression-projection-card fallback" />}>
      <SimpleRegressionPlaceholder />
    </Suspense>
  );
}
