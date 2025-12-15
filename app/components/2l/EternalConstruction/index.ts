/**
 * EternalConstruction - Canvas background animation for 2L page
 *
 * A living visualization of the 2L development process:
 * - Nodes: Glowing points that spawn, drift, and fade
 * - Lines: Purposeful extensions between nodes
 * - Connections: Visual lock-in when lines reach targets
 * - Structures: Persistent geometric forms from connected nodes
 */

export { EternalConstruction } from "./EternalConstruction";
export { ObjectPool } from "./ObjectPool";

// Re-export types
export type {
  Node,
  Line,
  Structure,
  ConnectionPulse,
  AnimationState,
  CanvasConfig,
  Point,
  Velocity,
  NodePhase,
  LinePhase,
  PerformanceMetrics,
} from "./types";

// Re-export constants
export { TIMING, LIMITS, PHYSICS, COLORS, MOBILE_BREAKPOINT } from "./constants";

// Re-export easing functions
export {
  easeOutCubic,
  easeInOutSine,
  easeOutQuad,
  easeOutExpo,
  lerp,
  clamp,
  normalize,
} from "./easing";
