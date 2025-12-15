# Code Patterns & Conventions

## File Structure

```
app/
  components/
    2l/
      EternalConstruction/
        index.ts                    # Re-exports
        EternalConstruction.tsx     # Main React component
        types.ts                    # TypeScript interfaces
        constants.ts                # Configuration constants
        geometry.ts                 # Pure geometry functions
        easing.ts                   # Pure easing functions
        ObjectPool.ts               # Object pooling class
        canvas-renderer.ts          # Canvas drawing functions
        node-system.ts              # Node management logic
        line-system.ts              # Line management logic
        connection-system.ts        # Connection detection
        structure-system.ts         # Structure management
        __tests__/
          geometry.test.ts
          easing.test.ts
          ObjectPool.test.ts
          node-system.test.ts
          line-system.test.ts
          connection-system.test.ts
  hooks/
    useReducedMotion.ts             # Existing hook (DO NOT MODIFY)
  2l/
    page.tsx                        # Integration point
```

## Naming Conventions

- **Components**: PascalCase (`EternalConstruction.tsx`)
- **Utility Files**: camelCase (`geometry.ts`, `canvas-renderer.ts`)
- **Types**: PascalCase with descriptive names (`Node`, `AnimationState`)
- **Functions**: camelCase verb-noun (`calculateDistance`, `renderNodes`)
- **Constants**: SCREAMING_SNAKE_CASE in const objects (`TIMING.NODE_LIFESPAN_MIN`)
- **Test Files**: `{module}.test.ts` in `__tests__/` directory
- **IDs**: Numeric incrementing integers (not UUIDs for performance)

## Import Order Convention

```typescript
// 1. React imports
import { useRef, useEffect, useCallback, useState } from 'react';

// 2. External libraries (none expected for this component)

// 3. Internal absolute imports
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

// 4. Relative imports - types first
import type { AnimationState, CanvasConfig, Node, Line } from './types';

// 5. Relative imports - utilities
import { TIMING, LIMITS, COLORS } from './constants';
import { distance, randomPosition, randomVelocity } from './geometry';
import { easeOutCubic, lerp, clamp } from './easing';

// 6. Relative imports - systems
import { createInitialState, updateState } from './state';
import { render } from './canvas-renderer';
```

---

## TypeScript Types Pattern

### Core Types (types.ts)

```typescript
// File: app/components/2l/EternalConstruction/types.ts

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
}

/** Complete animation state */
export interface AnimationState {
  nodes: Map<number, Node>;
  lines: Map<number, Line>;
  structures: Map<number, Structure>;
  pulses: ConnectionPulse[];
  nextNodeId: number;
  nextLineId: number;
  nextStructureId: number;
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
```

---

## Constants Pattern

### Configuration Constants (constants.ts)

```typescript
// File: app/components/2l/EternalConstruction/constants.ts

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
```

---

## Canvas Component Pattern

### Main Component (EternalConstruction.tsx)

