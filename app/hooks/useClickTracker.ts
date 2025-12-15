"use client";

/**
 * useClickTracker Hook
 * Tracks clicks on elements with data-track-click attributes
 * Uses document-level event delegation for efficiency
 * Plan-17 Iteration-19
 */

import { useEffect, useRef } from "react";

import { trackClick, trackConversion } from "@/lib/tracking";

export interface UseClickTrackerOptions {
  /** Data attribute to look for (default: data-track-click) */
  attribute?: string;
  /** Whether tracking is enabled */
  enabled?: boolean;
  /** Debounce rapid clicks in ms (default: 300) */
  debounceMs?: number;
}

/**
 * Sanitize tracking label to prevent injection
 * Only allow alphanumeric, underscore, hyphen, colon
 */
function sanitizeLabel(label: string): string {
  return label.replace(/[^a-zA-Z0-9_:-]/g, "").slice(0, 100);
}

/**
 * Hook to track clicks on elements with data-track-click attribute
 * Uses document-level event delegation for efficiency
 *
 * @param options - Configuration options
 * @param options.attribute - Data attribute name (default: "data-track-click")
 * @param options.enabled - Whether tracking is enabled (default: true)
 * @param options.debounceMs - Debounce rapid clicks (default: 300)
 *
 * @example
 * ```tsx
 * // Simple CTA tracking
 * <button data-track-click="hero_see_work">See the Work</button>
 *
 * // With category:label format
 * <a data-track-click="navigation:pricing">Pricing</a>
 *
 * // With conversion tracking
 * <button
 *   data-track-click="calcom_button"
 *   data-track-conversion="booking_intent"
 * >
 *   Book Call
 * </button>
 * ```
 */
export function useClickTracker(options: UseClickTrackerOptions = {}): void {
  const {
    attribute = "data-track-click",
    enabled = true,
    debounceMs = 300,
  } = options;

  const lastClickTimeRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;
    if (typeof document === "undefined") return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target) return;

      // Find the closest element with tracking attribute (handles nested elements)
      const trackable = target.closest(`[${attribute}]`) as HTMLElement | null;
      if (!trackable) return;

      const trackValue = trackable.getAttribute(attribute);
      if (!trackValue) return;

      // Debounce rapid clicks on same element
      const now = Date.now();
      const lastClick = lastClickTimeRef.current.get(trackValue) || 0;
      if (now - lastClick < debounceMs) return;
      lastClickTimeRef.current.set(trackValue, now);

      // Parse: "category:label" or just "label" (defaults to "cta" category)
      const sanitized = sanitizeLabel(trackValue);
      const parts = sanitized.split(":");
      const category = parts.length > 1 ? parts[0] : "cta";
      const label = parts.length > 1 ? parts[1] : parts[0];

      // Track the click (wrapped in try/catch for safety)
      try {
        trackClick(category, label);
      } catch {
        // Don't break user interaction if tracking fails
      }

      // Check for conversion attribute
      const conversionType = trackable.getAttribute("data-track-conversion");
      if (conversionType) {
        try {
          trackConversion(sanitizeLabel(conversionType));
        } catch {
          // Don't break user interaction if tracking fails
        }
      }
    };

    // Use capture phase to ensure we catch clicks before any stopPropagation
    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [attribute, enabled, debounceMs]);
}
