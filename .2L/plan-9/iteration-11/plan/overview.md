# Iteration 11 Plan Overview: Command Center Transformation

**Plan:** plan-9
**Iteration:** 11
**Created:** 2025-12-04
**Strategy:** 5 parallel builders with distinct responsibilities

---

## Iteration Vision

Transform the 2L page from an informational description into a **command center experience** where visitors visually witness AI agents building software. This iteration delivers:

1. Critical bug fixes (logo navigation, false claims)
2. Animated terminal showing real 2L commands
3. Agent visualization with floating orbs
4. Live dashboard with real metrics from this project
5. Code generation demo and slash commands showcase

---

## Success Criteria

- [ ] Logo in Navigation.tsx navigates to homepage (change `href="#"` to `<Link href="/">`)
- [ ] "Works without internet" false claim removed/corrected
- [ ] Metrics updated to real values (8 plans, 10 iterations, 206+ agents)
- [ ] Terminal animation component renders and loops through 2L commands
- [ ] Agent orbs float and glow with CSS animations
- [ ] Dashboard metrics display with count-up animation
- [ ] Code generation demo types code character by character
- [ ] Slash commands showcase displays all major 2L commands
- [ ] All components integrated into page.tsx
- [ ] Mobile responsive on all breakpoints
- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes

---

## MVP Scope

### In Scope

1. **Critical Fixes (P0)**
   - Navigation.tsx logo bug fix
   - False "works without internet" claim correction
   - Metrics update to real values

2. **New Components (P1)**
   - TerminalAnimation.tsx - Animated terminal demo
   - AgentVisualization.tsx - Floating agent orbs
   - LiveDashboard.tsx - Real metrics display
   - CodeGenDemo.tsx - Typing code effect
   - SlashCommands.tsx - Command showcase

3. **Page Integration (P1)**
   - Section ordering and integration
   - Recursive Showcase section (meta-reference)
   - Performance optimization with IntersectionObserver
   - Mobile responsiveness verification
   - Reduced motion support

### Out of Scope (Post-MVP)

- Backend/API changes
- Database integration
- Other page modifications
- Real-time data from .2L files at runtime (hardcoded for MVP)
- Framer Motion or other animation libraries

---

## Builder Assignments

| Builder | Name | Priority | Estimated Lines |
|---------|------|----------|-----------------|
| Builder-1 | Critical Fixes & Metrics | P0 | ~30 lines |
| Builder-2 | Terminal Animation Component | P1 | ~200 lines |
| Builder-3 | Agent Visualization & Dashboard | P1 | ~250 lines |
| Builder-4 | Code Gen Demo & Pipeline | P2 | ~200 lines |
| Builder-5 | Page Integration & Polish | P1 | ~150 lines |

---

## Timeline Estimate

- Exploration: Complete
- Planning: Complete
- Building: ~45 minutes (parallel builders)
- Integration: ~15 minutes
- Validation: ~10 minutes
- **Total:** ~70 minutes

---

## Risk Assessment

### High Risks

- **Animation performance on mobile:** Mitigated by CSS-first approach, IntersectionObserver to pause out-of-view animations, `prefers-reduced-motion` support

### Medium Risks

- **Builder coordination for page.tsx:** Mitigated by zone-based integration (Builder-1 fixes existing content, Builder-5 integrates new components)
- **CSS conflicts in globals.css:** Mitigated by adding new styles at end of file with clear section markers

### Low Risks

- **Navigation component regression:** Simple fix, tested across all pages
- **Content accuracy:** All content verified against actual 2L system during exploration

---

## Integration Strategy

### Zone-Based Integration

**Zone A (Builder-1):** Existing file modifications
- Navigation.tsx: Logo href fix
- page.tsx: Content fixes (lines 167-169, 180)

**Zone B (Builders 2, 3, 4):** New component files
- All components in `/app/components/2l/`
- No conflicts - each builder creates separate files

**Zone C (Builder-5):** Page integration
- page.tsx: Import new components, add sections
- globals.css: Add animation keyframes if needed

### Execution Order

1. **Round 1:** All 5 builders execute in parallel
2. **Round 2:** Integrator merges Zone B into Zone C
3. **Round 3:** Final cohesion validation

---

## Deployment Plan

1. All changes committed as single iteration
2. `npm run build` to verify production build
3. `npm run lint` to verify code quality
4. Manual visual check on localhost
5. Git tag: `2l-plan-9-iter-11`

---

## Dependencies Between Builders

```
Builder-1 (Critical Fixes)     -----> No dependencies
Builder-2 (Terminal)           -----> No dependencies
Builder-3 (Agent/Dashboard)    -----> No dependencies
Builder-4 (CodeGen/Pipeline)   -----> No dependencies
Builder-5 (Integration)        -----> Depends on ALL others
```

Builder-5 must wait for Builders 1-4 to complete before integrating components into page.tsx.

---

## Validation Criteria

### P0 Requirements (Must Pass)

- Logo navigates to homepage from 2L page
- No false "works without internet" claim visible
- `npm run build` succeeds without errors
- `npm run lint` passes

### P1 Requirements (Should Pass)

- Terminal animation plays and loops
- Agent orbs float with CSS animation
- Dashboard metrics count up on scroll
- All components render on mobile (320px+)

### P2 Requirements (Nice to Have)

- Code generation demo types code
- Pipeline has enhanced traveling indicator
- Slash commands display correctly
- Reduced motion is respected

---

## Files Modified/Created

| File | Action | Builder |
|------|--------|---------|
| `/app/components/Navigation.tsx` | MODIFY | Builder-1 |
| `/app/2l/page.tsx` | MODIFY | Builder-1, Builder-5 |
| `/app/components/2l/TerminalAnimation.tsx` | CREATE | Builder-2 |
| `/app/components/2l/AgentVisualization.tsx` | CREATE | Builder-3 |
| `/app/components/2l/LiveDashboard.tsx` | CREATE | Builder-3 |
| `/app/components/2l/CodeGenDemo.tsx` | CREATE | Builder-4 |
| `/app/components/2l/SlashCommands.tsx` | CREATE | Builder-4 |
| `/app/globals.css` | MODIFY | Builder-3 (animations) |

---

**Plan Status:** READY FOR BUILDING