```typescript
// File: app/components/2l/EternalConstruction/EternalConstruction.tsx
"use client";

import { useRef, useEffect, useCallback, useState } from 'react';
import type { AnimationState, CanvasConfig } from './types';
import { TIMING, LIMITS, MOBILE_BREAKPOINT } from './constants';
import { createInitialState, updateState } from './state';
import { render } from './canvas-renderer';

interface EternalConstructionProps {
  className?: string;
}

export function EternalConstruction({ className }: EternalConstructionProps) {
  // Refs for canvas and animation
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Animation state (in ref to avoid re-renders)
  const stateRef = useRef<AnimationState | null>(null);
  const configRef = useRef<CanvasConfig | null>(null);
  const frameIdRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Visibility tracking
  const isDocumentVisibleRef = useRef(true);
  const isInViewportRef = useRef(true);

  // React state for mount lifecycle only
  const [mounted, setMounted] = useState(false);

  // Setup canvas with DPR handling
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return null;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    const isMobile = rect.width < MOBILE_BREAKPOINT;

    // Set canvas internal resolution
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Set CSS display size
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Get and scale context
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctxRef.current = ctx;
    }

    const config: CanvasConfig = {
      width: rect.width,
      height: rect.height,
      dpr,
      isMobile,
    };

    configRef.current = config;
    return config;
  }, []);

  // Animation loop
  const animate = useCallback((timestamp: DOMHighResTimeStamp) => {
    // Always schedule next frame first
    frameIdRef.current = requestAnimationFrame(animate);

    // Skip if not visible (CPU savings)
    if (!isDocumentVisibleRef.current || !isInViewportRef.current) {
      lastTimeRef.current = timestamp;
      return;
    }

    const ctx = ctxRef.current;
    const state = stateRef.current;
    const config = configRef.current;
    if (!ctx || !state || !config) return;

    // Calculate delta time with cap
    const deltaTime = Math.min(timestamp - lastTimeRef.current, TIMING.MAX_DELTA);
    lastTimeRef.current = timestamp;

    // Update state
    stateRef.current = updateState(state, config, deltaTime, timestamp);

    // Render frame
    render(ctx, stateRef.current, config);
  }, []);

  // Initialize on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Setup canvas and start animation
  useEffect(() => {
    if (!mounted) return;

    const config = setupCanvas();
    if (!config) return;

    stateRef.current = createInitialState();
    lastTimeRef.current = performance.now();
    frameIdRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameIdRef.current);
    };
  }, [mounted, setupCanvas, animate]);

  // Document visibility handling
  useEffect(() => {
    const handleVisibilityChange = () => {
      isDocumentVisibleRef.current = document.visibilityState === 'visible';
      if (isDocumentVisibleRef.current) {
        lastTimeRef.current = performance.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Viewport visibility via IntersectionObserver
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        isInViewportRef.current = entries[0]?.isIntersecting ?? false;
        if (isInViewportRef.current) {
          lastTimeRef.current = performance.now();
        }
      },
      { threshold: 0.01, rootMargin: '50px' }
    );

    observer.observe(canvas);
    return () => observer.disconnect();
  }, [mounted]);

  // Resize handling with debounce
  useEffect(() => {
    if (!mounted) return;

    let timeoutId: number;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setupCanvas();
      }, TIMING.RESIZE_DEBOUNCE);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mounted, setupCanvas]);

  // Don't render until mounted (SSR safety)
  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-0 pointer-events-none overflow-hidden ${className || ''}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
}

export default EternalConstruction;
```

---

## Animation Loop Pattern

### Delta Time Animation

```typescript
// Pattern: Delta-time normalized animation loop
const animate = useCallback((timestamp: DOMHighResTimeStamp) => {
  // 1. Schedule next frame immediately (ensures consistent timing)
  frameIdRef.current = requestAnimationFrame(animate);

  // 2. Early exit if not visible
  if (!isVisibleRef.current) {
    lastTimeRef.current = timestamp;
    return;
  }

  // 3. Calculate delta with cap (prevents physics explosion after tab switch)
  const deltaTime = Math.min(timestamp - lastTimeRef.current, MAX_DELTA);
  lastTimeRef.current = timestamp;

  // 4. Update state (pure function)
  stateRef.current = updateState(stateRef.current, config, deltaTime, timestamp);

  // 5. Render (pure function)
  render(ctx, stateRef.current, config);
}, []);
```

### Time-Based Value Updates

```typescript
// Pattern: Update values based on delta time
function updateNode(node: Node, deltaTime: number): Node {
  // Convert deltaTime (ms) to seconds for physics
  const dt = deltaTime / 1000;

  return {
    ...node,
    // Position update (velocity is pixels/second)
    x: node.x + node.vx * dt,
    y: node.y + node.vy * dt,
    // Age update (in milliseconds)
    age: node.age + deltaTime,
  };
}
```

---

## Pure Functions Pattern

### Geometry Functions (geometry.ts)

