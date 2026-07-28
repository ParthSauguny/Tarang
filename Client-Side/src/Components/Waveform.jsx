import React from "react";

/**
 * Signature waveform motif for Tarang ("wave").
 * - animated=true: pulsing equalizer bars, used as the "thinking" indicator
 * - animated=false: static bars, used as a small logo mark
 */
function Waveform({ animated = false, size = "md", className = "" }) {
  const heights = [40, 70, 100, 65, 45];
  const sizeMap = {
    sm: { w: "w-3", gap: "gap-[2px]", maxH: 14 },
    md: { w: "w-1", gap: "gap-[3px]", maxH: 20 },
    lg: { w: "w-1.5", gap: "gap-1", maxH: 32 },
  };
  const s = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-end ${s.gap} ${className}`} aria-hidden="true">
      {heights.map((h, i) => (
        <span
          key={i}
          className={`${s.w} rounded-full bg-wave-gradient ${animated ? "animate-wave-bar" : ""}`}
          style={{
            height: `${(h / 100) * s.maxH}px`,
            animationDelay: animated ? `${i * 0.12}s` : undefined,
          }}
        />
      ))}
    </div>
  );
}

export default Waveform;
