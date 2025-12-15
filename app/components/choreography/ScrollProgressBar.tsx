"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/app/hooks/useScrollProgress";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

interface ScrollProgressBarProps {
  /** Height in pixels (default: 2) */
  height?: number;
  /** Background color (default: transparent) */
  bgColor?: string;
  /** Progress bar color (default: purple gradient) */
  barColor?: string;
  /** Additional className */
  className?: string;
}

/**
 * ScrollProgressBar shows scroll position as a horizontal progress bar.
 * Designed to be placed at the top of the navigation.
 *
 * Usage:
 * ```tsx
 * <nav className="fixed top-0 ...">
 *   <ScrollProgressBar />
 *   {/* rest of nav *\/}
 * </nav>
 * ```
 */
export function ScrollProgressBar({
  height = 2,
  bgColor = "transparent",
  barColor = "linear-gradient(90deg, #a855f7, #6366f1)",
  className = "",
}: ScrollProgressBarProps) {
  const progress = useScrollProgress();
  const prefersReducedMotion = useReducedMotion();

  // Hide when at top of page (less than 1% scrolled)
  if (progress < 1) {
    return null;
  }

  return (
    <div
      className={`absolute top-0 left-0 right-0 ${className}`}
      style={{ height: `${height}px`, backgroundColor: bgColor }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <motion.div
        className="h-full"
        style={{
          background: barColor,
          width: `${progress}%`,
        }}
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.1 }}
      />
    </div>
  );
}

export default ScrollProgressBar;