```typescript
// File: app/components/2l/EternalConstruction/geometry.ts

import type { Point, Node } from './types';
import { PHYSICS } from './constants';

/**
 * Calculate Euclidean distance between two points
 * @pure
 */
export function distance(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate distance between two nodes
 * @pure
 */
export function nodeDistance(n1: Node, n2: Node): number {
  return distance({ x: n1.x, y: n1.y }, { x: n2.x, y: n2.y });
}

/**
 * Generate random position within bounds with margin
 * @pure (given deterministic random)
 */
export function randomPosition(
  width: number,
  height: number,
  margin: number = PHYSICS.SPAWN_MARGIN
): Point {
  return {
    x: margin + Math.random() * (width - 2 * margin),
    y: margin + Math.random() * (height - 2 * margin),
  };
}

/**
 * Generate random velocity within speed range
 * @pure (given deterministic random)
 */
export function randomVelocity(
  minSpeed: number = PHYSICS.DRIFT_MIN,
  maxSpeed: number = PHYSICS.DRIFT_MAX
): { vx: number; vy: number } {
  const angle = Math.random() * Math.PI * 2;
  const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
  return {
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
  };
}

/**
 * Generate random value in range
 * @pure (given deterministic random)
 */
export function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * Bounce velocity off bounds
 * @pure
 */
export function bounceVelocity(
  x: number,
  y: number,
  vx: number,
  vy: number,
  width: number,
  height: number,
  margin: number = PHYSICS.SPAWN_MARGIN
): { vx: number; vy: number } {
  let newVx = vx;
  let newVy = vy;

  if (x <= margin || x >= width - margin) {
    newVx = -vx;
  }
  if (y <= margin || y >= height - margin) {
    newVy = -vy;
  }

  return { vx: newVx, vy: newVy };
}

/**
 * Clamp position within bounds
 * @pure
 */
export function clampPosition(
  x: number,
  y: number,
  width: number,
  height: number,
  margin: number = PHYSICS.SPAWN_MARGIN
): Point {
  return {
    x: Math.max(margin, Math.min(width - margin, x)),
    y: Math.max(margin, Math.min(height - margin, y)),
  };
}

/**
 * Calculate center point of multiple nodes
 * @pure
 */
export function calculateCenter(nodes: Node[]): Point {
  if (nodes.length === 0) return { x: 0, y: 0 };

  const sum = nodes.reduce(
    (acc, node) => ({ x: acc.x + node.x, y: acc.y + node.y }),
    { x: 0, y: 0 }
  );

  return {
    x: sum.x / nodes.length,
    y: sum.y / nodes.length,
  };
}
```

### Easing Functions (easing.ts)

```typescript
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
```

---

## Object Pooling Pattern

### Generic Object Pool (ObjectPool.ts)

```typescript
// File: app/components/2l/EternalConstruction/ObjectPool.ts

/**
 * Generic object pool for reusing animation entities
 * Prevents garbage collection pauses during 60fps animation
 */
export class ObjectPool<T> {
  private pool: T[] = [];
  private factory: () => T;
  private reset: (obj: T) => void;

  constructor(
    factory: () => T,
    reset: (obj: T) => void,
    initialSize: number = 50
  ) {
    this.factory = factory;
    this.reset = reset;

    // Pre-populate pool
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(factory());
    }
  }

  /**
   * Acquire an object from the pool (creates new if empty)
   */
  acquire(): T {
    if (this.pool.length > 0) {
      return this.pool.pop()!;
    }
    return this.factory();
  }

  /**
   * Release an object back to the pool
   */
  release(obj: T): void {
    this.reset(obj);
    this.pool.push(obj);
  }

  /**
   * Get current available count
   */
  get available(): number {
    return this.pool.length;
  }

  /**
   * Clear the pool completely
   */
  clear(): void {
    this.pool = [];
  }
}
```

### Node Pool Factory

```typescript
// Pattern: Creating a node pool
import type { Node } from './types';
import { LIMITS } from './constants';

export function createNodePool(): ObjectPool<Node> {
  return new ObjectPool<Node>(
    // Factory: create new node
    () => ({
      id: 0,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: 0,
      opacity: 0,
      phase: 'spawning',
      lifespan: 0,
      age: 0,
      connections: new Set<number>(),
    }),
    // Reset: clear node state
    (node) => {
      node.id = 0;
      node.x = 0;
      node.y = 0;
      node.vx = 0;
      node.vy = 0;
      node.radius = 0;
      node.opacity = 0;
      node.phase = 'spawning';
      node.lifespan = 0;
      node.age = 0;
      node.connections.clear();
    },
    // Initial size
    LIMITS.NODE_POOL_SIZE
  );
}
```

---

## Canvas Rendering Pattern

### Rendering Pipeline (canvas-renderer.ts)

