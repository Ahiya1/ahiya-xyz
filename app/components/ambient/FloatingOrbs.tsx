"use client";

/**
 * Orb configuration for corner positioning
 */
interface OrbConfig {
  id: number;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  size: number;
  color: "purple" | "cyan" | "pink";
  animationDelay: number;
  animationDuration: number;
}

/**
 * Pre-defined orb configurations for consistent positioning
 * Orbs are partially off-screen for subtle atmospheric effect
 */
const ORBS: OrbConfig[] = [
  {
    id: 0,
    position: { top: "-100px", left: "-100px" },
    size: 350,
    color: "purple",
    animationDelay: 0,
    animationDuration: 25,
  },
  {
    id: 1,
    position: { top: "30%", right: "-150px" },
    size: 280,
    color: "cyan",
    animationDelay: 5,
    animationDuration: 30,
  },
  {
    id: 2,
    position: { bottom: "-80px", left: "30%" },
    size: 320,
    color: "pink",
    animationDelay: 10,
    animationDuration: 28,
  },
  {
    id: 3,
    position: { bottom: "10%", right: "-120px" },
    size: 250,
    color: "purple",
    animationDelay: 8,
    animationDuration: 32,
  },
];

/**
 * FloatingOrbs - Large blurred atmospheric orbs in corners
 *
 * Features:
 * - 4 large orbs positioned partially off-screen
 * - Very low opacity (controlled by CSS) for subtle effect
 * - Large blur radius (80px) for atmospheric glow
 * - Pure CSS animations for GPU acceleration
 * - Reduced motion support via CSS media query
 *
 * The orbs create a subtle ambient glow effect that enhances
 * the cosmic/contemplative aesthetic without being distracting.
 *
 * @example
 * ```tsx
 * <FloatingOrbs />
 * ```
 */
export function FloatingOrbs() {
  return (
    <>
      {ORBS.map((orb) => (
        <div
          key={orb.id}
          className={`floating-orb floating-orb-${orb.color}`}
          style={{
            ...orb.position,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            // Use CSS custom property for varied animation timing
            "--orb-duration": `${orb.animationDuration}s`,
            animationDelay: `${orb.animationDelay}s`,
            // Very low opacity for subtle effect
            opacity: 0.15,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}
