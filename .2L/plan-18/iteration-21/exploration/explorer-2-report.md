# Explorer 2 Report: Animation Implementation Patterns

## Executive Summary

This exploration identifies and documents the animation patterns required for the Eternal Construction canvas animation. The codebase has mature requestAnimationFrame patterns for DOM-based animations but no existing Canvas 2D implementations. I have defined precise timing constants from the vision, designed an object pooling strategy, specified easing functions, established the rendering pipeline order, and outlined visibility throttling approaches. All animation utilities are designed as pure functions for testability.

---

## Discoveries

### Existing Animation Patterns in Codebase

#### 1. requestAnimationFrame Loop Pattern
**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/soul/building/page.tsx` (lines 95-145)

```typescript
// Established pattern in codebase
const animationFrameRef = useRef<number | null>(null);
const startTimeRef = useRef<number>(0);

useEffect(() => {
  if (!isActive) return;
  
  startTimeRef.current = performance.now();
  
  const animate = (currentTime: number) => {
    const elapsed = (currentTime - startTimeRef.current) / 1000;
    // Animation logic using elapsed time
    animationFrameRef.current = requestAnimationFrame(animate);
  };
  
  animationFrameRef.current = requestAnimationFrame(animate);
  
  return () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };
}, [isActive]);
```

#### 2. Delta-Time Animation Pattern
**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/2l/TerminalAnimation.tsx` (lines 136-163)

```typescript
// Time-controlled animation with variable speeds
const animate = (timestamp: number) => {
  if (timestamp - lastCharTimeRef.current >= typingSpeed) {
    lastCharTimeRef.current = timestamp;
    // Execute animation step
  }
  animationRef.current = requestAnimationFrame(animate);
};
```

#### 3. Easing Function Pattern
**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useCountUp.ts` (lines 29-31)

```typescript
// Ease-out cubic for natural deceleration
const eased = 1 - Math.pow(1 - progress, 3);
```

#### 4. Reduced Motion Support
**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useReducedMotion.ts`

```typescript
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}
```

#### 5. Test Pattern for Animations
**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/usePeriodicAnimation.test.ts`

```typescript
// Vitest fake timers pattern
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

// Test animation timing
act(() => {
  vi.advanceTimersByTime(5000);
});
expect(result.current.isAnimating).toBe(true);
```

---

## Animation Timing Constants

Based on the vision document, these are the precise timing specifications:

```typescript
// File: app/components/2l/EternalConstruction/constants.ts

/** Animation timing constants derived from vision specification */
export const TIMING = {
  /** Node lifecycle */
  NODE_LIFESPAN_MIN: 15_000,      // 15 seconds
  NODE_LIFESPAN_MAX: 30_000,      // 30 seconds
  NODE_SPAWN_INTERVAL: 1_500,     // Spawn check every 1.5s
  
  /** Line travel */
  LINE_TRAVEL_MIN: 2_000,         // 2 seconds minimum
  LINE_TRAVEL_MAX: 4_000,         // 4 seconds maximum
  LINE_SPAWN_INTERVAL: 800,       // Spawn check every 800ms
  
  /** Connection effects */
  CONNECTION_PULSE_DURATION: 300, // 300ms pulse on lock-in
  
  /** Structure persistence */
  STRUCTURE_LIFESPAN_MIN: 10_000, // 10 seconds
  STRUCTURE_LIFESPAN_MAX: 20_000, // 20 seconds
  
  /** Fade animations */
  FADE_IN_DURATION: 2_000,        // 2 seconds
  FADE_OUT_DURATION: 2_500,       // 2.5 seconds (midpoint of 2-3s)
  
  /** Frame timing */
  TARGET_FRAME_TIME: 16.67,       // 60fps target (~16.67ms per frame)
  MIN_DELTA: 0,                   // No minimum (full speed)
  MAX_DELTA: 100,                 // Cap at 100ms to prevent physics explosion
  
  /** Spawn throttling */
  MAX_SPAWN_PER_FRAME: 1,         // Max 1 new element per frame
} as const;

