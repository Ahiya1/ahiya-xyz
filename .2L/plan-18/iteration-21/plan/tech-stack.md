# Technology Stack

## Core Rendering

**Decision:** Canvas 2D API (native browser API)

**Rationale:**
- Universal browser support (no polyfills needed)
- Sufficient performance for 40 nodes + 20 lines at 60fps
- Simpler mental model than WebGL for this use case
- Zero external dependencies
- Existing codebase has no Canvas implementations, but has solid RAF patterns to follow

**Alternatives Considered:**
- **WebGL**: Overkill for this visual complexity, steeper learning curve, not needed
- **SVG Animation**: Poor performance with many animated elements
- **CSS Animations**: Cannot achieve the connected line/node relationships

**Implementation Notes:**
- Use `getContext('2d')` for rendering context
- Handle Device Pixel Ratio (DPR) for crisp rendering on high-DPI displays
- Clear and redraw entire canvas each frame (immediate mode rendering)

## Framework Integration

**Decision:** React 18+ with Next.js App Router

**Rationale:**
- Existing codebase uses Next.js 14 with App Router
- Component will be client-side only (`"use client"` directive)
- Follow existing hydration safety pattern from 2L page

**Component Pattern:**
- Single `EternalConstruction` component handles all canvas lifecycle
- useRef for canvas element and animation state (not useState)
- useEffect for RAF loop, resize handling, visibility detection
- useCallback for memoized animation function

## State Management

**Decision:** Refs-based state (not React state)

**Rationale:**
- Animation state updates 60 times per second
- React state would cause 60 re-renders per second (unacceptable)
- Refs allow mutation without triggering re-renders
- Only use React state for mount/unmount and error states

**Implementation:**
```typescript
// Animation state in ref (mutated each frame)
const stateRef = useRef<AnimationState>(initialState);

// React state only for lifecycle
const [mounted, setMounted] = useState(false);
```

## TypeScript Types

**Decision:** Strict TypeScript with dedicated types.ts file

**Rationale:**
- Catches errors at compile time
- Documents data structures for all builders
- Enables IDE autocomplete and documentation

**Type Files:**
- `types.ts` - All interfaces (Node, Line, Structure, Connection, etc.)
- `constants.ts` - Typed constant objects

## Animation Loop

**Decision:** requestAnimationFrame with delta time normalization

**Rationale:**
- RAF synchronizes with display refresh rate
- Delta time ensures consistent animation speed regardless of frame rate
- Built-in browser API, no dependencies

**Pattern:**
```typescript
const animate = (timestamp: DOMHighResTimeStamp) => {
  const deltaTime = Math.min(timestamp - lastTime, MAX_DELTA);
  lastTime = timestamp;

  update(state, deltaTime);
  render(ctx, state);

  frameId = requestAnimationFrame(animate);
};
```

## Memory Management

**Decision:** Object pooling for nodes and lines

**Rationale:**
- Prevents garbage collection pauses during animation
- Nodes/lines are frequently created and destroyed
- Pre-allocate objects and reuse them

**Implementation:**
- Generic `ObjectPool<T>` class
- Factory function to create new objects
- Reset function to clear object state before reuse
- Pre-populate pool at initialization

## Performance Optimization

### Visibility Throttling

**Decision:** Two-layer throttling with Document Visibility API + IntersectionObserver

**Rationale:**
- Stop animation when tab is hidden (saves CPU/battery)
- Reduce updates when canvas scrolled out of view
- Both APIs are widely supported

**Implementation:**
- `document.visibilityState` for tab visibility
- `IntersectionObserver` for viewport visibility
- Skip rendering (but continue RAF) when not visible

### Resize Handling

**Decision:** Debounced resize with 100ms delay

**Rationale:**
- Resize events fire rapidly during window drag
- Debouncing prevents excessive canvas reconfiguration
- 100ms is imperceptible to users

## Accessibility

**Decision:** Full reduced motion support via hook + conditional rendering

