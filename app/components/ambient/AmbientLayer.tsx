"use client";

/**
 * AmbientLayer - Container for all ambient visual effects
 * Wraps AmbientParticles and FloatingOrbs in a fixed-position layer
 * Plan-17 Iteration-18: The Living Site
 *
 * Features:
 * - Fixed position covering entire viewport
 * - pointer-events: none to allow interaction with content below
 * - z-index: 0 places below body texture (z-1) and content (z-1+)
 * - aria-hidden for accessibility (purely decorative)
 * - overflow-hidden contains orbs that extend past viewport
 */

import { AmbientParticles } from "./AmbientParticles";
import { FloatingOrbs } from "./FloatingOrbs";

export interface AmbientLayerProps {
  /** Whether to show floating particles (default: true) */
  showParticles?: boolean;
  /** Whether to show corner orbs (default: true) */
  showOrbs?: boolean;
}

/**
 * AmbientLayer - Root-level ambient animation container
 *
 * Renders floating particles and glowing orbs as a decorative background layer.
 * Does not interfere with user interaction due to pointer-events: none.
 *
 * @param props - Configuration props
 * @param props.showParticles - Enable/disable particles (default: true)
 * @param props.showOrbs - Enable/disable orbs (default: true)
 *
 * @example
 * ```tsx
 * // In layout.tsx
 * <body>
 *   <AmbientLayer />
 *   {children}
 * </body>
 * ```
 */
export function AmbientLayer({
  showParticles = true,
  showOrbs = true,
}: AmbientLayerProps) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {showParticles && <AmbientParticles />}
      {showOrbs && <FloatingOrbs />}
    </div>
  );
}