/** Element count limits */
export const LIMITS = {
  NODES_MIN: 20,
  NODES_MAX: 40,
  NODES_MOBILE: 15,               // Reduced for mobile
  
  LINES_MIN: 10,
  LINES_MAX: 20,
  LINES_MOBILE: 8,
  
  STRUCTURES_MAX: 5,
  STRUCTURES_MOBILE: 3,
} as const;

/** Physics constants */
export const PHYSICS = {
  /** Node drift velocity range (pixels per second) */
  DRIFT_MIN: 2,
  DRIFT_MAX: 8,
  
  /** Node radius range (pixels) */
  NODE_RADIUS_MIN: 3,
  NODE_RADIUS_MAX: 6,
  
  /** Line width */
  LINE_WIDTH: 1.5,
  LINE_WIDTH_STRUCTURE: 2,
  
  /** Connection detection radius */
  CONNECTION_RADIUS: 5,
} as const;
```

---

## Easing Functions

All easing functions are pure and testable:

```typescript
// File: app/components/2l/EternalConstruction/utils/easing.ts

/**
 * Cubic ease-out - Confident, purposeful deceleration
 * Used for: Line extension, node spawning
 * 
 * @param t - Progress value 0 to 1
 * @returns Eased value 0 to 1
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Sine ease-in-out - Ultra-smooth for breathing effects
 * Used for: Node fading, structure pulsing
 * 
 * @param t - Progress value 0 to 1
 * @returns Eased value 0 to 1
 */
export function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

/**
 * Quadratic ease-out - Softer than cubic
 * Used for: Gentle fade out
 * 
 * @param t - Progress value 0 to 1
 * @returns Eased value 0 to 1
 */
export function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

/**
 * Exponential ease-out - Sharp initial movement, long tail
 * Used for: Connection pulse brightness
 * 
 * @param t - Progress value 0 to 1
 * @returns Eased value 0 to 1
 */
export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Linear interpolation
 * Used for: Progress calculation, color blending
 * 
 * @param a - Start value
 * @param b - End value  
 * @param t - Progress 0 to 1
 * @returns Interpolated value
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Clamp value between bounds
 * 
 * @param value - Value to clamp
 * @param min - Minimum bound
 * @param max - Maximum bound
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
```

### Test Cases for Easing Functions

```typescript
// File: app/components/2l/EternalConstruction/utils/easing.test.ts

import { describe, it, expect } from 'vitest';
import { 
  easeOutCubic, 
  easeInOutSine, 
  easeOutQuad, 
  easeOutExpo,
  lerp,
  clamp 
} from './easing';

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
  it('returns 0 at start', () => {
    expect(easeInOutSine(0)).toBeCloseTo(0, 10);
  });
  
  it('returns 1 at end', () => {
    expect(easeInOutSine(1)).toBeCloseTo(1, 10);
  });
  
  it('returns 0.5 at midpoint', () => {
    expect(easeInOutSine(0.5)).toBeCloseTo(0.5, 10);
  });
});

describe('lerp', () => {
  it('returns start value at t=0', () => {
    expect(lerp(10, 20, 0)).toBe(10);
  });
  
  it('returns end value at t=1', () => {
    expect(lerp(10, 20, 1)).toBe(20);
  });
  
  it('returns midpoint at t=0.5', () => {
    expect(lerp(10, 20, 0.5)).toBe(15);
  });
  
  it('handles negative values', () => {
    expect(lerp(-10, 10, 0.5)).toBe(0);
  });
});

describe('clamp', () => {
  it('returns value when within bounds', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });
  
  it('returns min when below bounds', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });
  
  it('returns max when above bounds', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });
});
```

---

## Object Pooling Strategy

Object pooling prevents garbage collection spikes during animation:

```typescript
// File: app/components/2l/EternalConstruction/utils/ObjectPool.ts

/**
 * Generic object pool for reusing animation entities
 * Prevents GC pauses during 60fps animation
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
   * Acquire an object from the pool
   * Creates new if pool is empty
   */
  acquire(): T {
    if (this.pool.length > 0) {
      return this.pool.pop()!;
    }
    return this.factory();
  }
  
  /**
   * Release an object back to the pool
   * Resets the object state before pooling
   */
  release(obj: T): void {
    this.reset(obj);
    this.pool.push(obj);
  }
  
  /**
   * Current pool size (available objects)
   */
  get available(): number {
    return this.pool.length;
  }
  
  /**
   * Clear the pool (for cleanup)
   */
  clear(): void {
    this.pool = [];
  }
}

