# Builder Task Breakdown

## Overview

**5 primary builders** will work in sequence (with some parallelization potential after Builder 1 completes).

**Estimated total time:** 14-20 hours

**Execution strategy:** Builders 1 creates foundation, Builders 2-4 can partially parallelize, Builder 5 integrates and polishes.

---

## Builder Execution Order

### Phase 1: Foundation (Builder 1)
- Builder 1: Canvas Foundation + Animation Loop
- **Critical path** - all other builders depend on this

### Phase 2: Systems (Builders 2-4)
- Builder 2: Node System
- Builder 3: Line System
- Builder 4: Connection & Structure System

**Parallelization notes:**
- Builder 2 and Builder 3 can start together after Builder 1 completes
- Builder 4 depends on both Builder 2 and Builder 3 outputs

### Phase 3: Integration (Builder 5)
- Builder 5: Integration & Polish
- Depends on all previous builders

---

## Builder-1: Canvas Foundation + Animation Loop

### Scope

Create the foundational canvas component with proper lifecycle management, animation loop, and supporting infrastructure (types, constants, utilities).

### Complexity Estimate

**MEDIUM**

Well-documented patterns exist in codebase (AmbientLayer, TerminalAnimation). Main challenge is proper cleanup and visibility handling.

### Success Criteria

- [ ] EternalConstruction component renders a canvas element
- [ ] Canvas fills viewport with proper DPR handling
- [ ] requestAnimationFrame loop runs at 60fps when visible
- [ ] Animation pauses when tab is hidden (document.visibilityState)
- [ ] Animation pauses when scrolled out of view (IntersectionObserver)
- [ ] Canvas resizes correctly on window resize (debounced)
- [ ] No memory leaks (proper cleanup in useEffect)
- [ ] All pure utility functions have unit tests
- [ ] Component is accessible (aria-hidden, pointer-events-none)

### Files to Create

| File | Purpose | Size Est. |
|------|---------|-----------|
| `EternalConstruction/index.ts` | Re-exports | 200B |
| `EternalConstruction/types.ts` | All TypeScript interfaces | 2KB |
| `EternalConstruction/constants.ts` | Configuration constants | 1.5KB |
| `EternalConstruction/easing.ts` | Pure easing functions | 1KB |
| `EternalConstruction/geometry.ts` | Pure geometry functions | 2KB |
| `EternalConstruction/ObjectPool.ts` | Generic object pool class | 1KB |
| `EternalConstruction/EternalConstruction.tsx` | Main React component (shell) | 4KB |
| `EternalConstruction/__tests__/easing.test.ts` | Easing function tests | 2KB |
| `EternalConstruction/__tests__/geometry.test.ts` | Geometry function tests | 2KB |
| `EternalConstruction/__tests__/ObjectPool.test.ts` | Object pool tests | 2KB |

### Dependencies

**Depends on:** Nothing (first builder)
**Blocks:** All other builders

### Implementation Notes

1. **Start with types.ts** - Define all interfaces first, they're the contract
2. **Follow existing patterns** - Copy positioning from AmbientLayer, RAF from TerminalAnimation
3. **DPR handling is critical** - Canvas must be crisp on Retina displays
4. **Test visibility throttling** - Use Chrome DevTools to verify RAF pauses
5. **Object pool pre-population** - Initialize with 50 nodes, 30 lines

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use **Canvas Component Pattern** for EternalConstruction.tsx
- Use **Animation Loop Pattern** for RAF with delta time
- Use **TypeScript Types Pattern** for types.ts
- Use **Constants Pattern** for constants.ts
- Use **Pure Functions Pattern** for easing.ts and geometry.ts
- Use **Object Pooling Pattern** for ObjectPool.ts

### Test Requirements

**Unit Tests (Required):**
- `easing.test.ts`: All 7 easing/utility functions
  - easeOutCubic: boundary values (0, 0.5, 1), monotonic increasing
  - easeInOutSine: boundary values, symmetry
  - lerp: boundary values, extrapolation
  - clamp: within bounds, below, above
  - normalize: boundary, clamping

- `geometry.test.ts`: All geometry functions
  - distance: same point, horizontal, vertical, diagonal
  - bounceVelocity: left edge, right edge, top edge, bottom edge, center
  - clampPosition: within bounds, outside bounds
  - calculateCenter: empty, single, multiple nodes
  - randomPosition/randomVelocity: returns valid ranges

