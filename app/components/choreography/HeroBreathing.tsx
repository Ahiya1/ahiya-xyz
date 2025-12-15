"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

interface HeroBreathingProps {
  children: ReactNode;
  /** Scale amplitude (default: 1.005 means 1.0 to 1.005) */
  scaleAmplitude?: number;
  /** Animation duration in seconds (default: 6) */
  durationSeconds?: number;
  /** Additional className */
  className?: string;
}

/**
 * HeroBreathing wraps content with continuous subtle scale animation.
 * Creates "breathing" effect that makes hero feel alive.
 *
 * Usage:
 * ```tsx
 * <HeroBreathing>
 *   <h1 className="display-xl">Intention. Clarity. Results.</h1>
 * </HeroBreathing>
 * ```
 */
export function HeroBreathing({
  children,
  scaleAmplitude = 1.005,
  durationSeconds = 6,
  className = "",
}: HeroBreathingProps) {
  const prefersReducedMotion = useReducedMotion();

  // If reduced motion is preferred, render without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, scaleAmplitude, 1],
      }}
      transition={{
        duration: durationSeconds,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

export default HeroBreathing;
