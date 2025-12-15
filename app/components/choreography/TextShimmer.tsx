"use client";

import { type ReactNode } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { usePeriodicAnimation } from "@/app/hooks/usePeriodicAnimation";

interface TextShimmerProps {
  children: ReactNode;
  /** Interval between shimmers in ms (default: 9000) */
  intervalMs?: number;
  /** Duration of shimmer animation in ms (default: 1500) */
  durationMs?: number;
  /** Additional className */
  className?: string;
}

/**
 * TextShimmer wraps text content and applies periodic shimmer effect.
 * Uses CSS gradient mask animation triggered by state change.
 *
 * Usage:
 * ```tsx
 * <TextShimmer intervalMs={9000}>
 *   <h1>Intention. Clarity. Results.</h1>
 * </TextShimmer>
 * ```
 */
export function TextShimmer({
  children,
  intervalMs = 9000,
  durationMs = 1500,
  className = "",
}: TextShimmerProps) {
  const prefersReducedMotion = useReducedMotion();
  const { isAnimating } = usePeriodicAnimation({
    intervalMs,
    durationMs,
    enabled: !prefersReducedMotion,
  });

  // If reduced motion is preferred, render without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative ${className}`}>
      {children}
      {/* Shimmer overlay - only visible during animation */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isAnimating ? "animate-text-shimmer" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          mixBlendMode: "overlay",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export default TextShimmer;