- `ObjectPool.test.ts`: Pool behavior
  - Pre-population on construction
  - Acquire decreases available count
  - Release increases available count
  - Reset function called on release
  - Clear empties pool
  - Factory called when pool empty

**Coverage Target:** 95% for all pure functions

### Accessibility Requirements

- [ ] Container has `aria-hidden="true"`
- [ ] Container has `pointer-events-none`
- [ ] Canvas is purely decorative (no role needed)
- [ ] No keyboard focus (no tabindex)

### Performance Requirements

- [ ] Canvas setup completes in <50ms
- [ ] Resize handling debounced (100ms)
- [ ] Object pools pre-populated at init
- [ ] No rendering when visibility is false

---

## Builder-2: Node System

### Scope

Implement the complete node lifecycle: spawning, drifting, phase transitions (spawning -> active -> fading), and removal. Nodes are glowing points that appear, float gently, and fade away.

### Complexity Estimate

**MEDIUM**

State machine logic is straightforward. Main challenge is integrating with object pool and ensuring smooth opacity transitions.

### Success Criteria

- [ ] Nodes spawn at random positions within canvas bounds
- [ ] Nodes drift with random velocities (2-8 pixels/second)
- [ ] Nodes bounce off canvas edges
- [ ] Nodes transition through phases: spawning (2s fade-in) -> active -> fading (2.5s fade-out)
- [ ] Node count maintained between 20-40 (desktop) or 15 (mobile)
- [ ] Nodes render with glow effect (radial gradient) and white core
- [ ] Object pool used for node allocation/deallocation
- [ ] Node lifecycle logic has unit tests

### Files to Create

| File | Purpose | Size Est. |
|------|---------|-----------|
| `EternalConstruction/node-system.ts` | Node state management | 3KB |
| `EternalConstruction/canvas-renderer.ts` | Canvas drawing (nodes first) | 2KB |
| `EternalConstruction/__tests__/node-system.test.ts` | Node system tests | 3KB |
| `EternalConstruction/__tests__/factories.ts` | Test data factories | 1KB |

### Dependencies

**Depends on:** Builder 1 (types, constants, ObjectPool, easing, geometry, component shell)
**Blocks:** Builder 4 (needs nodes for connections)

### Implementation Notes

1. **Use object pool** - Never `new Node()`, always `nodePool.acquire()`
2. **Delta time for all updates** - Position, age, opacity all use deltaTime
3. **State machine clarity** - Each phase has clear entry/exit conditions
4. **Render order** - Nodes render on top of everything
5. **Glow radius** - Use PHYSICS.NODE_GLOW_MULTIPLIER (3x node radius)

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use **State Update Pattern** for updateNodes function
- Use **Node Lifecycle Update** pattern for phase transitions
- Use **Canvas Rendering Pattern** renderNodes function
- Use **Test Data Factories** pattern for creating mock nodes

### Test Requirements

**Unit Tests (Required):**
- `node-system.test.ts`:
  - `createNode`: returns valid node with correct defaults
  - `updateNodePosition`: applies velocity correctly with delta time
  - `updateNodePhase`:
    - spawning -> active transition at FADE_IN time
    - active -> fading transition at lifespan - FADE_OUT time
    - opacity increases during spawning
    - opacity decreases during fading
  - `shouldRemoveNode`: returns true when fading complete
  - `spawnNodes`: respects max node limit
  - `getNodeLimits`: returns correct limits for mobile vs desktop

- `factories.ts`:
  - createMockNode with overrides
  - createMockState with nodes map

**Coverage Target:** 90% for node-system.ts

### Accessibility Requirements

- [ ] Node rendering respects parent aria-hidden
- [ ] No additional accessibility attributes needed (purely visual)

### Performance Requirements

- [ ] Node update completes in <1ms for 40 nodes
- [ ] Node rendering completes in <2ms for 40 nodes
- [ ] Object pool acquire/release has no allocation
- [ ] No array allocations in update loop

---

## Builder-3: Line System

### Scope

Implement the line system: lines extend from one node toward another with eased animation, gradient rendering (dim origin to bright destination), and lifecycle management.

### Complexity Estimate

**MEDIUM-HIGH**

Coordinate calculation with easing adds complexity. Gradient rendering requires careful Canvas API usage.

### Success Criteria