```typescript
// File: app/components/2l/EternalConstruction/canvas-renderer.ts

import type { AnimationState, CanvasConfig, Node, Line, Structure, ConnectionPulse } from './types';
import { COLORS, PHYSICS } from './constants';

/**
 * Main render function - clears and redraws entire canvas
 * Render order is critical for correct visual layering
 */
export function render(
  ctx: CanvasRenderingContext2D,
  state: AnimationState,
  config: CanvasConfig
): void {
  const { width, height } = config;

  // 1. Clear canvas
  ctx.clearRect(0, 0, width, height);

  // 2. Render structures (background layer)
  renderStructures(ctx, state.structures, state.nodes);

  // 3. Render lines (middle layer)
  renderLines(ctx, state.lines, state.nodes);

  // 4. Render connection pulses (on top of lines)
  renderPulses(ctx, state.pulses);

  // 5. Render nodes (top layer)
  renderNodes(ctx, state.nodes);
}

/**
 * Render all visible nodes with glow effect
 */
function renderNodes(
  ctx: CanvasRenderingContext2D,
  nodes: Map<number, Node>
): void {
  for (const node of nodes.values()) {
    if (node.opacity <= 0) continue;

    const { x, y, radius, opacity } = node;
    const glowRadius = radius * PHYSICS.NODE_GLOW_MULTIPLIER;

    // Outer glow (radial gradient)
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
    gradient.addColorStop(0, `rgba(${COLORS.PURPLE}, ${opacity * COLORS.NODE_GLOW_OPACITY})`);
    gradient.addColorStop(0.5, `rgba(${COLORS.PURPLE}, ${opacity * COLORS.NODE_GLOW_MID_OPACITY})`);
    gradient.addColorStop(1, `rgba(${COLORS.PURPLE}, 0)`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    // Core (solid white)
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity * COLORS.NODE_CORE_OPACITY})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Render lines with gradient from dim origin to bright destination
 */
function renderLines(
  ctx: CanvasRenderingContext2D,
  lines: Map<number, Line>,
  nodes: Map<number, Node>
): void {
  ctx.lineWidth = PHYSICS.LINE_WIDTH;
  ctx.lineCap = 'round';

  for (const line of lines.values()) {
    if (line.opacity <= 0) continue;

    const fromNode = nodes.get(line.fromNodeId);
    const toNode = nodes.get(line.toNodeId);
    if (!fromNode || !toNode) continue;

    // Calculate current endpoint based on progress
    const currentX = fromNode.x + (toNode.x - fromNode.x) * line.progress;
    const currentY = fromNode.y + (toNode.y - fromNode.y) * line.progress;

    // Create gradient from origin to current position
    const gradient = ctx.createLinearGradient(
      fromNode.x, fromNode.y,
      currentX, currentY
    );

    const baseOpacity = line.phase === 'locked'
      ? COLORS.LINE_LOCKED_OPACITY
      : COLORS.LINE_DEST_OPACITY;

    gradient.addColorStop(0, `rgba(${COLORS.PURPLE}, ${line.opacity * COLORS.LINE_ORIGIN_OPACITY})`);
    gradient.addColorStop(1, `rgba(${COLORS.PURPLE}, ${line.opacity * baseOpacity})`);

    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(fromNode.x, fromNode.y);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
  }
}

/**
 * Render structure fill polygons
 */
function renderStructures(
  ctx: CanvasRenderingContext2D,
  structures: Map<number, Structure>,
  nodes: Map<number, Node>
): void {
  for (const structure of structures.values()) {
    if (structure.opacity <= 0) continue;

    const structureNodes = Array.from(structure.nodeIds)
      .map(id => nodes.get(id))
      .filter((n): n is Node => n !== undefined);

    if (structureNodes.length < 3) continue;

    // Draw filled polygon
    ctx.fillStyle = `rgba(${COLORS.PURPLE}, ${structure.opacity * COLORS.STRUCTURE_FILL_OPACITY})`;
    ctx.beginPath();
    ctx.moveTo(structureNodes[0].x, structureNodes[0].y);
    for (let i = 1; i < structureNodes.length; i++) {
      ctx.lineTo(structureNodes[i].x, structureNodes[i].y);
    }
    ctx.closePath();
    ctx.fill();
  }
}

/**
 * Render connection pulse effects
 */
function renderPulses(
  ctx: CanvasRenderingContext2D,
  pulses: ConnectionPulse[]
): void {
  for (const pulse of pulses) {
    const opacity = (1 - pulse.progress) * COLORS.PULSE_OPACITY;
    const radius = 5 + pulse.progress * 15;

    const gradient = ctx.createRadialGradient(
      pulse.x, pulse.y, 0,
      pulse.x, pulse.y, radius
    );
    gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(pulse.x, pulse.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
```

---

## State Update Pattern

### Pure State Update Function

```typescript
// Pattern: Pure state update function
export function updateState(
  state: AnimationState,
  config: CanvasConfig,
  deltaTime: number,
  timestamp: number
): AnimationState {
  // Create shallow copy of state
  let newState = { ...state };

  // Update each system (order matters)
  newState = updateNodes(newState, config, deltaTime, timestamp);
  newState = updateLines(newState, config, deltaTime, timestamp);
  newState = updatePulses(newState, deltaTime);
  newState = updateStructures(newState, deltaTime, timestamp);
  newState = spawnNewElements(newState, config, timestamp);

  newState.frameCount++;

  return newState;
}
```

