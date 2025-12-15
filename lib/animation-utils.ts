"use client";

/**
 * Animation Utilities
 * Spring presets and hooks for reactive animations
 * Plan-17 Iteration-19
 */

import { useState, useEffect } from "react";
import type { SpringOptions } from "framer-motion";

/**
 * Standardized spring configuration presets
 * Provides consistent animation feel across all reactive components
 */
export const springPresets = {
  /** Gentle - for subtle effects */
  gentle: { stiffness: 100, damping: 15, mass: 0.5 } as SpringOptions,

  /** Snappy - for quick responses */
  snappy: { stiffness: 300, damping: 20, mass: 0.5 } as SpringOptions,

  /** Magnetic - for button attraction (low mass = snappy response) */
  magnetic: { stiffness: 150, damping: 15, mass: 0.1 } as SpringOptions,

  /** Tilt - for 3D card rotation */
  tilt: { stiffness: 200, damping: 20, mass: 0.3 } as SpringOptions,

  /** Reveal - for scroll-triggered section reveals */
  reveal: { stiffness: 100, damping: 20, mass: 0.8 } as SpringOptions,

  /** Cascade - for sequential item animations */
  cascade: { stiffness: 80, damping: 15, mass: 0.5 } as SpringOptions,
} as const;

/**
 * Hook to detect mobile devices
 * Disables cursor effects on touch devices where hover doesn't apply
 *
 * @returns true if device is mobile (viewport <= 768px)
 *
 * Usage:
 * ```tsx
 * const isMobile = useIsMobile();
 * if (isMobile) {
 *   // Disable cursor-following effects
 * }
 * ```
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile;
}

/**
 * Throttle function for mouse event handlers
 * Limits execution to ~60fps for performance
 *
 * @param fn - Function to throttle
 * @param limit - Minimum ms between calls (default: 16.67ms = 60fps)
 * @returns Throttled function
 */
export function throttle<T extends (...args: Parameters<T>) => void>(
  fn: T,
  limit: number = 1000 / 60
): T {
  let lastCall = 0;
  return ((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  }) as T;
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculate distance between two points
 */
export function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * Map icon type to idle animation delay
 * Creates staggered effect when multiple icons animate
 *
 * @param index - Index of the icon in a list
 * @param baseDelay - Base delay in seconds (default: 2s)
 * @returns Delay in seconds
 */
export function getIconIdleDelay(index: number, baseDelay: number = 2): number {
  return index * baseDelay;
}

// Export types
export type SpringPreset = keyof typeof springPresets;