- [ ] Lines spawn from random source node to random target node
- [ ] Lines extend with easeOutCubic easing over 2-4 seconds
- [ ] Lines render with gradient (dim at origin, bright at current position)
- [ ] Line count maintained at 10-20 (desktop) or 8 (mobile)
- [ ] Lines transition: extending -> (reaches target) -> locked
- [ ] Locked lines connect the two nodes they span
- [ ] Line lifecycle logic has unit tests

### Files to Create

| File | Purpose | Size Est. |
|------|---------|-----------|
| `EternalConstruction/line-system.ts` | Line state management | 3KB |
| `EternalConstruction/canvas-renderer.ts` | Add renderLines function | +1.5KB |
| `EternalConstruction/__tests__/line-system.test.ts` | Line system tests | 3KB |

### Dependencies

**Depends on:** Builder 1 (foundation), Builder 2 (nodes exist to connect)
**Blocks:** Builder 4 (needs lines for connection detection)

### Implementation Notes

1. **Progress calculation** - `(currentTime - startTime) / duration` then apply easing
2. **Gradient direction** - From source node position to current endpoint
3. **Node selection** - Random selection from active nodes, exclude self
4. **Line endpoint** - Lerp between source and target based on eased progress
5. **Locked state** - When progress reaches 1.0, line becomes locked

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use **Canvas Rendering Pattern** renderLines function
- Use **Pure Functions Pattern** for progress calculation
- Use easeOutCubic from easing.ts for line extension
- Use lerp for position interpolation

### Test Requirements

**Unit Tests (Required):**
- `line-system.test.ts`:
  - `createLine`: returns valid line with correct defaults
  - `calculateLineProgress`:
    - Returns 0 at start time
    - Returns 1 at end time
    - Returns ~0.875 at midpoint (easeOutCubic)
  - `calculateLineEndpoint`:
    - Returns source position at progress 0
    - Returns target position at progress 1
    - Returns midpoint at progress 0.5
  - `updateLinePhase`:
    - extending -> locked when progress >= 1
  - `selectTargetNode`:
    - Never selects source node
    - Returns null when no valid targets
  - `getLineLimits`: returns correct limits for mobile vs desktop

**Coverage Target:** 90% for line-system.ts

### Accessibility Requirements

- [ ] Line rendering respects parent aria-hidden
- [ ] No additional accessibility attributes needed

### Performance Requirements

- [ ] Line update completes in <1ms for 20 lines
- [ ] Line rendering completes in <2ms for 20 lines
- [ ] Gradient creation is efficient (reuse where possible)
- [ ] No string concatenation in hot path

---

## Builder-4: Connection & Structure System

### Scope

Implement connection detection (when lines reach their targets), connection pulse effects (300ms brightness flash), and structure detection (3+ connected nodes form a persistent structure).

### Complexity Estimate

**HIGH**

Graph connectivity logic adds complexity. Structure lifecycle management requires careful coordination with node/line lifetimes.

### Success Criteria

- [ ] Connection detected when line progress reaches 1.0
- [ ] Connection pulse renders at connection point (300ms white flash)
- [ ] Nodes track their connections via Set<number>
- [ ] Structure detected when 3+ nodes are interconnected
- [ ] Structures render as filled polygon (very subtle, 5% opacity)
- [ ] Structures persist 10-20 seconds then fade out
- [ ] Structure count limited to 5 (desktop) or 3 (mobile)
- [ ] Connection/structure logic has unit tests

### Files to Create

| File | Purpose | Size Est. |
|------|---------|-----------|
| `EternalConstruction/connection-system.ts` | Connection detection & pulses | 2KB |
| `EternalConstruction/structure-system.ts` | Structure detection & lifecycle | 3KB |
| `EternalConstruction/canvas-renderer.ts` | Add renderPulses, renderStructures | +2KB |
| `EternalConstruction/__tests__/connection-system.test.ts` | Connection tests | 2KB |
| `EternalConstruction/__tests__/structure-system.test.ts` | Structure tests | 2KB |

### Dependencies

**Depends on:** Builder 1 (foundation), Builder 2 (nodes), Builder 3 (lines)
**Blocks:** Builder 5 (final integration)

### Implementation Notes

