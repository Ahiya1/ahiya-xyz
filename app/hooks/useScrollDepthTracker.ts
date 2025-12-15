"use client";

/**
 * useScrollDepthTracker Hook
 * Tracks scroll depth milestones (25%, 50%, 75%, 100%) per page
 * Each milestone fires only once per page load, resets on navigation
 * Plan-17 Iteration-18
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { trackScroll } from "@/lib/tracking";

export interface UseScrollDepthTrackerOptions {
  milestones?: number[];
  throttleMs?: number;
  enabled?: boolean;
}

/**
 * Hook to track scroll depth milestones
 * Fires events at 25%, 50%, 75%, 100% scroll positions by default
 *
 * @param options - Configuration options
 * @param options.milestones - Array of percentages to track (default: [25, 50, 75, 100])
 * @param options.throttleMs - Throttle interval in ms (default: 250)
 * @param options.enabled - Whether tracking is enabled (default: true)
 */
export function useScrollDepthTracker(
  options: UseScrollDepthTrackerOptions = {}
): void {
  const { milestones = [25, 50, 75, 100], throttleMs = 250, enabled = true } = options;
  const pathname = usePathname();
  const hitMilestones = useRef<Set<number>>(new Set());
  const lastScrollTime = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    // Reset milestones on navigation
    hitMilestones.current = new Set();

    const handleScroll = () => {
      const now = Date.now();

      // Throttle scroll events
      if (now - lastScrollTime.current < throttleMs) return;
      lastScrollTime.current = now;

      // Calculate scroll percentage
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = window.scrollY;

      // Handle edge case where page is not scrollable
      if (scrollHeight <= clientHeight) {
        // Page fits in viewport - mark 100% immediately
        if (!hitMilestones.current.has(100) && milestones.includes(100)) {
          hitMilestones.current.add(100);
          trackScroll(100);
        }
        return;
      }

      const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;

      // Check each milestone
      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !hitMilestones.current.has(milestone)) {
          hitMilestones.current.add(milestone);
          trackScroll(milestone as 25 | 50 | 75 | 100);
        }
      }
    };

    // Check initial position (user might land mid-page via anchor)
    // Use requestAnimationFrame to wait for layout
    requestAnimationFrame(() => {
      handleScroll();
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, milestones, throttleMs, enabled]);
}