// Node pool factory and reset
export const createNodePool = () => new ObjectPool<Node>(
  // Factory
  () => ({
    id: 0,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    radius: 0,
    opacity: 0,
    phase: 'spawning' as const,
    lifespan: 0,
    age: 0,
    connections: new Set<number>(),
  }),
  // Reset
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
  50
);

// Line pool factory and reset
export const createLinePool = () => new ObjectPool<Line>(
  () => ({
    id: 0,
    fromNodeId: 0,
    toNodeId: 0,
    progress: 0,
    phase: 'extending' as const,
    startTime: 0,
    duration: 0,
  }),
  (line) => {
    line.id = 0;
    line.fromNodeId = 0;
    line.toNodeId = 0;
    line.progress = 0;
    line.phase = 'extending';
    line.startTime = 0;
    line.duration = 0;
  },
  30
);
```

### Test Cases for Object Pool

```typescript
// File: app/components/2l/EternalConstruction/utils/ObjectPool.test.ts

import { describe, it, expect, vi } from 'vitest';
import { ObjectPool } from './ObjectPool';

describe('ObjectPool', () => {
  interface TestObj {
    value: number;
  }
  
  const factory = () => ({ value: 0 });
  const reset = (obj: TestObj) => { obj.value = 0; };
  
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
  
  it('creates new object when pool empty', () => {
    const mockFactory = vi.fn(factory);
    const pool = new ObjectPool(mockFactory, reset, 0);
    pool.acquire();
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
    pool.release(obj);
    const reacquired = pool.acquire();
    expect(reacquired.value).toBe(0);
  });
  
  it('clears pool completely', () => {
    const pool = new ObjectPool(factory, reset, 10);
    pool.clear();
    expect(pool.available).toBe(0);
  });
});
```

---

## Rendering Order

The canvas rendering pipeline must follow this strict order for correct visual layering:

```typescript
// File: app/components/2l/EternalConstruction/render.ts

/**
 * Main render function - executes each frame
 * Order is critical for visual correctness
 */
export function render(
  ctx: CanvasRenderingContext2D,
  state: AnimationState,
  width: number,
  height: number
): void {
  // Phase 1: Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Phase 2: Render structures (background layer - lowest)
  // Structures are persistent, subtle geometric forms
  renderStructures(ctx, state.structures, state.nodes);
  
  // Phase 3: Render lines (middle layer)
  // Lines extend between nodes with gradients
  renderLines(ctx, state.lines, state.nodes);
  
  // Phase 4: Render connection pulses (on top of lines)
  // Brief brightness flashes when connections form
  renderConnectionPulses(ctx, state.connections);
  
  // Phase 5: Render nodes (top layer)
  // Glowing points are always visible
  renderNodes(ctx, state.nodes);
}

/**
 * Render all visible nodes
 */
