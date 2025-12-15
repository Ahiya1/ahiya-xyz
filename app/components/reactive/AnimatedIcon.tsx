"use client";

/**
 * AnimatedIcon Component
 * Icon component with unique animations for different icon types
 * Plan-17 Iteration-19
 */

import { motion, type Variants } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";
import { Sparkles, Terminal, BarChart3, FlaskConical, type LucideIcon } from "lucide-react";

import { useReducedMotion } from "@/app/hooks/useReducedMotion";

/** Available icon types with unique animations */
export type IconType = "sparkles" | "terminal" | "barChart" | "flask";

export interface AnimatedIconProps {
  /** Type of icon to render */
  type: IconType;
  /** Whether the icon is in hover state */
  isHovered?: boolean;
  /** Enable idle animation (default: true) */
  enableIdle?: boolean;
  /** Idle animation delay in seconds (for staggering multiple icons) */
  idleDelay?: number;
  /** Icon size in pixels (default: 28) */
  size?: number;
  /** Additional className */
  className?: string;
  /** Icon color */
  color?: string;
  /** Additional styles */
  style?: CSSProperties;
}

/**
 * Unique animation variants for each icon type.
 * Each icon has distinct idle and hover animations that reflect its purpose.
 */
const iconVariants: Record<IconType, Variants> = {
  sparkles: {
    idle: {
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 5,
      },
    },
    hover: {
      rotate: [0, 15, -15, 10, -10, 0],
      scale: [1, 1.2, 1.1, 1.15, 1],
      transition: { duration: 0.6, ease: "easeOut" },
    },
    static: { rotate: 0, scale: 1 },
  },
  terminal: {
    idle: {
      // Cursor blink simulation via opacity
      opacity: [1, 1, 0.7, 1, 1, 0.7, 1],
      transition: {
        duration: 2,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 4,
      },
    },
    hover: {
      scale: [1, 1.1, 1.05],
      x: [0, -2, 2, 0],
      transition: { duration: 0.3 },
    },
    static: { opacity: 1, scale: 1, x: 0 },
  },
  barChart: {
    idle: {
      scaleY: [1, 1.05, 0.98, 1.02, 1],
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 6,
      },
    },
    hover: {
      scaleY: [1, 1.15, 1.1, 1.2, 1],
      transition: { duration: 0.4, ease: "easeOut" },
    },
    static: { scaleY: 1 },
  },
  flask: {
    idle: {
      rotate: [0, 3, -3, 2, -2, 0],
      y: [0, -2, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 5,
      },
    },
    hover: {
      rotate: [0, -10, 10, -5, 5, 0],
      scale: [1, 1.1, 1.05],
      transition: { duration: 0.5 },
    },
    static: { rotate: 0, y: 0, scale: 1 },
  },
};

/** Map icon types to Lucide icon components */
const iconComponents: Record<IconType, LucideIcon> = {
  sparkles: Sparkles,
  terminal: Terminal,
  barChart: BarChart3,
  flask: FlaskConical,
};

/**
 * AnimatedIcon renders a Lucide icon with unique hover and idle animations.
 * Different icon types have distinct animation patterns that reflect their purpose.
 *
 * Features:
 * - 4 unique icon types with custom animations
 * - Hover animation triggered by isHovered prop
 * - Periodic idle animation with configurable delay
 * - Respects prefers-reduced-motion
 *
 * Usage:
 * ```tsx
 * <AnimatedIcon
 *   type="sparkles"
 *   isHovered={isCardHovered}
 *   idleDelay={index * 2}
 *   size={28}
 * />
 * ```
 */
export function AnimatedIcon({
  type,
  isHovered = false,
  enableIdle = true,
  idleDelay = 0,
  size = 28,
  className = "",
  color,
  style,
}: AnimatedIconProps) {
  const prefersReducedMotion = useReducedMotion();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Delay idle animation start for staggered effect
  useEffect(() => {
    if (prefersReducedMotion || !enableIdle) return;

    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, idleDelay * 1000);

    return () => clearTimeout(timer);
  }, [idleDelay, enableIdle, prefersReducedMotion]);

  const IconComponent = iconComponents[type];
  const variants = iconVariants[type];

  // Determine animation state
  let animationState: "static" | "idle" | "hover" = "static";
  if (!prefersReducedMotion) {
    if (isHovered) {
      animationState = "hover";
    } else if (shouldAnimate && enableIdle) {
      animationState = "idle";
    }
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      animate={animationState}
      initial="static"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        originY: type === "barChart" ? 1 : 0.5, // Bars grow from bottom
        color,
        ...style,
      }}
    >
      <IconComponent
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

export default AnimatedIcon;
