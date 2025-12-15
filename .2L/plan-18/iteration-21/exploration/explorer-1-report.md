# Explorer 1 Report: Architecture & Canvas Patterns

## Executive Summary

This is the FIRST Canvas 2D implementation in the ahiya-xyz codebase. The existing architecture provides excellent patterns to follow: AmbientLayer for fixed positioning, useReducedMotion for accessibility, and requestAnimationFrame patterns from typing animations. The 2L page at `/app/2l/page.tsx` has a clear integration point after the hero section. The EternalConstruction canvas should be implemented as a new component in `/app/components/2l/` following established patterns.

---

## Discoveries

### 1. Existing 2L Page Structure (`/app/2l/page.tsx`)

**Lines 1-232** - Client component with hydration safety pattern:

```typescript
const [mounted, setMounted] = useState(false);
useEffect(() => { setMounted(true); }, []);
if (!mounted) return <div className="min-h-screen" />;
```

**Current structure:**
- Hero section (lines 233-280)
- Pipeline visualization (lines 290-340)  
- Demo components (InvoiceFlowDemo, TerminalAnimation, CodeGenDemo, LiveDashboard)
- Footer

**Integration point:** The EternalConstruction canvas should be positioned as a fixed background layer, similar to AmbientLayer but specific to the 2L page.

### 2. AmbientLayer Pattern (`/app/components/ambient/AmbientLayer.tsx`)

**Key positioning pattern (lines 8-22):**
```typescript
<div 
  className="ambient-container fixed inset-0 -z-10 pointer-events-none overflow-hidden"
  aria-hidden="true"
>
  {!prefersReducedMotion && <AmbientParticles count={isMobile ? 10 : 20} />}
  {!prefersReducedMotion && <FloatingOrbs />}
</div>
```

**Critical insights:**
- Fixed positioning with `inset-0`
- Negative z-index (`-z-10`) to stay behind content
- `pointer-events-none` to not interfere with interaction
- `overflow-hidden` to contain canvas elements
- `aria-hidden="true"` for accessibility
- Conditional rendering based on `prefersReducedMotion` and `isMobile`

### 3. Animation Loop Patterns

The codebase uses requestAnimationFrame extensively. Pattern from `/app/components/2l/TerminalAnimation.tsx`:

```typescript
const animationRef = useRef<number>(0);
const lastTimeRef = useRef(performance.now());

useEffect(() => {
  const animate = (now: DOMHighResTimeStamp) => {
    const delta = now - lastTimeRef.current;
    // Update logic using delta time
    animationRef.current = requestAnimationFrame(animate);
  };
  
  animationRef.current = requestAnimationFrame(animate);
  
  return () => cancelAnimationFrame(animationRef.current);
}, [dependencies]);
```

### 4. Reduced Motion Pattern

**Hook:** `/app/hooks/useReducedMotion.ts`
```typescript
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    // Event listener for dynamic changes
  }, []);

  return prefersReducedMotion;
}
```

**CSS fallback in globals.css (lines 483-505):**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Component File Structure

### Recommended Directory Layout

```
app/
  components/
    2l/
      EternalConstruction/
        index.ts                    # Re-exports
        EternalConstruction.tsx     # Main React component
        canvas-renderer.ts          # Pure canvas rendering functions
        geometry.ts                 # Pure geometry calculations (testable)
        types.ts                    # TypeScript interfaces
        constants.ts                # Configuration constants
        EternalConstruction.test.ts # Unit tests for pure functions
```

### File Responsibilities

| File | Responsibility | Testable |
|------|----------------|----------|
| `EternalConstruction.tsx` | React lifecycle, canvas setup, RAF loop | Integration |
| `canvas-renderer.ts` | Drawing functions (nodes, lines, connections) | YES |
| `geometry.ts` | Vector math, intersection, distance | YES (pure) |
| `types.ts` | TypeScript interfaces | N/A |
| `constants.ts` | Colors, sizes, timing values | N/A |

---

## TypeScript Interface Definitions