function renderNodes(
  ctx: CanvasRenderingContext2D,
  nodes: Map<number, Node>
): void {
  for (const node of nodes.values()) {
    if (node.opacity <= 0) continue;
    
    // Outer glow
    const gradient = ctx.createRadialGradient(
      node.x, node.y, 0,
      node.x, node.y, node.radius * 3
    );
    gradient.addColorStop(0, `rgba(168, 85, 247, ${node.opacity * 0.6})`);
    gradient.addColorStop(0.5, `rgba(168, 85, 247, ${node.opacity * 0.2})`);
    gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Core
    ctx.fillStyle = `rgba(255, 255, 255, ${node.opacity * 0.8})`;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
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
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';
  
  for (const line of lines.values()) {
    const fromNode = nodes.get(line.fromNodeId);
    const toNode = nodes.get(line.toNodeId);
    if (!fromNode || !toNode) continue;
    
    // Calculate current end position based on progress
    const currentX = fromNode.x + (toNode.x - fromNode.x) * line.progress;
    const currentY = fromNode.y + (toNode.y - fromNode.y) * line.progress;
    
    // Gradient: dim at origin, bright at current position
    const gradient = ctx.createLinearGradient(
      fromNode.x, fromNode.y,
      currentX, currentY
    );
    
    const baseOpacity = line.phase === 'locked' ? 0.6 : 0.4;
    gradient.addColorStop(0, `rgba(168, 85, 247, ${baseOpacity * 0.3})`);
    gradient.addColorStop(1, `rgba(168, 85, 247, ${baseOpacity})`);
    
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(fromNode.x, fromNode.y);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
  }
}

/**
 * Render structure highlights
 */
function renderStructures(
  ctx: CanvasRenderingContext2D,
  structures: Map<number, Structure>,
  nodes: Map<number, Node>
): void {
  for (const structure of structures.values()) {
    if (structure.opacity <= 0) continue;
    
    // Get structure node positions
    const structureNodes = Array.from(structure.nodeIds)
      .map(id => nodes.get(id))
      .filter(Boolean) as Node[];
    
    if (structureNodes.length < 3) continue;
    
    // Draw filled polygon with low opacity
    ctx.fillStyle = `rgba(168, 85, 247, ${structure.opacity * 0.05})`;
    ctx.beginPath();
    ctx.moveTo(structureNodes[0].x, structureNodes[0].y);
    for (let i = 1; i < structureNodes.length; i++) {
      ctx.lineTo(structureNodes[i].x, structureNodes[i].y);
    }
    ctx.closePath();
    ctx.fill();
  }
}
```

---

## Visibility Throttling Approach

Two-layer throttling for optimal performance:

```typescript
// File: app/components/2l/EternalConstruction/hooks/useVisibilityThrottle.ts

import { useEffect, useRef, useCallback } from 'react';

interface VisibilityState {
  isDocumentVisible: boolean;
  isCanvasInViewport: boolean;
  shouldAnimate: boolean;
}

/**
 * Hook to manage animation throttling based on visibility
 * 
 * Layer 1: Document visibility (tab focus)
 * Layer 2: Canvas viewport intersection
 */
export function useVisibilityThrottle(
  canvasRef: React.RefObject<HTMLCanvasElement>
): VisibilityState {
  const isDocumentVisibleRef = useRef(true);
  const isCanvasInViewportRef = useRef(true);
  
  // Layer 1: Document visibility API
  useEffect(() => {
    const handleVisibilityChange = () => {
      isDocumentVisibleRef.current = document.visibilityState === 'visible';
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  // Layer 2: Intersection Observer for viewport visibility
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        isCanvasInViewportRef.current = entries[0]?.isIntersecting ?? false;
      },
      {
        threshold: 0.01,  // Trigger when 1% visible
        rootMargin: '50px' // Start slightly before in view
      }
    );
    
    observer.observe(canvas);
    
    return () => {
      observer.disconnect();
    };
  }, [canvasRef]);
  
  // Combined check
  const shouldAnimate = useCallback(() => {
    return isDocumentVisibleRef.current && isCanvasInViewportRef.current;
  }, []);
  
  return {
    isDocumentVisible: isDocumentVisibleRef.current,
    isCanvasInViewport: isCanvasInViewportRef.current,
    shouldAnimate: shouldAnimate(),
  };
}
```

### Animation Loop Integration

```typescript
// Integration in main animation loop
const animate = (timestamp: number) => {
  // Skip frame if not visible (CPU savings)
  if (!isDocumentVisibleRef.current) {
    // Still schedule next frame to catch visibility change
    frameIdRef.current = requestAnimationFrame(animate);
    return;
  }
  
  // Reduced update when canvas not in viewport
  if (!isCanvasInViewportRef.current) {
    // Update state but don't render
    updateStateMinimal(stateRef.current, deltaTime);
    frameIdRef.current = requestAnimationFrame(animate);
    return;
  }
  
  // Full update and render when visible
  updateState(stateRef.current, deltaTime);
  render(ctx, stateRef.current, width, height);
  
  frameIdRef.current = requestAnimationFrame(animate);
};
```

---

## Performance Measurement Approach

```typescript
// File: app/components/2l/EternalConstruction/utils/performance.ts

