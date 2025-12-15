"use client";

/**
 * TiltCard Component
 * Wrapper component that adds 3D perspective tilt effect on hover
 * Plan-17 Iteration-19
 */

import { motion, useSpring, useMotionTemplate, type SpringOptions } from "framer-motion";
import {
  useCallback,
  useRef,
  type ReactNode,
  type CSSProperties,
} from "react";

import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { springPresets, useIsMobile } from "@/lib/animation-utils";

export interface TiltCardProps {
  children: ReactNode;
  /** Maximum tilt angle in degrees (default: 8) */
  maxTilt?: number;
  /** Spring configuration */
  springConfig?: SpringOptions;
  /** Perspective distance in pixels (default: 1000) */
  perspective?: number;
  /** Enable shine effect following tilt (default: true) */
  enableShine?: boolean;
  /** Additional className for the inner motion div */
  className?: string;
  /** Additional styles for the inner motion div */
  style?: CSSProperties;
  /** Whether the effect is disabled */
  disabled?: boolean;
}

/**
 * TiltCard wraps any content to add a 3D perspective tilt effect.
 * The card tilts based on mouse position, creating depth and interactivity.
 *
 * Features:
 * - 3D perspective transforms with configurable max tilt
 * - Optional shine effect that follows tilt direction
 * - Spring physics for smooth, natural movement
 * - Respects prefers-reduced-motion
 * - Automatically disabled on mobile/touch devices
 *
 * Usage:
 * ```tsx
 * <TiltCard maxTilt={6}>
 *   <Card>
 *     <CardContent />
 *   </Card>
 * </TiltCard>
 * ```
 */
export function TiltCard({
  children,
  maxTilt = 8,
  springConfig = springPresets.tilt,
  perspective = 1000,
  enableShine = true,
  className = "",
  style,
  disabled = false,
}: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const shineX = useSpring(50, springConfig);
  const shineY = useSpring(50, springConfig);

  // Create motion template for shine gradient position
  const shineBackground = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.15), transparent 60%)`;

  const isDisabled = disabled || prefersReducedMotion || isMobile;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mouse position relative to card center (-0.5 to 0.5)
      const xRatio = (e.clientX - rect.left) / width - 0.5;
      const yRatio = (e.clientY - rect.top) / height - 0.5;

      // Convert to rotation angles
      // Note: rotateX controls vertical tilt, rotateY controls horizontal
      // Invert Y for natural feel (mouse up = card tilts back)
      rotateX.set(-yRatio * maxTilt * 2);
      rotateY.set(xRatio * maxTilt * 2);

      // Update shine position (as percentage)
      if (enableShine) {
        shineX.set((xRatio + 0.5) * 100);
        shineY.set((yRatio + 0.5) * 100);
      }
    },
    [isDisabled, maxTilt, rotateX, rotateY, enableShine, shineX, shineY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    shineX.set(50);
    shineY.set(50);
  }, [rotateX, rotateY, shineX, shineY]);

  if (isDisabled) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={containerRef}
        className={`relative ${className}`}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
          ...style,
        }}
      >
        {/* Shine overlay */}
        {enableShine && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            style={{ background: shineBackground }}
            aria-hidden="true"
          />
        )}
        {children}
      </motion.div>
    </div>
  );
}

export default TiltCard;
