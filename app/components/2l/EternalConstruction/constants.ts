/**
 * Configuration constants for EternalConstruction canvas animation
 */

/** Animation timing constants (milliseconds) */
export const TIMING = {
  // Node lifecycle
  NODE_LIFESPAN_MIN: 15_000,
  NODE_LIFESPAN_MAX: 30_000,
  NODE_SPAWN_INTERVAL: 1_500,
  NODE_FADE_IN: 2_000,
  NODE_FADE_OUT: 2_500,

  // Line travel
  LINE_TRAVEL_MIN: 2_000,
  LINE_TRAVEL_MAX: 4_000,
  LINE_SPAWN_INTERVAL: 800,

  // Connection effects
  CONNECTION_PULSE_DURATION: 300,

  // Structure persistence
  STRUCTURE_LIFESPAN_MIN: 10_000,
  STRUCTURE_LIFESPAN_MAX: 20_000,
  STRUCTURE_FADE_OUT: 2_500,

  // Frame timing
  MAX_DELTA: 100,          // Cap delta to prevent physics explosion
  RESIZE_DEBOUNCE: 100,
} as const;

/** Element count limits */
export const LIMITS = {
  // Desktop
  NODES_MIN: 20,
  NODES_MAX: 40,
  LINES_MAX: 20,
  STRUCTURES_MAX: 5,

  // Mobile (reduced for performance)
  NODES_MOBILE: 15,
  LINES_MOBILE: 8,
  STRUCTURES_MOBILE: 3,

  // Object pool sizes
  NODE_POOL_SIZE: 50,
  LINE_POOL_SIZE: 30,
} as const;

/** Physics constants */
export const PHYSICS = {
  // Node drift velocity (pixels per second)
  DRIFT_MIN: 2,
  DRIFT_MAX: 8,

  // Node sizes (CSS pixels)
  NODE_RADIUS_MIN: 3,
  NODE_RADIUS_MAX: 6,
  NODE_GLOW_MULTIPLIER: 3,  // Glow radius = radius * multiplier

  // Line dimensions
  LINE_WIDTH: 1.5,

  // Spawn margins (pixels from edge)
  SPAWN_MARGIN: 50,

  // Connection detection
  MIN_NODES_FOR_STRUCTURE: 3,
} as const;

/** Color definitions */
export const COLORS = {
  // Purple brand color (matches Tailwind purple-500)
  PURPLE: '168, 85, 247',   // RGB values for rgba()

  // Opacity levels
  NODE_GLOW_OPACITY: 0.6,
  NODE_GLOW_MID_OPACITY: 0.2,
  NODE_CORE_OPACITY: 0.8,
  LINE_ORIGIN_OPACITY: 0.12,
  LINE_DEST_OPACITY: 0.4,
  LINE_LOCKED_OPACITY: 0.6,
  STRUCTURE_FILL_OPACITY: 0.05,
  PULSE_OPACITY: 0.8,
} as const;

/** Mobile detection breakpoint */
export const MOBILE_BREAKPOINT = 768;