### Core Types (`types.ts`)

```typescript
/** 2D point in canvas space */
export interface Point {
  x: number;
  y: number;
}

/** Velocity vector for animation */
export interface Velocity {
  dx: number;
  dy: number;
}

/** Individual construction node */
export interface Node {
  id: string;
  position: Point;
  velocity: Velocity;
  size: number;           // Radius in pixels
  opacity: number;        // 0-1
  createdAt: number;      // timestamp for lifecycle
  lifespan: number;       // milliseconds before fade
  type: 'anchor' | 'floating' | 'connection-point';
}

/** Line connecting two nodes */
export interface Line {
  id: string;
  startNodeId: string;
  endNodeId: string;
  progress: number;       // 0-1 for drawing animation
  opacity: number;
  width: number;
  createdAt: number;
}

/** Completed geometric structure */
export interface Structure {
  id: string;
  nodes: string[];        // Node IDs forming the structure
  lines: string[];        // Line IDs in the structure
  center: Point;
  completedAt: number;
  fadeStartAt: number;    // When to begin fade out
  opacity: number;
}

/** Connection seeking between nodes */
export interface Connection {
  sourceNodeId: string;
  targetNodeId: string;
  seekProgress: number;   // 0-1 how close to connecting
  established: boolean;
}

/** Canvas state snapshot */
export interface CanvasState {
  nodes: Map<string, Node>;
  lines: Map<string, Line>;
  structures: Map<string, Structure>;
  connections: Connection[];
  lastFrameTime: number;
  deltaTime: number;
}

/** Canvas configuration */
export interface CanvasConfig {
  width: number;
  height: number;
  dpr: number;            // Device pixel ratio
  nodeColor: string;
  lineColor: string;
  backgroundColor: string;
  maxNodes: number;
  maxStructures: number;
  nodeSpawnRate: number;  // Per second
  connectionDistance: number;
  structureLifespan: number;
}

/** Performance metrics for monitoring */
export interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  nodeCount: number;
  lineCount: number;
  structureCount: number;
}
```

---

## Canvas Setup Patterns

### DPR (Device Pixel Ratio) Handling

```typescript
const setupCanvas = (
  canvas: HTMLCanvasElement,
  container: HTMLElement
): CanvasConfig => {
  const dpr = window.devicePixelRatio || 1;
  const rect = container.getBoundingClientRect();
  
  // Set canvas internal resolution (crisp rendering)
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  
  // Set CSS display size
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
  
  // Scale context for automatic DPR handling
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.scale(dpr, dpr);
  }
  
  return {
    width: rect.width,
    height: rect.height,
    dpr,
    // ... other config
  };
};
```

### Resize Handling

