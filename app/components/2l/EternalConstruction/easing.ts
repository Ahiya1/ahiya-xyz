// File: app/components/2l/EternalConstruction/easing.ts

/**
 * Cubic ease-out - confident, purposeful deceleration
 * Use for: Line extension, node spawning
 * @pure
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Sine ease-in-out - ultra-smooth for breathing effects
 * Use for: Node fading, structure pulsing
 * @pure
 */
export function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

/**
 * Quadratic ease-out - softer than cubic
 * Use for: Gentle fade out
 * @pure
 */
export function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

/**
 * Exponential ease-out - sharp initial, long tail
 * Use for: Connection pulse brightness
 * @pure
 */
export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Linear interpolation between two values
 * @pure
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Clamp value between bounds
 * @pure
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Normalize value from one range to 0-1
 * @pure
 */
export function normalize(value: number, min: number, max: number): number {
  if (max === min) return 0;
  return clamp((value - min) / (max - min), 0, 1);
}

/**
 * Generate random value in range (inclusive)
 * @pure (given deterministic random)
 */
export function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}
