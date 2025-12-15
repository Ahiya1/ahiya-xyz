"use client";

/**
 * useTimeOnPage Hook
 * Tracks actual engagement time using the Visibility API
 * Excludes background tab time for accurate engagement metrics
 * Plan-17 Iteration-19
 */

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

import { trackEngagement } from "@/lib/tracking";

export interface UseTimeOnPageOptions {
  /** How often to send heartbeat in ms (default: 30000) */
  heartbeatIntervalMs?: number;
  /** Minimum time before tracking in ms (default: 5000) */
  minTimeToTrackMs?: number;
  /** Whether tracking is enabled */
  enabled?: boolean;
}

/**
 * Hook to track actual time spent on page
 * Uses Visibility API to track only active tab time
 * Sends heartbeats at intervals and final time on unload/navigation
 *
 * @param options - Configuration options
 * @param options.heartbeatIntervalMs - Heartbeat interval (default: 30000ms)
 * @param options.minTimeToTrackMs - Minimum time threshold (default: 5000ms)
 * @param options.enabled - Whether tracking is enabled (default: true)
 */
export function useTimeOnPage(options: UseTimeOnPageOptions = {}): void {
  const {
    heartbeatIntervalMs = 30000,
    minTimeToTrackMs = 5000,
    enabled = true,
  } = options;

  const pathname = usePathname();
  const accumulatedTimeRef = useRef<number>(0);
  const lastVisibleRef = useRef<number>(0);
  const hasSentFinalRef = useRef<boolean>(false);

  // Calculate total visible time
  const getTotalTime = useCallback((): number => {
    if (typeof document === "undefined") return 0;

    const currentAccumulated = accumulatedTimeRef.current;
    const additionalTime =
      document.visibilityState === "visible"
        ? Date.now() - lastVisibleRef.current
        : 0;

    return currentAccumulated + additionalTime;
  }, []);

  // Send final time (idempotent - only sends once)
  const sendFinalTime = useCallback(() => {
    if (hasSentFinalRef.current) return;

    const finalTime = getTotalTime();
    if (finalTime >= minTimeToTrackMs) {
      hasSentFinalRef.current = true;
      trackEngagement(finalTime);
    }
  }, [getTotalTime, minTimeToTrackMs]);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;
    if (typeof document === "undefined") return;

    // Reset on page change
    accumulatedTimeRef.current = 0;
    lastVisibleRef.current = Date.now();
    hasSentFinalRef.current = false;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Accumulate time when hiding
        accumulatedTimeRef.current += Date.now() - lastVisibleRef.current;
      } else {
        // Reset visibility timestamp when visible again
        lastVisibleRef.current = Date.now();
      }
    };

    // Heartbeat - send periodic updates
    const heartbeatInterval = setInterval(() => {
      if (document.visibilityState === "visible") {
        const currentTime = getTotalTime();
        if (currentTime >= minTimeToTrackMs) {
          trackEngagement(currentTime);
        }
      }
    }, heartbeatIntervalMs);

    // Send final time on beforeunload
    const handleBeforeUnload = () => {
      sendFinalTime();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(heartbeatInterval);
      // Send final time on cleanup (navigation)
      sendFinalTime();
    };
  }, [pathname, heartbeatIntervalMs, minTimeToTrackMs, enabled, getTotalTime, sendFinalTime]);
}