```typescript
useEffect(() => {
  const handleResize = () => {
    // Debounce resize events
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    resizeTimeoutRef.current = window.setTimeout(() => {
      setupCanvas(canvasRef.current, containerRef.current);
    }, 100);
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

### Visibility Throttling (Tab Hidden)

```typescript
useEffect(() => {
  const handleVisibilityChange = () => {
    isVisibleRef.current = document.visibilityState === 'visible';
    if (isVisibleRef.current) {
      lastFrameTimeRef.current = performance.now(); // Reset delta
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}, []);
```

---

## Pure Functions for Testing

### Geometry Functions (`geometry.ts`)

```typescript
/** Calculate distance between two points */
export function distance(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/** Check if two nodes can connect */
export function canConnect(
  node1: Node,
  node2: Node,
  maxDistance: number
): boolean {
  return distance(node1.position, node2.position) <= maxDistance;
}

/** Find center of a structure */
export function calculateStructureCenter(nodes: Node[]): Point {
  if (nodes.length === 0) return { x: 0, y: 0 };
  
  const sum = nodes.reduce(
    (acc, node) => ({
      x: acc.x + node.position.x,
      y: acc.y + node.position.y,
    }),
    { x: 0, y: 0 }
  );
  
  return {
    x: sum.x / nodes.length,
    y: sum.y / nodes.length,
  };
}

/** Generate random position within bounds */
export function randomPosition(width: number, height: number, margin: number = 50): Point {
  return {
    x: margin + Math.random() * (width - 2 * margin),
    y: margin + Math.random() * (height - 2 * margin),
  };
}

/** Generate random velocity */
export function randomVelocity(maxSpeed: number = 0.5): Velocity {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * maxSpeed;
  return {
    dx: Math.cos(angle) * speed,
    dy: Math.sin(angle) * speed,
  };
}

/** Update node position with velocity */
export function updateNodePosition(
  node: Node,
  deltaTime: number,
  bounds: { width: number; height: number }
): Node {
  let { x, y } = node.position;
  let { dx, dy } = node.velocity;
  
  x += dx * deltaTime / 16; // Normalize to ~60fps
  y += dy * deltaTime / 16;
  
  // Bounce off walls
  if (x < 0 || x > bounds.width) dx = -dx;
  if (y < 0 || y > bounds.height) dy = -dy;
  
  // Clamp to bounds
  x = Math.max(0, Math.min(bounds.width, x));
  y = Math.max(0, Math.min(bounds.height, y));
  
  return {
    ...node,
    position: { x, y },
    velocity: { dx, dy },
  };
}

/** Calculate node opacity based on lifecycle */
export function calculateNodeOpacity(node: Node, currentTime: number): number {
  const age = currentTime - node.createdAt;
  const fadeStart = node.lifespan * 0.7; // Start fading at 70% lifespan
  
  if (age < 500) {
    // Fade in during first 500ms
    return Math.min(1, age / 500);
  } else if (age > fadeStart) {
    // Fade out
    return Math.max(0, 1 - (age - fadeStart) / (node.lifespan - fadeStart));
  }
  
  return 1;
}
```

### Test Examples

```typescript
// geometry.test.ts
import { describe, it, expect } from 'vitest';
import { distance, canConnect, calculateStructureCenter } from './geometry';

describe('distance', () => {
  it('returns 0 for same point', () => {
    expect(distance({ x: 5, y: 5 }, { x: 5, y: 5 })).toBe(0);
  });

  it('calculates horizontal distance', () => {
    expect(distance({ x: 0, y: 0 }, { x: 10, y: 0 })).toBe(10);
  });

  it('calculates diagonal distance', () => {
    expect(distance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
  });
});

describe('canConnect', () => {
  it('returns true when nodes are within distance', () => {
    const node1 = { position: { x: 0, y: 0 } } as Node;
    const node2 = { position: { x: 50, y: 0 } } as Node;
    expect(canConnect(node1, node2, 100)).toBe(true);
  });

  it('returns false when nodes are too far', () => {
    const node1 = { position: { x: 0, y: 0 } } as Node;
    const node2 = { position: { x: 150, y: 0 } } as Node;
    expect(canConnect(node1, node2, 100)).toBe(false);
  });
});
```

---

## Integration Point in 2L Page

### Recommended Integration

```typescript
// In app/2l/page.tsx

import { EternalConstruction } from '@/app/components/2l/EternalConstruction';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

export default function TwoLPage() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="min-h-screen" />;

  return (
    <main className="min-h-screen relative">
      {/* Canvas background layer */}
      {!prefersReducedMotion && <EternalConstruction />}
      
      {/* Existing content */}
      <div className="relative z-10">
        {/* Hero section */}
        {/* Pipeline visualization */}
        {/* Demo components */}
      </div>
    </main>
  );
}
```

### EternalConstruction Component Shell

```typescript
// EternalConstruction.tsx
"use client";

import { useRef, useEffect, useCallback } from 'react';
import type { CanvasState, CanvasConfig, PerformanceMetrics } from './types';
import { setupCanvas, render, update } from './canvas-renderer';
import { CANVAS_CONFIG } from './constants';

interface EternalConstructionProps {
  className?: string;
}

export function EternalConstruction({ className }: EternalConstructionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<CanvasState | null>(null);
  const configRef = useRef<CanvasConfig | null>(null);
  const animationRef = useRef<number>(0);
  const isVisibleRef = useRef(true);
  const metricsRef = useRef<PerformanceMetrics>({
    fps: 0, frameTime: 0, nodeCount: 0, lineCount: 0, structureCount: 0
  });

  // Animation loop
  const animate = useCallback((now: DOMHighResTimeStamp) => {
    if (!canvasRef.current || !stateRef.current || !configRef.current) return;
    if (!isVisibleRef.current) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Calculate delta time
    const deltaTime = now - stateRef.current.lastFrameTime;
    stateRef.current.deltaTime = deltaTime;
    stateRef.current.lastFrameTime = now;

    // Update state (pure function)
    stateRef.current = update(stateRef.current, configRef.current, now);

    // Render frame (pure function)
    render(ctx, stateRef.current, configRef.current);

    // Update metrics
    metricsRef.current.fps = 1000 / deltaTime;
    metricsRef.current.frameTime = deltaTime;
    metricsRef.current.nodeCount = stateRef.current.nodes.size;

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Setup and cleanup
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    configRef.current = setupCanvas(canvasRef.current, containerRef.current);
    stateRef.current = createInitialState();

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [animate]);

  // Visibility handling
  useEffect(() => {
    const handleVisibility = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
      if (isVisibleRef.current && stateRef.current) {
        stateRef.current.lastFrameTime = performance.now();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Resize handling
  useEffect(() => {
    let timeout: number;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        if (containerRef.current && canvasRef.current) {
          configRef.current = setupCanvas(canvasRef.current, containerRef.current);
        }
      }, 100);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 -z-10 pointer-events-none overflow-hidden ${className || ''}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}

export default EternalConstruction;
```

---

## Accessibility Requirements

### Required Attributes

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `aria-hidden` | `"true"` | Screen readers ignore decorative canvas |
| `role` | (none needed) | Canvas is purely decorative |
| `tabindex` | (none) | Not interactive, no focus needed |

### Reduced Motion Handling

```typescript
// Component level (recommended)
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

function TwoLPage() {
  const prefersReducedMotion = useReducedMotion();
  
  // Don't render canvas at all for reduced motion
  return (
    <main>
      {!prefersReducedMotion && <EternalConstruction />}
      {/* Content */}
    </main>
  );
}
```

**Static fallback option:**
If we want to show something for reduced motion users, render a static SVG or CSS gradient instead of animated canvas.

---

## Performance Monitoring Points

### Key Metrics to Track

```typescript
interface PerformanceMetrics {
  fps: number;              // Target: 60fps, warn if < 30fps
  frameTime: number;        // Target: < 16.67ms
  nodeCount: number;        // Cap at maxNodes
  lineCount: number;        // Cap at reasonable limit
  structureCount: number;   // Cap at maxStructures
  gcPauses: number;         // Track garbage collection impact
}
```

### Monitoring Hook

```typescript
const usePerformanceMonitor = (enabled: boolean = false) => {
  const metricsRef = useRef<PerformanceMetrics[]>([]);
  
  const logMetrics = useCallback((metrics: PerformanceMetrics) => {
    if (!enabled) return;
    
    metricsRef.current.push(metrics);
    
    // Keep last 60 frames (1 second at 60fps)
    if (metricsRef.current.length > 60) {
      metricsRef.current.shift();
    }
    
    // Warn if performance degrades
    const avgFps = metricsRef.current.reduce((sum, m) => sum + m.fps, 0) / metricsRef.current.length;
    if (avgFps < 30) {
      console.warn('[EternalConstruction] Performance warning: FPS below 30');
    }
  }, [enabled]);

  return { logMetrics };
};
```

### Object Pooling for Performance

```typescript
// Avoid GC pauses by pooling objects
class NodePool {
  private pool: Node[] = [];
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  acquire(): Node {
    return this.pool.pop() || this.createNode();
  }

  release(node: Node): void {
    if (this.pool.length < this.maxSize) {
      this.resetNode(node);
      this.pool.push(node);
    }
  }

  private createNode(): Node { /* ... */ }
  private resetNode(node: Node): void { /* ... */ }
}
```

---

## Risks & Challenges

### Technical Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Memory leaks from RAF | High | Strict cleanup in useEffect, test with DevTools |
| Performance on mobile | High | Reduce node count, throttle on low-end devices |
| Canvas resize flicker | Medium | Debounce resize, buffer rendering |
| SSR hydration mismatch | Medium | Use mounted state pattern from existing components |

### Complexity Risks

| Area | Complexity | Notes |
|------|------------|-------|
| Canvas setup/DPR | Low | Well-documented pattern |
| Animation loop | Medium | Use delta time, handle visibility |
| Geometry algorithms | Low | Pure functions, easy to test |
| Structure formation | Medium | Connection logic needs careful design |
| Lifecycle management | Medium | Track spawning, fading, cleanup |

---

## Recommendations for Planner

1. **Single Builder is Sufficient**: This is a contained component with well-defined boundaries. One builder can handle all aspects.

2. **Start with Types and Constants**: Define TypeScript interfaces and configuration values first. This provides clear contracts.

3. **Pure Functions First**: Implement and test geometry functions before the React component. This reduces debugging complexity.

4. **Canvas Rendering Separate from React**: Keep all canvas drawing logic in pure functions. The React component only handles lifecycle.

5. **Test Early**: Write unit tests for geometry functions immediately. Use vitest's canvas mocking for render tests.

6. **Performance Budget**: Set hard limits - max 50 nodes, 60fps target, pause when not visible.

7. **Reduced Motion = No Render**: Follow AmbientLayer pattern - don't render the component at all when reduced motion is preferred.

---

## Resource Map

### Critical Files to Read/Modify

| Path | Purpose |
|------|---------|
| `/app/2l/page.tsx` | Integration point for EternalConstruction |
| `/app/components/ambient/AmbientLayer.tsx` | Positioning pattern reference |
| `/app/hooks/useReducedMotion.ts` | Accessibility hook to reuse |
| `/app/globals.css` | Reduced motion CSS fallback |

### New Files to Create

| Path | Purpose |
|------|---------|
| `/app/components/2l/EternalConstruction/index.ts` | Re-exports |
| `/app/components/2l/EternalConstruction/EternalConstruction.tsx` | Main component |
| `/app/components/2l/EternalConstruction/types.ts` | TypeScript interfaces |
| `/app/components/2l/EternalConstruction/constants.ts` | Configuration |
| `/app/components/2l/EternalConstruction/geometry.ts` | Pure math functions |
| `/app/components/2l/EternalConstruction/canvas-renderer.ts` | Drawing functions |
| `/app/components/2l/EternalConstruction/geometry.test.ts` | Unit tests |

### Existing Patterns to Follow

| Pattern | Source | Apply To |
|---------|--------|----------|
| RAF animation loop | `TerminalAnimation.tsx` | Main animation loop |
| Hydration safety | `page.tsx` (2L) | Component mounting |
| Fixed positioning | `AmbientLayer.tsx` | Container styling |
| Reduced motion | `useReducedMotion.ts` | Conditional rendering |
| Delta time updates | `InvoiceFlowDemo.tsx` | Smooth animation |

---

## Questions for Planner

1. **Structure Persistence**: The vision mentions structures persist 10-20 seconds. Should old structures have a "ghost" trail as they fade, or clean fade-out?

2. **Mobile Behavior**: Should mobile show fewer nodes (like AmbientLayer does 10 vs 20), or use a completely different approach?

3. **Connection Seeking Visual**: How should the "seeking" animation look? Dashed lines extending toward potential connections?

4. **Color Palette**: Should nodes/lines use the brand purple (#a855f7) or a more subtle gray/white scheme?

5. **Static Fallback**: For reduced motion, should we show a static SVG diagram, nothing, or a simple CSS gradient background?