### Node Lifecycle Update

```typescript
// Pattern: Node lifecycle state machine
export function updateNodePhase(node: Node, deltaTime: number): Node {
  const newAge = node.age + deltaTime;
  let newPhase = node.phase;
  let newOpacity = node.opacity;

  const fadeInEnd = TIMING.NODE_FADE_IN;
  const fadeOutStart = node.lifespan - TIMING.NODE_FADE_OUT;

  switch (node.phase) {
    case 'spawning':
      // Fade in
      newOpacity = easeInOutSine(clamp(newAge / fadeInEnd, 0, 1));
      if (newAge >= fadeInEnd) {
        newPhase = 'active';
        newOpacity = 1;
      }
      break;

    case 'active':
      newOpacity = 1;
      if (newAge >= fadeOutStart) {
        newPhase = 'fading';
      }
      break;

    case 'fading':
      // Fade out
      const fadeProgress = (newAge - fadeOutStart) / TIMING.NODE_FADE_OUT;
      newOpacity = 1 - easeOutQuad(clamp(fadeProgress, 0, 1));
      break;
  }

  return {
    ...node,
    age: newAge,
    phase: newPhase,
    opacity: newOpacity,
  };
}
```

---

## Testing Patterns

### Test File Structure

```typescript
// File: app/components/2l/EternalConstruction/__tests__/geometry.test.ts

import { describe, it, expect } from 'vitest';
import {
  distance,
  nodeDistance,
  randomPosition,
  randomVelocity,
  bounceVelocity,
  clampPosition,
  calculateCenter,
} from '../geometry';
import type { Node } from '../types';

describe('geometry', () => {
  describe('distance', () => {
    it('returns 0 for same point', () => {
      const p = { x: 5, y: 5 };
      expect(distance(p, p)).toBe(0);
    });

    it('calculates horizontal distance', () => {
      expect(distance({ x: 0, y: 0 }, { x: 10, y: 0 })).toBe(10);
    });

    it('calculates vertical distance', () => {
      expect(distance({ x: 0, y: 0 }, { x: 0, y: 10 })).toBe(10);
    });

    it('calculates diagonal distance (3-4-5 triangle)', () => {
      expect(distance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
    });

    it('handles negative coordinates', () => {
      expect(distance({ x: -5, y: -5 }, { x: 5, y: 5 })).toBeCloseTo(14.142, 2);
    });
  });

  describe('bounceVelocity', () => {
    it('reverses X velocity at left edge', () => {
      const result = bounceVelocity(10, 100, 5, 3, 500, 500, 50);
      expect(result.vx).toBe(-5);
      expect(result.vy).toBe(3);
    });

    it('reverses Y velocity at top edge', () => {
      const result = bounceVelocity(100, 10, 5, 3, 500, 500, 50);
      expect(result.vx).toBe(5);
      expect(result.vy).toBe(-3);
    });

    it('does not reverse when in bounds', () => {
      const result = bounceVelocity(250, 250, 5, 3, 500, 500, 50);
      expect(result.vx).toBe(5);
      expect(result.vy).toBe(3);
    });
  });

  describe('calculateCenter', () => {
    it('returns origin for empty array', () => {
      expect(calculateCenter([])).toEqual({ x: 0, y: 0 });
    });

    it('returns node position for single node', () => {
      const node = { x: 100, y: 200 } as Node;
      expect(calculateCenter([node])).toEqual({ x: 100, y: 200 });
    });

    it('calculates center of triangle', () => {
      const nodes = [
        { x: 0, y: 0 },
        { x: 300, y: 0 },
        { x: 150, y: 300 },
      ] as Node[];
      expect(calculateCenter(nodes)).toEqual({ x: 150, y: 100 });
    });
  });
});
```

### Easing Function Tests

