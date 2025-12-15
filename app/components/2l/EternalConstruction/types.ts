/**
 * Type definitions for EternalConstruction canvas animation
 * Defines all interfaces for nodes, lines, connections, structures, and state
 */

/** 2D point in canvas coordinate space */
export interface Point {
  x: number;
  y: number;
}

/** Velocity vector for movement animation */
export interface Velocity {
  dx: number;
  dy: number;
}

/** Node lifecycle phases */
export type NodePhase = 'spawning' | 'active' | 'fading';

/** Individual glowing node */
export interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;              // Velocity X (pixels per second)
  vy: number;              // Velocity Y (pixels per second)
  radius: number;          // Core radius in CSS pixels
  opacity: number;         // Current opacity 0-1
  phase: NodePhase;
  lifespan: number;        // Total lifespan in ms
  age: number;             // Current age in ms
  connections: Set<number>; // Connected node IDs
}

/** Line lifecycle phases */
export type LinePhase = 'extending' | 'locked' | 'fading';

/** Line connecting two nodes */
export interface Line {
  id: number;
  fromNodeId: number;
  toNodeId: number;
  progress: number;        // 0-1 extension progress
  phase: LinePhase;
  startTime: number;       // Timestamp when line started
  duration: number;        // Total travel duration in ms
  opacity: number;         // Current opacity 0-1
}

/** Connection pulse effect */
export interface ConnectionPulse {
  id: number;
  x: number;
  y: number;
  progress: number;        // 0-1 pulse progress
  startTime: number;
}

/** Persistent geometric structure */
export interface Structure {
  id: number;
  nodeIds: Set<number>;    // Nodes forming the structure
  lineIds: Set<number>;    // Lines in the structure
  opacity: number;         // Current opacity 0-1
  createdAt: number;       // Creation timestamp
  lifespan: number;        // Total lifespan in ms
  age: number;             // Current age in ms
  phase: StructurePhase;   // Current phase
}

/** Structure lifecycle phases */
export type StructurePhase = 'active' | 'fading';

/** Complete animation state */
export interface AnimationState {
  nodes: Map<number, Node>;
  lines: Map<number, Line>;
  structures: Map<number, Structure>;
  pulses: ConnectionPulse[];
  nextNodeId: number;
  nextLineId: number;
  nextStructureId: number;
  nextPulseId: number;
  lastNodeSpawn: number;
  lastLineSpawn: number;
  frameCount: number;
}

/** Canvas configuration */
export interface CanvasConfig {
  width: number;           // CSS pixels
  height: number;          // CSS pixels
  dpr: number;             // Device pixel ratio
  isMobile: boolean;
}

/** Performance metrics (development only) */
export interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  nodeCount: number;
  lineCount: number;
  structureCount: number;
}

/** Connection result when a line reaches its target */
export interface ConnectionResult {
  connected: boolean;
  fromNodeId: number;
  toNodeId: number;
  position: Point;
}
