# 2L Iteration Plan - The Eternal Construction

## Project Vision

Create a living canvas background animation for the 2L page that visualizes the essence of 2L development: lines converge, structures emerge, architecture crystallizes. Not decoration, but truth made visible.

The animation features:
- **Nodes**: Glowing points that spawn, drift gently, and fade (20-40 concurrent)
- **Lines**: Purposeful extensions between nodes with smooth easing (10-20 concurrent)
- **Connections**: Visual lock-in when lines reach their targets (300ms pulse)
- **Structures**: Persistent geometric forms from 3+ connected nodes (10-20s lifespan)

This is the first Canvas 2D implementation in the ahiya-xyz codebase and will establish patterns for future canvas work.

## Success Criteria

Specific, measurable criteria for MVP completion:

- [ ] Canvas renders as fixed background behind all 2L page content
- [ ] 20-40 nodes floating with gentle drift movement at any given time
- [ ] 10-20 lines extending between nodes at any given time
- [ ] Connection pulse animation triggers on line lock-in (300ms)
- [ ] Structures (3+ connected nodes) persist for 10-20 seconds with enhanced luminosity
- [ ] Animation runs at 60fps consistently on desktop
- [ ] Animation respects prefers-reduced-motion (renders nothing when enabled)
- [ ] No memory leaks after 60 seconds of runtime
- [ ] CPU usage remains below 5% during animation
- [ ] Bundle size contribution is less than 50KB
- [ ] All pure functions have unit tests with 90%+ coverage
- [ ] Mobile devices show reduced density (15 nodes, 8 lines, 3 structures)

## MVP Scope

**In Scope:**
- EternalConstruction React component with Canvas 2D rendering
- Node system with spawn/drift/fade lifecycle and object pooling
- Line system with eased extension and gradient rendering
- Connection detection with pulse effect animation
- Structure detection (3+ connected nodes) with persistence
- Visibility-based throttling (tab hidden, scroll out of view)
- Reduced motion accessibility support
- Mobile-responsive density reduction
- Unit tests for all pure functions (geometry, easing, pool)
- Integration into 2L page

**Out of Scope (Post-MVP):**
- Mouse interaction / attraction effects
- WebGL rendering (Canvas 2D is sufficient)
- Complex graph algorithms for structure detection
- Custom color themes / configuration UI
- Other page integrations (home, soul)

## Development Phases

1. **Exploration** - Complete
2. **Planning** - Current
3. **Building** - 5 parallel-capable builders (~14-20 hours total)
4. **Integration** - ~30 minutes
5. **Validation** - ~30 minutes
6. **Deployment** - Final

## Timeline Estimate

| Phase | Duration | Notes |
|-------|----------|-------|
| Exploration | Complete | 2 explorers covered architecture + animation patterns |
| Planning | Complete | This document |
| Building | 14-20 hours | 5 builders, some parallelizable |
| Integration | 30 minutes | Builder 5 handles integration |
| Validation | 30 minutes | Performance testing, visual review |
| **Total** | ~15-21 hours | |

### Builder Sequence

```
Time 0h          4h           8h          12h         16h
  |---------------|-------------|-------------|------------|
  [Builder 1: Canvas Foundation (3-4h)]
                  [Builder 2: Nodes (3-4h)]
                              [Builder 3: Lines (3-4h)]
                                          [Builder 4: Connections (3-4h)]
                                                      [Builder 5: Polish (2-3h)]
```

Note: Builders 2-4 have some parallelization potential after Builder 1 completes the foundation.

## Risk Assessment

### High Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Performance degradation below 60fps | High | Object pooling, strict element limits, visibility throttling, early performance testing at max load |
| Memory leaks from RAF loop | High | Strict cleanup in useEffect, test with DevTools Memory profiler |

### Medium Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Canvas resize flicker | Medium | Debounce resize with 100ms delay, maintain state during resize |
| SSR hydration mismatch | Medium | Use mounted state pattern from existing 2L page |
| Structure detection complexity | Medium | Keep simple: 3+ nodes with lines between them, no complex graph algorithms |
| Mobile performance | Medium | Reduce element counts significantly (15/8/3 vs 40/20/5) |

### Low Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Browser compatibility | Low | Canvas 2D is universally supported |
| Bundle size | Low | No external dependencies, tree-shakeable utilities |

## Integration Strategy

### DOM Structure

```
<main> (2L page)
  <EternalConstruction />     <!-- NEW: Canvas background, z-index: 0 -->
  <AmbientLayer />            <!-- Existing: z-index: -10 -->
  <div className="relative z-10">
    <!-- All existing 2L content -->
  </div>
</main>
```

### Z-Index Coordination

| Layer | Z-Index | Component |
|-------|---------|-----------|
| Content | 10+ | Hero, Pipeline, Demos |
| Canvas | 0 | EternalConstruction |
| Ambient | -10 | AmbientLayer |

### Import Pattern

```typescript
// In app/2l/page.tsx
import { EternalConstruction } from '@/app/components/2l/EternalConstruction';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

// Conditional render based on reduced motion
{!prefersReducedMotion && <EternalConstruction />}
```

## Deployment Plan

1. **Build Verification**
   - Run `npm run build` to verify no TypeScript errors
   - Run `npm run test` to verify all tests pass
   - Check bundle analyzer for size impact

2. **Local Testing**
   - Visual inspection on desktop (1080p, 1440p, 4K)
   - Visual inspection on mobile (375px, 414px)
   - Performance profiling in Chrome DevTools
   - Memory leak check over 60 seconds

3. **Staging Deployment**
   - Deploy to preview/staging environment
   - Test on actual mobile devices
   - Verify reduced motion support

4. **Production Deployment**
   - Standard Vercel deployment via main branch
   - Monitor performance metrics post-deploy

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
  2l/
    page.tsx                        # Modified to include EternalConstruction
```

## Performance Budget

| Metric | Target | Warning | Failure |
|--------|--------|---------|---------|
| FPS | 60 | <45 | <30 |
| Frame Time | <16.67ms | >20ms | >33ms |
| CPU Usage | <5% | >8% | >15% |
| Memory | <20MB | >30MB | >50MB |
| Bundle Size | <50KB | >75KB | >100KB |
| Node Count | 20-40 | >50 | >60 |
| Line Count | 10-20 | >25 | >30 |

## Questions Resolved from Exploration

1. **Structure Persistence**: Clean fade-out (no ghost trails) using easeOutQuad over 2.5 seconds
2. **Mobile Behavior**: Reduced density (15 nodes, 8 lines, 3 structures) - same visual style, less complexity
3. **Connection Seeking Visual**: Lines extend with easeOutCubic from origin to target, gradient from dim to bright
4. **Color Palette**: Brand purple (#a855f7) for nodes/lines/structures, white core for node centers
5. **Static Fallback**: No render at all for reduced motion - follow AmbientLayer pattern exactly
6. **Performance Monitor**: Development only, not included in production builds
