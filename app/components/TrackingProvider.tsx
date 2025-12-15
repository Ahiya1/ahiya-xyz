"use client";

/**
 * TrackingProvider - Root-level wrapper for analytics tracking
 * Initializes tracking library and behavioral tracking hooks
 * Plan-17 Iteration-18 + Iteration-19: The Living Site + Behavioral Tracking
 *
 * Features:
 * - Initializes tracking on mount
 * - Tears down tracking on unmount
 * - Enables scroll depth tracking for all pages
 * - Enables time-on-page tracking with Visibility API
 * - Enables click tracking via data attributes
 * - SSR-safe (all effects run client-side only)
 */

import { useEffect } from "react";

import { initTracking, teardownTracking } from "@/lib/tracking";
import { useScrollDepthTracker } from "@/app/hooks/useScrollDepthTracker";
import { useTimeOnPage } from "@/app/hooks/useTimeOnPage";
import { useClickTracker } from "@/app/hooks/useClickTracker";

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
 * comprehensive behavioral tracking for all child pages:
 * - Scroll depth tracking
 * - Time on page tracking (using Visibility API)
 * - Click tracking (via data-track-click attributes)
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

  // Track actual time spent on page (using Visibility API)
  useTimeOnPage({ enabled });

  // Track clicks on elements with data-track-click attributes
  useClickTracker({ enabled });

  return <>{children}</>;
}