/**
 * Performance metrics collector for development/testing
 */
export class PerformanceMonitor {
  private frameTimes: number[] = [];
  private lastFrameTime: number = 0;
  private frameCount: number = 0;
  private readonly maxSamples: number = 60;
  
  /**
   * Call at start of each frame
   */
  startFrame(): void {
    this.lastFrameTime = performance.now();
  }
  
  /**
   * Call at end of each frame
   */
  endFrame(): void {
    const frameTime = performance.now() - this.lastFrameTime;
    this.frameTimes.push(frameTime);
    this.frameCount++;
    
    // Keep only recent samples
    if (this.frameTimes.length > this.maxSamples) {
      this.frameTimes.shift();
    }
  }
  
  /**
   * Get current FPS estimate
   */
  getFPS(): number {
    if (this.frameTimes.length === 0) return 0;
    const avgFrameTime = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    return 1000 / avgFrameTime;
  }
  
  /**
   * Get average frame time in ms
   */
  getAverageFrameTime(): number {
    if (this.frameTimes.length === 0) return 0;
    return this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
  }
  
  /**
   * Check if meeting 60fps target
   */
  isMeetingTarget(): boolean {
    return this.getAverageFrameTime() < 16.67;
  }
  
  /**
   * Get performance report
   */
  getReport(): {
    fps: number;
    avgFrameTime: number;
    maxFrameTime: number;
    frameCount: number;
    isMeetingTarget: boolean;
  } {
    return {
      fps: this.getFPS(),
      avgFrameTime: this.getAverageFrameTime(),
      maxFrameTime: Math.max(...this.frameTimes, 0),
      frameCount: this.frameCount,
      isMeetingTarget: this.isMeetingTarget(),
    };
  }
  
  /**
   * Reset all metrics
   */
  reset(): void {
    this.frameTimes = [];
    this.frameCount = 0;
    this.lastFrameTime = 0;
  }
}

// Development-only helper
export const isDev = process.env.NODE_ENV === 'development';

export function logPerformance(monitor: PerformanceMonitor): void {
  if (!isDev) return;
  
  const report = monitor.getReport();
  if (!report.isMeetingTarget) {
    console.warn('[EternalConstruction] Performance warning:', report);
  }
}
```

### Test Cases for Performance Monitor

```typescript
// File: app/components/2l/EternalConstruction/utils/performance.test.ts

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PerformanceMonitor } from './performance';