```typescript
// File: app/components/2l/EternalConstruction/__tests__/easing.test.ts

import { describe, it, expect } from 'vitest';
import {
  easeOutCubic,
  easeInOutSine,
  easeOutQuad,
  easeOutExpo,
  lerp,
  clamp,
  normalize,
} from '../easing';

describe('easing', () => {
  describe('easeOutCubic', () => {
    it('returns 0 at start (t=0)', () => {
      expect(easeOutCubic(0)).toBe(0);
    });

    it('returns 1 at end (t=1)', () => {
      expect(easeOutCubic(1)).toBe(1);
    });

    it('returns ~0.875 at midpoint', () => {
      expect(easeOutCubic(0.5)).toBeCloseTo(0.875, 3);
    });

    it('is monotonically increasing', () => {
      let prev = -1;
      for (let t = 0; t <= 1; t += 0.1) {
        const current = easeOutCubic(t);
        expect(current).toBeGreaterThanOrEqual(prev);
        prev = current;
      }
    });
  });

  describe('easeInOutSine', () => {
    it('returns ~0 at start', () => {
      expect(easeInOutSine(0)).toBeCloseTo(0, 10);
    });

    it('returns ~1 at end', () => {
      expect(easeInOutSine(1)).toBeCloseTo(1, 10);
    });

    it('returns 0.5 at midpoint', () => {
      expect(easeInOutSine(0.5)).toBeCloseTo(0.5, 10);
    });
  });

  describe('lerp', () => {
    it('returns start at t=0', () => {
      expect(lerp(10, 20, 0)).toBe(10);
    });

    it('returns end at t=1', () => {
      expect(lerp(10, 20, 1)).toBe(20);
    });

    it('returns midpoint at t=0.5', () => {
      expect(lerp(10, 20, 0.5)).toBe(15);
    });

    it('handles negative values', () => {
      expect(lerp(-10, 10, 0.5)).toBe(0);
    });

    it('extrapolates beyond 0-1', () => {
      expect(lerp(0, 10, 2)).toBe(20);
      expect(lerp(0, 10, -1)).toBe(-10);
    });
  });

  describe('clamp', () => {
    it('returns value when within bounds', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it('returns min when below', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it('returns max when above', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('handles equal min and max', () => {
      expect(clamp(5, 10, 10)).toBe(10);
    });
  });

  describe('normalize', () => {
    it('returns 0 at min', () => {
      expect(normalize(0, 0, 100)).toBe(0);
    });

    it('returns 1 at max', () => {
      expect(normalize(100, 0, 100)).toBe(1);
    });

    it('returns 0.5 at midpoint', () => {
      expect(normalize(50, 0, 100)).toBe(0.5);
    });

    it('clamps to 0-1', () => {
      expect(normalize(-10, 0, 100)).toBe(0);
      expect(normalize(110, 0, 100)).toBe(1);
    });

    it('returns 0 when min equals max', () => {
      expect(normalize(5, 10, 10)).toBe(0);
    });
  });
});
```

### Object Pool Tests

```typescript
// File: app/components/2l/EternalConstruction/__tests__/ObjectPool.test.ts

import { describe, it, expect, vi } from 'vitest';
import { ObjectPool } from '../ObjectPool';

describe('ObjectPool', () => {
  interface TestObj {
    value: number;
    name: string;
  }

  const factory = () => ({ value: 0, name: '' });
  const reset = (obj: TestObj) => {
    obj.value = 0;
    obj.name = '';
  };

  it('pre-populates pool on construction', () => {
    const pool = new ObjectPool(factory, reset, 10);
    expect(pool.available).toBe(10);
  });

  it('returns object from pool on acquire', () => {
    const pool = new ObjectPool(factory, reset, 5);
    const obj = pool.acquire();
    expect(obj).toBeDefined();
    expect(pool.available).toBe(4);
  });

  it('creates new object when pool is empty', () => {
    const mockFactory = vi.fn(factory);
    const pool = new ObjectPool(mockFactory, reset, 0);

    pool.acquire();

    // Factory called once for the acquire (not for initial population)
    expect(mockFactory).toHaveBeenCalledTimes(1);
  });

  it('returns object to pool on release', () => {
    const pool = new ObjectPool(factory, reset, 5);
    const obj = pool.acquire();
    expect(pool.available).toBe(4);

    pool.release(obj);

    expect(pool.available).toBe(5);
  });

  it('resets object state on release', () => {
    const pool = new ObjectPool(factory, reset, 1);
    const obj = pool.acquire();

    obj.value = 42;
    obj.name = 'modified';

    pool.release(obj);
    const reacquired = pool.acquire();

    expect(reacquired.value).toBe(0);
    expect(reacquired.name).toBe('');
  });

  it('clears pool completely', () => {
    const pool = new ObjectPool(factory, reset, 10);
    expect(pool.available).toBe(10);

    pool.clear();

    expect(pool.available).toBe(0);
  });

  it('can handle many acquire/release cycles', () => {
    const pool = new ObjectPool(factory, reset, 5);
    const acquired: TestObj[] = [];

    // Acquire all
    for (let i = 0; i < 5; i++) {
      acquired.push(pool.acquire());
    }
    expect(pool.available).toBe(0);

    // Modify all
    acquired.forEach((obj, i) => {
      obj.value = i;
    });

    // Release all
    acquired.forEach(obj => pool.release(obj));
    expect(pool.available).toBe(5);

    // Re-acquire and verify reset
    for (let i = 0; i < 5; i++) {
      const obj = pool.acquire();
      expect(obj.value).toBe(0);
    }
  });
});
```

