"use client";

import { useState, useEffect } from "react";

/**
 * Hook to track scroll progress as percentage (0-100)
 * Uses passive scroll listener for performance
 *
 * @returns Current scroll progress percentage
 *
 * Usage:
 * ```tsx
 * const progress = useScrollProgress();
 * // progress is 0-100 based on scroll position
 * ```
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // SSR safety check
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = window.scrollY;

      // Avoid division by zero
      const scrollable = scrollHeight - clientHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      const percent = (scrollTop / scrollable) * 100;
      // Clamp between 0 and 100
      setProgress(Math.min(100, Math.max(0, percent)));
    };

    // Initial calculation
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