1. **Connection detection** - Check line.progress >= 1 and line.phase === 'extending'
2. **Node connections Set** - Add target node ID to source.connections and vice versa
3. **Pulse creation** - Create ConnectionPulse at target node position
4. **Structure detection** - Simple heuristic: if a node has 2+ connections, check if those nodes connect to each other
5. **Polygon rendering** - Use convex hull of structure nodes for fill

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use **Canvas Rendering Pattern** for renderPulses and renderStructures
- Use **State Update Pattern** for connection/structure updates
- Use easeOutExpo for pulse fade

### Test Requirements

**Unit Tests (Required):**
- `connection-system.test.ts`:
  - `detectConnection`:
    - Returns true when line.progress >= 1 and phase is 'extending'
    - Returns false when progress < 1
    - Returns false when already locked
  - `createPulse`: returns valid pulse at correct position
  - `updatePulse`:
    - Progress increases with delta time
    - Pulse removed when progress >= 1
  - `addConnectionToNodes`:
    - Adds to both nodes' connection sets
    - Handles existing connections gracefully

- `structure-system.test.ts`:
  - `detectStructures`:
    - Returns empty when < 3 connected nodes
    - Returns structure when 3+ nodes form triangle
    - Handles multiple separate structures
  - `updateStructure`:
    - Age increases with delta time
    - Opacity decreases during fade out
  - `shouldRemoveStructure`:
    - Returns true when fading complete
    - Returns true when component nodes removed
  - `getStructureLimits`: returns correct limits for mobile vs desktop

**Coverage Target:** 85% for connection-system.ts, structure-system.ts

### Accessibility Requirements

- [ ] All rendering respects parent aria-hidden
- [ ] No additional accessibility attributes needed

### Performance Requirements

- [ ] Connection detection is O(1) per line (just progress check)
- [ ] Structure detection is O(n^2) max where n = connected node count (acceptable for small n)
- [ ] Pulse rendering is lightweight (simple gradient)
- [ ] Structure polygon calculated once per frame (not per render call)

### Potential Split Strategy

If this task proves too complex, consider splitting:

**Sub-builder 4A: Connection System**
- Connection detection
- Connection pulse effect
- Node connection tracking
- Estimate: MEDIUM

**Sub-builder 4B: Structure System**
- Structure detection algorithm
- Structure lifecycle
- Structure rendering
- Estimate: MEDIUM

---

## Builder-5: Integration & Polish

### Scope

Integrate EternalConstruction into the 2L page, coordinate z-index with existing AmbientLayer, implement mobile responsive behavior, run performance testing, and create any remaining tests.

### Complexity Estimate

**MEDIUM**

Integration is straightforward but requires careful attention to z-index and reduced motion handling. Performance tuning may require iteration.

### Success Criteria

- [ ] EternalConstruction imported and rendered in 2L page
- [ ] Canvas appears behind all page content (z-index 0)
- [ ] Existing AmbientLayer still works (z-index -10)
- [ ] Reduced motion preference respected (no canvas when enabled)
- [ ] Mobile density reduction working (15 nodes, 8 lines, 3 structures)
- [ ] Animation runs at 60fps on desktop Chrome
- [ ] Animation runs at 30+ fps on mobile Safari
- [ ] No console errors or warnings
- [ ] All unit tests pass
- [ ] Visual appearance matches vision (purple glow, subtle structures)

### Files to Modify

| File | Change | Impact |
|------|--------|--------|
| `app/2l/page.tsx` | Import and render EternalConstruction | Low |
| `EternalConstruction/canvas-renderer.ts` | Final visual tuning | Low |
| `EternalConstruction/constants.ts` | Tuning if needed | Low |

### Files to Create (if not done by previous builders)

| File | Purpose | Size Est. |
|------|---------|-----------|
| `EternalConstruction/state.ts` | State initialization and main update | 2KB |
| Any missing test files | Complete test coverage | Variable |

### Dependencies

**Depends on:** All previous builders (1-4)
**Blocks:** Nothing (final builder)

### Implementation Notes

1. **Z-index coordination** - EternalConstruction at z-0, content at z-10+, AmbientLayer at z-(-10)
2. **Reduced motion check** - Must be in 2L page, not in EternalConstruction component
3. **Mobile detection** - Use config.isMobile from canvas setup
4. **Performance profiling** - Use Chrome DevTools Performance tab
5. **Visual tuning** - Adjust opacities/colors if needed for readability

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use **Integration Pattern** for 2L page integration
- Use **Reduced Motion Support** pattern
- Use **Performance Monitoring Patterns** for dev-only profiling