describe('PerformanceMonitor', () => {
  let monitor: PerformanceMonitor;
  
  beforeEach(() => {
    monitor = new PerformanceMonitor();
    vi.useFakeTimers();
  });
  
  afterEach(() => {
    vi.useRealTimers();
  });
  
  it('calculates FPS correctly', () => {
    // Simulate 60fps (16.67ms frames)
    for (let i = 0; i < 10; i++) {
      vi.spyOn(performance, 'now')
        .mockReturnValueOnce(i * 16.67)
        .mockReturnValueOnce((i + 1) * 16.67);
      monitor.startFrame();
      monitor.endFrame();
    }
    
    expect(monitor.getFPS()).toBeCloseTo(60, 0);
  });
  
  it('reports meeting target for 60fps', () => {
    vi.spyOn(performance, 'now')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(16);
    monitor.startFrame();
    monitor.endFrame();
    
    expect(monitor.isMeetingTarget()).toBe(true);
  });
  
  it('reports not meeting target for slow frames', () => {
    vi.spyOn(performance, 'now')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(20);
    monitor.startFrame();
    monitor.endFrame();
    
    expect(monitor.isMeetingTarget()).toBe(false);
  });
  
  it('resets all metrics', () => {
    vi.spyOn(performance, 'now')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(16);
    monitor.startFrame();
    monitor.endFrame();
    
    monitor.reset();
    
    expect(monitor.getFPS()).toBe(0);
    expect(monitor.getReport().frameCount).toBe(0);
  });
});
```

---

## Patterns Identified

### Pattern A: Ref-Based Animation State

**Description:** Store animation state in refs (not React state) to avoid re-renders during 60fps animation.

**Use Case:** Any continuous animation that runs every frame.

**Example:**
```typescript
const stateRef = useRef<AnimationState>(initialState);
// Update stateRef.current directly in animation loop
// Only use setState for UI-triggering changes
```

**Recommendation:** REQUIRED for this canvas animation.

### Pattern B: Delta-Time Animation

**Description:** Calculate elapsed time between frames to ensure consistent animation speed regardless of frame rate variations.

**Use Case:** All time-based animations (movement, fading, progress).

**Example:**
```typescript
const animate = (timestamp: number) => {
  const deltaTime = Math.min(timestamp - lastTimeRef.current, MAX_DELTA);
  lastTimeRef.current = timestamp;
  
  node.age += deltaTime;
  node.x += node.vx * (deltaTime / 1000);
};
```

**Recommendation:** REQUIRED for frame-rate independent animation.

### Pattern C: Graceful Cleanup

**Description:** Always clean up requestAnimationFrame, observers, and event listeners in useEffect return.

**Use Case:** Every animation hook.

**Example:**
```typescript
useEffect(() => {
  const frameId = requestAnimationFrame(animate);
  const observer = new IntersectionObserver(/*...*/);
  document.addEventListener('visibilitychange', handler);
  
  return () => {
    cancelAnimationFrame(frameId);
    observer.disconnect();
    document.removeEventListener('visibilitychange', handler);
  };
}, []);
```

**Recommendation:** REQUIRED for memory leak prevention.

---

## Complexity Assessment

### High Complexity Areas
- **Line System with Easing:** Requires coordinate math, gradient rendering, and progress tracking. Estimated: 4 hours.
- **Structure Detection:** Graph connectivity check, but keep simple (3+ connected nodes). Estimated: 2 hours.

### Medium Complexity Areas
- **Node Lifecycle Management:** Spawn/fade phases with object pooling. Estimated: 3 hours.
- **Animation Loop Integration:** Delta time, visibility throttling, render pipeline. Estimated: 2 hours.

### Low Complexity Areas
- **Easing Functions:** Pure math, easily testable. Estimated: 0.5 hours.
- **Canvas Setup:** Standard pattern with DPR. Estimated: 1 hour.
- **Constants Definition:** Configuration only. Estimated: 0.5 hours.

---

## Recommendations for Planner

1. **Create Animation Utilities First**
   - Define easing.ts and constants.ts before any rendering
   - These are dependencies for all builders

2. **Use Pure Functions for Testability**
   - All easing, update, and render functions should be pure
   - Accept state as parameter, return new state or render to canvas

3. **Implement Object Pooling Early**
   - Required for 60fps performance
   - Prevents GC pauses during animation

4. **Test Performance at 40 Nodes**
   - If 40 nodes causes lag, reduce limits before adding lines
   - Better to know early than refactor later

5. **Visibility Throttling is Critical**
   - Document visibility API for tab switches
   - IntersectionObserver for scroll position
   - Both reduce CPU when animation isn't visible

---

## Resource Map

### Critical Files to Create
- `app/components/2l/EternalConstruction/constants.ts` - Timing, limits, physics
- `app/components/2l/EternalConstruction/utils/easing.ts` - Pure easing functions
- `app/components/2l/EternalConstruction/utils/ObjectPool.ts` - Memory management
- `app/components/2l/EternalConstruction/render.ts` - Canvas drawing
- `app/components/2l/EternalConstruction/hooks/useVisibilityThrottle.ts` - Performance

### Key Dependencies
- React (useRef, useEffect, useCallback)
- Canvas 2D API (getContext, clearRect, arc, lineTo, gradients)
- Web APIs (requestAnimationFrame, IntersectionObserver, visibilitychange)

### Testing Infrastructure
- Vitest with fake timers for time-based tests
- Mock performance.now() for frame timing tests
- Jest-dom for canvas ref testing

---

## Questions for Planner

1. Should the PerformanceMonitor be included in production builds, or development only?
2. For mobile, should we use IntersectionObserver threshold of 0.5 (more aggressive throttling)?
3. Should structure detection use graph algorithms or simple "3+ connected" heuristic?

---

*Exploration completed: 2025-12-16*
*Explorer 2: Animation Implementation Patterns*