**Rationale:**
- Respect user preference for reduced motion
- Use existing `useReducedMotion` hook from codebase
- Don't render canvas at all when reduced motion preferred

**Implementation:**
```typescript
// In parent component (2L page)
const prefersReducedMotion = useReducedMotion();
return (
  <>
    {!prefersReducedMotion && <EternalConstruction />}
  </>
);
```

**Required Attributes:**
- `aria-hidden="true"` on canvas container (purely decorative)
- `pointer-events-none` to prevent interaction interference

## Testing Framework

**Decision:** Vitest (already in codebase)

**Rationale:**
- Existing test infrastructure in codebase
- Fast execution with native ESM support
- Compatible with React Testing Library
- Fake timers for animation testing

**Test Strategy:**
- Unit tests for all pure functions (geometry, easing, object pool)
- Integration tests for component mount/unmount
- No visual regression tests (manual inspection sufficient for MVP)

## Development Tools

### Code Quality

- **TypeScript**: Strict mode enabled
- **ESLint**: Existing config (extends Next.js)
- **Prettier**: Existing config

### Performance Profiling

- **Chrome DevTools**: Performance tab for FPS monitoring
- **Memory Profiler**: Heap snapshots for leak detection
- **Custom Monitor**: Development-only performance logging

## Dependencies

### New Dependencies: None

All implementation uses:
- Native Canvas 2D API
- Native Web APIs (RAF, IntersectionObserver, etc.)
- React hooks
- TypeScript

### Existing Dependencies Used

| Package | Version | Purpose |
|---------|---------|---------|
| react | 18.x | Component framework |
| next | 14.x | App framework |
| vitest | existing | Unit testing |

## Environment Variables

No new environment variables required. The animation is purely client-side with no external API calls.

## Performance Targets

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| FPS | 60 | Chrome DevTools Performance tab |
| Frame Time | <16.67ms | `performance.now()` delta |
| Memory | <20MB | Chrome DevTools Memory tab |
| Bundle Size | <50KB | Next.js build output |
| CPU | <5% | Chrome DevTools Performance tab |

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome 90+ | Full | Primary development target |
| Firefox 90+ | Full | |
| Safari 14+ | Full | |
| Edge 90+ | Full | |
| Mobile Chrome | Full | Reduced density |
| Mobile Safari | Full | Reduced density |

Canvas 2D API has universal support. No polyfills needed.

## Color Palette

| Element | Color | Opacity | Notes |
|---------|-------|---------|-------|
| Node glow | #a855f7 (purple-500) | 0.6 | Radial gradient |
| Node core | #ffffff | 0.8 | Solid center |
| Line gradient start | #a855f7 | 0.12 | Origin node |
| Line gradient end | #a855f7 | 0.4 | Destination |
| Structure fill | #a855f7 | 0.05 | Polygon background |
| Connection pulse | #ffffff | 0.8 -> 0 | 300ms flash |

## File Size Budget

| File | Max Size | Notes |
|------|----------|-------|
| EternalConstruction.tsx | 8KB | Main component |
| types.ts | 2KB | Interfaces |
| constants.ts | 1KB | Configuration |
| geometry.ts | 2KB | Math functions |
| easing.ts | 1KB | Easing functions |
| ObjectPool.ts | 1KB | Pool class |
| canvas-renderer.ts | 4KB | Drawing functions |
| node-system.ts | 3KB | Node logic |
| line-system.ts | 3KB | Line logic |
| connection-system.ts | 2KB | Connection logic |
| structure-system.ts | 2KB | Structure logic |
| **Total** | ~30KB | Well under 50KB budget |

## Security Considerations

Minimal security surface for this component:

1. **No User Input**: Canvas is purely visual, no user data processed
2. **No External APIs**: No network calls, all rendering is local
3. **No localStorage**: No persistent state stored
4. **XSS Prevention**: No dynamic HTML generation, only Canvas API calls

The only security consideration is ensuring the animation doesn't consume excessive resources (handled by performance budgets and element limits).
