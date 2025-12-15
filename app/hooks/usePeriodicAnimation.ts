"use client";

import { useState, useEffect, useCallback } from "react";

interface UsePeriodicAnimationOptions {
  /** Interval between triggers in ms (default: 9000) */
  intervalMs?: number;
  /** Duration of animation in ms (default: 1500) */
  durationMs?: number;
  /** Initial delay before first trigger in ms (default: intervalMs) */
  initialDelayMs?: number;
  /** Whether the animation is enabled (default: true) */
  enabled?: boolean;
}

interface UsePeriodicAnimationReturn {
  /** Whether the animation is currently active */
  isAnimating: boolean;
  /** Manual trigger function for testing or imperative use */
  trigger: () => void;
}

/**
 * Hook to trigger periodic animations
 * Returns isAnimating state that goes true for durationMs every intervalMs
 *
 * @param options - Configuration options
 * @returns Object with isAnimating state and manual trigger function
 *
 * Usage:
 * ```tsx
 * const { isAnimating } = usePeriodicAnimation({
 *   intervalMs: 9000,
 *   durationMs: 1500,
 *   enabled: !prefersReducedMotion,
 * });
 * ```
 */
export function usePeriodicAnimation({
  intervalMs = 9000,
  durationMs = 1500,
  initialDelayMs,
  enabled = true,
}: UsePeriodicAnimationOptions = {}): UsePeriodicAnimationReturn {
  const [isAnimating, setIsAnimating] = useState(false);

  const trigger = useCallback(() => {
    setIsAnimating(true);
    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, durationMs);
    return () => clearTimeout(timeout);
  }, [durationMs]);

  useEffect(() => {
    if (!enabled) return;
    // SSR safety check
    if (typeof window === "undefined") return;

    // Initial delay (defaults to intervalMs if not specified)
    const delay = initialDelayMs ?? intervalMs;

    // First animation after initial delay
    const initialTimeout = setTimeout(() => {
      trigger();
    }, delay);

    // Regular interval for subsequent animations
    const interval = setInterval(() => {
      trigger();
    }, intervalMs);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [intervalMs, initialDelayMs, enabled, trigger]);

  return { isAnimating, trigger };
}