### Test Data Factories

```typescript
// File: app/components/2l/EternalConstruction/__tests__/factories.ts

import type { Node, Line, Structure, AnimationState, CanvasConfig } from '../types';

/**
 * Create a mock node with optional overrides
 */
export function createMockNode(overrides: Partial<Node> = {}): Node {
  return {
    id: 1,
    x: 100,
    y: 100,
    vx: 5,
    vy: 3,
    radius: 4,
    opacity: 1,
    phase: 'active',
    lifespan: 20000,
    age: 5000,
    connections: new Set<number>(),
    ...overrides,
  };
}

/**
 * Create a mock line with optional overrides
 */
export function createMockLine(overrides: Partial<Line> = {}): Line {
  return {
    id: 1,
    fromNodeId: 1,
    toNodeId: 2,
    progress: 0.5,
    phase: 'extending',
    startTime: 0,
    duration: 3000,
    opacity: 1,
    ...overrides,
  };
}

/**
 * Create a mock structure with optional overrides
 */
export function createMockStructure(overrides: Partial<Structure> = {}): Structure {
  return {
    id: 1,
    nodeIds: new Set([1, 2, 3]),
    lineIds: new Set([1, 2, 3]),
    opacity: 1,
    createdAt: 0,
    lifespan: 15000,
    age: 5000,
    ...overrides,
  };
}

/**
 * Create a mock animation state
 */
export function createMockState(overrides: Partial<AnimationState> = {}): AnimationState {
  return {
    nodes: new Map(),
    lines: new Map(),
    structures: new Map(),
    pulses: [],
    nextNodeId: 1,
    nextLineId: 1,
    nextStructureId: 1,
    lastNodeSpawn: 0,
    lastLineSpawn: 0,
    frameCount: 0,
    ...overrides,
  };
}

/**
 * Create a mock canvas config
 */
export function createMockConfig(overrides: Partial<CanvasConfig> = {}): CanvasConfig {
  return {
    width: 1920,
    height: 1080,
    dpr: 2,
    isMobile: false,
    ...overrides,
  };
}
```

---

## Accessibility Patterns

### Reduced Motion Support

```typescript
// Pattern: Component-level reduced motion check
// In 2L page (parent component)

import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { EternalConstruction } from '@/app/components/2l/EternalConstruction';

export default function TwoLPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main>
      {/* Conditionally render - don't animate for reduced motion users */}
      {!prefersReducedMotion && <EternalConstruction />}

      {/* Content always renders */}
      <div className="relative z-10">
        {/* ... */}
      </div>
    </main>
  );
}
```

### ARIA Attributes

```typescript
// Pattern: Accessibility attributes for decorative canvas
<div
  ref={containerRef}
  className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
  aria-hidden="true"  // Hidden from screen readers (purely decorative)
  role="presentation" // Explicit presentation role
>
  <canvas
    ref={canvasRef}
    className="block w-full h-full"
    // No aria-label needed (decorative content)
    // No tabindex (not interactive)
  />
</div>
```

---

## Performance Monitoring Patterns

### Development-Only Performance Monitor

```typescript
// File: app/components/2l/EternalConstruction/utils/performance.ts

const isDev = process.env.NODE_ENV === 'development';

export class PerformanceMonitor {
  private frameTimes: number[] = [];
  private lastTime = 0;
  private readonly maxSamples = 60;

  startFrame(): void {
    if (!isDev) return;
    this.lastTime = performance.now();
  }

  endFrame(): void {
    if (!isDev) return;
    const frameTime = performance.now() - this.lastTime;
    this.frameTimes.push(frameTime);
    if (this.frameTimes.length > this.maxSamples) {
      this.frameTimes.shift();
    }
  }

  getFPS(): number {
    if (this.frameTimes.length === 0) return 0;
    const avg = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    return 1000 / avg;
  }

  getAverageFrameTime(): number {
    if (this.frameTimes.length === 0) return 0;
    return this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
  }

  logWarningIfSlow(): void {
    if (!isDev) return;
    const fps = this.getFPS();
    if (fps > 0 && fps < 45) {
      console.warn(`[EternalConstruction] Performance warning: ${fps.toFixed(1)} FPS`);
    }
  }
}

// Usage in animation loop (development only)
const monitor = new PerformanceMonitor();

const animate = (timestamp: number) => {
  monitor.startFrame();
  // ... animation code ...
  monitor.endFrame();
  monitor.logWarningIfSlow();
};
```