### Test Requirements

**Integration Tests (Required):**
- Component mounts without errors
- Component unmounts cleanly (no console errors)
- Canvas element exists in DOM
- Container has aria-hidden="true"

**Performance Tests (Manual):**
- [ ] Open Chrome DevTools Performance tab
- [ ] Record 10 seconds of animation
- [ ] Verify average FPS > 55
- [ ] Verify no dropped frames > 100ms
- [ ] Check Memory tab for leaks after 60 seconds

**Visual Tests (Manual):**
- [ ] Nodes appear as glowing purple points with white cores
- [ ] Lines extend smoothly with gradient
- [ ] Connection pulses flash briefly
- [ ] Structures appear as subtle filled polygons
- [ ] Canvas is properly behind all content
- [ ] Mobile shows reduced element counts

### Accessibility Requirements

- [ ] `prefers-reduced-motion` respected at page level
- [ ] Canvas not rendered when reduced motion enabled
- [ ] Page remains fully usable without canvas

### Performance Requirements

- [ ] 60fps on desktop (MacBook Pro M1 / i7 equivalent)
- [ ] 30fps minimum on mobile (iPhone 12 / Pixel 5 equivalent)
- [ ] CPU < 5% during animation
- [ ] Memory stable after 60 seconds (no unbounded growth)
- [ ] Bundle size contribution < 50KB

### Final Integration Checklist

```
[ ] npm run build - succeeds without errors
[ ] npm run test - all tests pass
[ ] npm run lint - no lint errors
[ ] npm run dev - page loads, animation runs
[ ] Reduced motion - toggle in System Preferences, verify no canvas
[ ] Mobile - resize to 375px width, verify reduced density
[ ] Tab switch - switch tabs, verify animation pauses
[ ] Scroll - scroll canvas out of view, verify animation pauses
[ ] Memory - run 60s, take heap snapshot, verify no leaks
[ ] FPS - record Performance trace, verify 60fps
```

---

## Integration Notes

### How Builder Outputs Combine

```
Builder 1 Output:
  types.ts, constants.ts, easing.ts, geometry.ts, ObjectPool.ts
  EternalConstruction.tsx (shell with RAF loop)
  Tests for pure functions
        |
        v
Builder 2 Output:
  node-system.ts (spawning, updating, rendering nodes)
  Updates to canvas-renderer.ts (renderNodes)
  Node tests
        |
        v
Builder 3 Output:
  line-system.ts (spawning, updating, rendering lines)
  Updates to canvas-renderer.ts (renderLines)
  Line tests
        |
        v
Builder 4 Output:
  connection-system.ts (detection, pulses)
  structure-system.ts (detection, lifecycle)
  Updates to canvas-renderer.ts (renderPulses, renderStructures)
  Connection and structure tests
        |
        v
Builder 5 Output:
  state.ts (combines all systems)
  Updates to 2L page (integration)
  Final tuning and performance verification
```

### Potential Conflict Areas

| Area | Risk | Resolution |
|------|------|------------|
| canvas-renderer.ts | Multiple builders add functions | Each builder adds specific functions, Builder 5 integrates |
| AnimationState type | Evolves as systems added | Builder 1 defines complete type, others implement |
| constants.ts | Tuning during development | Builder 5 does final tuning |

### Shared Files Coordination

- **types.ts**: Define ALL types in Builder 1, even if not used until later
- **constants.ts**: Define ALL constants in Builder 1, tune in Builder 5
- **canvas-renderer.ts**: Each builder adds their render function, follows render order
- **state.ts**: Created by Builder 5 to orchestrate all systems

---

## Test Coverage Summary

| Module | Builder | Unit Tests | Target Coverage |
|--------|---------|------------|-----------------|
| easing.ts | 1 | 7 functions | 95% |
| geometry.ts | 1 | 6 functions | 95% |
| ObjectPool.ts | 1 | 6 tests | 95% |
| node-system.ts | 2 | 6 functions | 90% |
| line-system.ts | 3 | 6 functions | 90% |
| connection-system.ts | 4 | 4 functions | 85% |
| structure-system.ts | 4 | 4 functions | 85% |
| EternalConstruction.tsx | 5 | Integration | 70% |
| **Overall** | - | - | **90%** |
