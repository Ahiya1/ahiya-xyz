"use client";

/**
 * MagneticButton Component
 * Wrapper component that adds magnetic cursor attraction effect
 * Plan-17 Iteration-19
 */

import { motion, useSpring, type SpringOptions } from "framer-motion";
import { useCallback, useRef, type ReactNode, type CSSProperties } from "react";

import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { springPresets, useIsMobile, clamp } from "@/lib/animation-utils";

export interface MagneticButtonProps {
  children: ReactNode;
  /** Maximum pull distance in pixels (default: 8) */
  pullDistance?: number;
  /** Pull strength as fraction 0-1 (default: 0.4) */
  pullStrength?: number;
  /** Spring configuration */
  springConfig?: SpringOptions;
  /** Enable glow effect on proximity (default: true) */
  enableGlow?: boolean;
  /** Additional className */
  className?: string;
  /** Additional styles */
  style?: CSSProperties;
  /** Whether the effect is disabled */
  disabled?: boolean;
}

/**
 * MagneticButton wraps any element to add a magnetic cursor attraction effect.
 * The element smoothly follows the cursor position within a constrained distance.
 *
 * Features:
 * - Spring physics for smooth, natural movement
 * - Glow effect that intensifies on proximity
 * - Respects prefers-reduced-motion
 * - Automatically disabled on mobile/touch devices
 *
 * Usage:
 * ```tsx
 * <MagneticButton>
 *   <Button>Click me</Button>
 * </MagneticButton>
 * ```
 */
export function MagneticButton({
  children,
  pullDistance = 8,
  pullStrength = 0.4,
  springConfig = springPresets.magnetic,
  enableGlow = true,
  className = "",
  style,
  disabled = false,
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const glowOpacity = useSpring(0, { stiffness: 200, damping: 25 });

  const isDisabled = disabled || prefersReducedMotion || isMobile;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      // Cap the pull distance
      const cappedX = clamp(distX * pullStrength, -pullDistance, pullDistance);
      const cappedY = clamp(distY * pullStrength, -pullDistance, pullDistance);

      x.set(cappedX);
      y.set(cappedY);

      if (enableGlow) {
        // Calculate proximity (0-1, closer = higher)
        const dist = Math.sqrt(distX * distX + distY * distY);
        const maxGlowDistance = Math.max(rect.width, rect.height);
        const proximity = Math.max(0, 1 - dist / maxGlowDistance);
        glowOpacity.set(proximity * 0.5); // Max 50% opacity
      }
    },
    [isDisabled, pullDistance, pullStrength, x, y, enableGlow, glowOpacity]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    glowOpacity.set(0);
  }, [x, y, glowOpacity]);

  // If disabled, render children directly without wrapper animation
  if (isDisabled) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{ x, y, willChange: "transform", ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect layer */}
      {enableGlow && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-purple-500/30 blur-xl pointer-events-none"
          style={{ opacity: glowOpacity }}
          aria-hidden="true"
        />
      )}
      {children}
    </motion.div>
  );
}

export default MagneticButton;
