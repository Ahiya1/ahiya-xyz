"use client";

/**
 * TrackingProvider - Root-level wrapper for analytics tracking
 * Initializes tracking library and scroll depth tracking
 * Plan-17 Iteration-18: The Living Site
 *
 * Features:
 * - Initializes tracking on mount
 * - Tears down tracking on unmount
 * - Enables scroll depth tracking for all pages
 * - SSR-safe (all effects run client-side only)
 */

import { useEffect } from "react";

import { initTracking, teardownTracking } from "@/lib/tracking";
import { useScrollDepthTracker } from "@/app/hooks/useScrollDepthTracker";

import type { ReactNode } from "react";

export interface TrackingProviderProps {
  /** Child components to wrap */
  children: ReactNode;
  /** Enable/disable tracking (default: true) */
  enabled?: boolean;
}

/**
 * TrackingProvider - Analytics tracking wrapper component
 *
 * Initializes the tracking library when mounted and provides
 * scroll depth tracking for all child pages.
 *
 * @param props - Configuration props
 * @param props.children - Child components
 * @param props.enabled - Enable/disable all tracking (default: true)
 *
 * @example
 * ```tsx
 * // In layout.tsx
 * <body>
 *   <TrackingProvider>
 *     {children}
 *   </TrackingProvider>
 * </body>
 * ```
 */
export function TrackingProvider({
  children,
  enabled = true,
}: TrackingProviderProps) {
  // Initialize tracking lifecycle
  useEffect(() => {
    if (!enabled) return;

    initTracking();
    return () => teardownTracking();
  }, [enabled]);

  // Track scroll depth on all pages
  useScrollDepthTracker({ enabled });

  return <>{children}</>;
}
