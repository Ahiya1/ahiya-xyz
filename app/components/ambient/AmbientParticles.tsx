"use client";

import { useMemo, useState, useEffect } from "react";

/**
 * Particle data structure for ambient floating particles
 */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  speed: "slow" | "medium" | "fast";
  color: "purple" | "white";
}

/**
 * Deterministic particle generation to avoid hydration mismatch
 * Uses mathematical formula based on index instead of Math.random()
 *
 * @param count - Number of particles to generate
 * @returns Array of particle objects with deterministic properties
 */
export function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    // Pseudo-random but deterministic positioning
    x: ((i * 37 + 13) % 100),
    y: ((i * 53 + 7) % 100),
    // Size varies between 2-6px
    size: 2 + ((i * 7) % 5),
    // Animation delay varies 0-10s
    delay: ((i * 1.3) % 10),
    // Cycle through speed variants
    speed: (["slow", "medium", "fast"] as const)[i % 3],
    // Mostly purple, every 4th particle is white
    color: (i % 4 === 0 ? "white" : "purple") as Particle["color"],
  }));
}

/**
 * AmbientParticles - Floating particle system for atmospheric effect
 *
 * Features:
 * - Deterministic particle generation (no hydration mismatch)
 * - Mobile responsive (20 particles on desktop, 10 on mobile)
 * - Pure CSS animations for GPU acceleration
 * - Reduced motion support via CSS media query
 *
 * @example
 * ```tsx
 * <AmbientParticles />
 * ```
 */
export function AmbientParticles() {
  const [particleCount, setParticleCount] = useState(20);

  // Reduce particles on mobile for performance
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(max-width: 768px)");
    setParticleCount(mq.matches ? 10 : 20);

    const handler = (e: MediaQueryListEvent) => {
      setParticleCount(e.matches ? 10 : 20);
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Memoize particles to prevent regeneration on re-renders
  const particles = useMemo(
    () => generateParticles(particleCount),
    [particleCount]
  );

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className={`ambient-particle-float ambient-particle-${p.speed}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            // Use CSS custom property for animation delay
            "--particle-delay": `${p.delay}s`,
            backgroundColor:
              p.color === "purple"
                ? "rgba(168, 85, 247, 0.4)"
                : "rgba(255, 255, 255, 0.3)",
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}