---

## Error Handling Patterns

### Canvas Context Fallback

```typescript
// Pattern: Graceful handling of missing canvas context
const setupCanvas = useCallback(() => {
  const canvas = canvasRef.current;
  const container = containerRef.current;

  if (!canvas || !container) {
    console.warn('[EternalConstruction] Canvas or container not available');
    return null;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('[EternalConstruction] Failed to get 2D context');
    return null;
  }

  // ... rest of setup
}, []);
```

### Safe Animation Loop

```typescript
// Pattern: Defensive animation loop
const animate = useCallback((timestamp: DOMHighResTimeStamp) => {
  // Always schedule next frame first
  frameIdRef.current = requestAnimationFrame(animate);

  // Guard clauses
  const ctx = ctxRef.current;
  const state = stateRef.current;
  const config = configRef.current;

  if (!ctx || !state || !config) {
    return; // Skip frame, will retry next frame
  }

  try {
    // ... animation logic
  } catch (error) {
    console.error('[EternalConstruction] Animation error:', error);
    // Don't rethrow - let animation continue
  }
}, []);
```

---

## Integration Pattern

### 2L Page Integration

```typescript
// File: app/2l/page.tsx (modified section)

"use client";

import { useState, useEffect } from 'react';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';
import { EternalConstruction } from '@/app/components/2l/EternalConstruction';
// ... other imports

export default function TwoLPage() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR safety
  if (!mounted) {
    return <div className="min-h-screen" />;
  }

  return (
    <main className="min-h-screen relative">
      {/* Canvas background - z-index 0 */}
      {!prefersReducedMotion && <EternalConstruction />}

      {/* Existing AmbientLayer - z-index -10 */}
      {!prefersReducedMotion && <AmbientLayer />}

      {/* Content - z-index 10+ */}
      <div className="relative z-10">
        {/* Hero section */}
        {/* Pipeline visualization */}
        {/* Demo components */}
        {/* Footer */}
      </div>
    </main>
  );
}
```

### Re-export Pattern

```typescript
// File: app/components/2l/EternalConstruction/index.ts

export { EternalConstruction } from './EternalConstruction';
export type {
  Node,
  Line,
  Structure,
  ConnectionPulse,
  AnimationState,
  CanvasConfig,
} from './types';
```

---

## Code Quality Standards

### TypeScript Strictness

- Enable `strict: true` in tsconfig
- No `any` types (use `unknown` if truly unknown)
- Explicit return types on exported functions
- Use type predicates for type guards

### Function Documentation

```typescript
/**
 * Brief description of what the function does
 *
 * @param paramName - Description of parameter
 * @returns Description of return value
 * @pure - If function is pure (no side effects)
 *
 * @example
 * const result = functionName(input);
 */
export function functionName(paramName: ParamType): ReturnType {
  // ...
}
```

### Const Assertions

```typescript
// Use 'as const' for configuration objects
export const TIMING = {
  NODE_LIFESPAN_MIN: 15_000,
  // ...
} as const;

// This enables type inference of literal values
type TimingKeys = keyof typeof TIMING;
```

---

## Performance Best Practices

1. **Use refs for animation state** - Never use useState for values that change every frame
2. **Pre-allocate objects** - Object pools prevent GC pauses
3. **Minimize allocations in loop** - Reuse objects, avoid spreading in hot paths
4. **Skip invisible frames** - Check visibility before rendering
5. **Cap delta time** - Prevent physics explosions after tab switches
6. **Limit element counts** - Hard caps prevent runaway performance
7. **Use requestAnimationFrame** - Syncs with display refresh rate
8. **Debounce resize** - Prevent excessive recalculation

---

## Security Best Practices

1. **No user input** - Canvas is purely decorative, no attack surface
2. **No external data** - All rendering is from internal state
3. **No eval/innerHTML** - Only Canvas API calls
4. **Development-only logging** - No console output in production builds
